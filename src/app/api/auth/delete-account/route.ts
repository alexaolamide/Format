export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { db } = await connectToDatabase();
    const filter = { userId };
    await Promise.all([
      db.collection('resumes').deleteMany(filter),
      db.collection('coverletters').deleteMany(filter),
      db.collection('usage').deleteMany(filter),
      db.collection('toolOutputs').deleteMany(filter),
    ]);
    await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}