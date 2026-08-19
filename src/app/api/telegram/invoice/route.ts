import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { sendInvoice } from '@/lib/telegram';
import { tools } from '@/lib/tools';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { toolId } = await request.json();
    const tool = tools.find((item) => item.id === toolId);
    if (!tool || !tool.priceStars) {
      return NextResponse.json({ error: 'This tool is not purchasable' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({
      _id: new ObjectId((session.user as any).id),
    });

    if (!user?.telegramId) {
      return NextResponse.json({ error: 'Link Telegram in Settings first' }, { status: 400 });
    }

    const result = await sendInvoice({
      user_id: user.telegramId,
      title: tool.name,
      description: tool.description,
      payload: `tool_${tool.id}_${user._id.toString()}`,
      currency: 'XTR',
      prices: [{ label: tool.name, amount: tool.priceStars }],
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.description || 'Telegram invoice failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Invoice sent to your Telegram chat.' });
  } catch (error) {
    console.error('Create Telegram invoice error:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}