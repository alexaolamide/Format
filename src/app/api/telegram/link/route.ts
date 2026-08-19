export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!botUsername) return NextResponse.json({ error: 'Telegram bot username is not configured' }, { status: 500 });

    const token = crypto.randomBytes(24).toString('hex');
    const { db } = await connectToDatabase();
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          telegramLinkToken: token,
          telegramLinkExpires: new Date(Date.now() + 15 * 60 * 1000),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      url: `https://t.me/${botUsername.replace(/^@/, '')}?start=link_${token}`,
    });
  } catch (error) {
    console.error('Create Telegram link error:', error);
    return NextResponse.json({ error: 'Failed to create Telegram link' }, { status: 500 });
  }
}