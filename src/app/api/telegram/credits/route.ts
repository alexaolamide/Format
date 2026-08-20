export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { sendInvoice } from '@/lib/telegram';

export const CREDITS_PER_STAR = 3;

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { stars } = await request.json();
    if (!Number.isInteger(stars) || stars < 1 || stars > 10000) {
      return NextResponse.json({ error: 'Choose between 1 and 10,000 Stars.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user?.telegramId) return NextResponse.json({ error: 'Link Telegram in Settings first' }, { status: 400 });

    const credits = stars * CREDITS_PER_STAR;
    const result = await sendInvoice({
      user_id: user.telegramId,
      title: `${credits} Doerforge credits`,
      description: `Permanent credits for Doerforge tools. ${stars} Stars gives you ${credits} credits.`,
      payload: `credits_${stars}_${credits}_${user._id.toString()}`,
      currency: 'XTR',
      prices: [{ label: `${credits} credits`, amount: stars }],
    });
    if (!result.ok) return NextResponse.json({ error: result.description || 'Telegram invoice failed' }, { status: 502 });
    return NextResponse.json({ success: true, credits, stars, message: `${credits} credits invoice sent to Telegram.` });
  } catch (error) {
    console.error('Create credit invoice error:', error);
    return NextResponse.json({ error: 'Failed to create credit invoice' }, { status: 500 });
  }
}