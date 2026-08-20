export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { generateCoverLetter } from '@/lib/openrouter';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';
import { completeReservation, creditLimitMessage, releaseReservation, reserveCredits, type CreditReservation } from '@/lib/credits';

export async function POST(request: NextRequest) {
  let reservation: CreditReservation | null = null;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId, jobDescription, company, jobTitle, tone } = await request.json();

    if (!resumeId || !jobDescription || !company || !jobTitle) {
      return NextResponse.json(
        { error: 'Resume ID, job description, company, and job title are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const resume = await db.collection('resumes').findOne({
      _id: new ObjectId(resumeId),
      userId: (session.user as any).id,
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const user = await db.collection('users').findOne({
      _id: new ObjectId((session.user as any).id),
    });

    reservation = await reserveCredits(db, (session.user as any).id, 'cover-letter', 4, crypto.randomUUID()).catch((error) => {
      if (error instanceof Error && error.message === 'CREDIT_LIMIT') return null;
      throw error;
    });
    if (!reservation) return NextResponse.json({ error: creditLimitMessage(), code: 'CREDIT_LIMIT' }, { status: 402 });

    const resumeContent = [
      `Name: ${resume.personalInfo.fullName}`,
      `Email: ${resume.personalInfo.email}`,
      `Phone: ${resume.personalInfo.phone}`,
      `Location: ${resume.personalInfo.location}`,
      `Summary: ${resume.personalInfo.summary}`,
      '',
      'Experience:',
      ...resume.experience.map((exp: any) => [
        `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})`,
        `  ${exp.description}`,
        `  Achievements: ${exp.achievements.join(', ')}`,
      ]).flat(),
      '',
      'Education:',
      ...resume.education.map((edu: any) => [
        `- ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})`,
      ]).flat(),
      '',
      `Skills: ${resume.skills.join(', ')}`,
    ].join('\n').trim();

    const coverLetterContent = await generateCoverLetter(
      resumeContent,
      jobDescription,
      company,
      jobTitle,
      tone || 'professional'
    );

    const coverLetter = {
      userId: (session.user as any).id,
      resumeId,
      jobTitle,
      company,
      jobDescription,
      content: coverLetterContent,
      tone: tone || 'professional',
      createdAt: new Date(),
    };

    const result = await db.collection('coverletters').insertOne(coverLetter);

    await db.collection('usage').insertOne({
      userId: (session.user as any).id,
      type: 'cover_letter',
      count: 1,
      month: new Date().toISOString().slice(0, 7),
      createdAt: new Date(),
    });
    await completeReservation(db, reservation);

    return NextResponse.json({
      success: true,
      coverLetter: { ...coverLetter, _id: result.insertedId },
    });
  } catch (error) {
    if (reservation) {
      const { db } = await connectToDatabase();
      await releaseReservation(db, reservation);
    }
    console.error('Generate cover letter error:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
