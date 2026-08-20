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
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $unset: { telegramId: '', telegramUsername: '', telegramName: '', telegramLinkToken: '', telegramLinkExpires: '' },
        $set: { updatedAt: new Date() },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unlink Telegram error:', error);
    return NextResponse.json({ error: 'Failed to unlink Telegram' }, { status: 500 });
  }
}