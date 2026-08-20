export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminContext } from '@/lib/admin';
import { setTelegramWebhook } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminContext();
    if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { url } = await request.json();
    const webhookUrl = url || `${process.env.NEXT_PUBLIC_APP_URL}/api/telegram/webhook`;
    if (!webhookUrl || !/^https:\/\//i.test(webhookUrl)) {
      return NextResponse.json({ error: 'A public HTTPS webhook URL is required' }, { status: 400 });
    }

    const result = await setTelegramWebhook(webhookUrl, process.env.TELEGRAM_WEBHOOK_SECRET);
    if (!result.ok) return NextResponse.json({ error: result.description || 'Telegram rejected webhook' }, { status: 502 });
    return NextResponse.json({ success: true, webhookUrl });
  } catch (error) {
    console.error('Telegram setup error:', error);
    return NextResponse.json({ error: 'Failed to set Telegram webhook' }, { status: 500 });
  }
}