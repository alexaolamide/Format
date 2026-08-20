export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ error: 'Use the secure Telegram link flow from Settings.' }, { status: 410 });
  } catch (error) {
    console.error('Link Telegram error:', error);
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({
      _id: new ObjectId((session.user as any).id),
    });

    return NextResponse.json({
      success: true,
      plan: user?.plan || 'free',
      creditsRemaining: user?.creditsRemaining ?? 0,
      telegramId: user?.telegramId || null,
      telegramUsername: user?.telegramUsername || null,
      telegramName: user?.telegramName || null,
      purchasedTools: user?.purchasedTools || [],
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    return NextResponse.json({ error: 'Failed to get subscription info' }, { status: 500 });
  }
}
