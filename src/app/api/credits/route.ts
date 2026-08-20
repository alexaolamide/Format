export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ensureDailyCredits } from '@/lib/credits';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { db } = await connectToDatabase();
    await ensureDailyCredits(db, userId);
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    return NextResponse.json({
      success: true,
      plan: user?.plan || 'free',
      dailyCreditsRemaining: user?.dailyCreditsRemaining || 0,
      purchasedCredits: user?.purchasedCredits || 0,
      dailyCreditsResetAt: user?.dailyCreditsResetAt || null,
    });
  } catch (error) {
    console.error('Get credits error:', error);
    return NextResponse.json({ error: 'Failed to load credits' }, { status: 500 });
  }
}