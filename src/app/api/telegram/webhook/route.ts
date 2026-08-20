import { NextRequest, NextResponse } from 'next/server';
import { answerCallbackQuery, answerPreCheckoutQuery, sendInvoice, sendTelegramMessage } from '@/lib/telegram';
import { connectToDatabase } from '@/lib/mongodb';
import { tools } from '@/lib/tools';
import { DEFAULT_DAILY_CREDITS } from '@/lib/credits';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

function verifySecretToken(request: NextRequest): boolean {
  if (!TELEGRAM_WEBHOOK_SECRET) return true;
  const token = request.headers.get('x-telegram-bot-api-secret-token');
  return token === TELEGRAM_WEBHOOK_SECRET;
}

export async function POST(request: NextRequest) {
  try {
    if (!verifySecretToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const message = body.message;
    const telegramId = message?.from?.id;
    const command = typeof message?.text === 'string' ? message.text.trim() : '';

    if (telegramId && (command === '/start' || command === '/help')) {
      await sendTelegramMessage(
        telegramId,
        '<b>Welcome to Doerforge by Alex Studio</b>\n\nConnect your account from Doerforge Settings, then send the generated link here.\n\nCommands:\n/store - browse paid tools\n/help - show this help',
      );
      return NextResponse.json({ success: true });
    }

    if (telegramId && command === '/store') {
      const paidTools = tools.filter((tool) => tool.priceStars);
      await sendTelegramMessage(
        telegramId,
        '<b>Doerforge Store</b>\n\nChoose a tool to receive a Telegram Stars invoice. Your account must be linked first.',
        {
          inline_keyboard: paidTools.map((tool) => [{
            text: `${tool.name} · ${tool.priceStars} ⭐`,
            callback_data: `buy_tool:${tool.id}`,
          }]).concat([
            [{ text: 'Buy 30 credits · 10 ⭐', callback_data: 'buy_credits:10' }],
            [{ text: 'Buy 150 credits · 50 ⭐', callback_data: 'buy_credits:50' }],
          ]),
        },
      );
      return NextResponse.json({ success: true });
    }

    if (body.callback_query) {
      const callback = body.callback_query;
      const callbackData = String(callback.data || '');
      if (callbackData.startsWith('buy_tool:')) {
        const toolId = callbackData.slice('buy_tool:'.length);
        const tool = tools.find((item) => item.id === toolId && item.priceStars);
        if (!tool || !callback.from?.id) {
          await answerCallbackQuery(String(callback.id), 'That tool is unavailable.');
          return NextResponse.json({ success: true });
        }

        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ telegramId: callback.from.id });
        if (!user) {
          await answerCallbackQuery(String(callback.id), 'Link your Doerforge account first.');
          await sendTelegramMessage(callback.from.id, 'Please open Doerforge Settings, generate a Telegram link, and send it here before purchasing.');
          return NextResponse.json({ success: true });
        }

        const result = await sendInvoice({
          user_id: callback.from.id,
          title: tool.name,
          description: tool.description,
          payload: `tool_${tool.id}_${user._id.toString()}`,
          currency: 'XTR',
          prices: [{ label: tool.name, amount: tool.priceStars! }],
          ...(process.env.TELEGRAM_STORE_IMAGE_URL ? { photo_url: process.env.TELEGRAM_STORE_IMAGE_URL } : {}),
        });
        await answerCallbackQuery(String(callback.id), result.ok ? 'Invoice sent.' : 'Could not create invoice.');
      }
      if (callbackData.startsWith('buy_credits:')) {
        const stars = Number(callbackData.slice('buy_credits:'.length));
        const user = callback.from?.id ? await connectToDatabase().then(({ db }) => db.collection('users').findOne({ telegramId: callback.from.id })) : null;
        if (!user || !callback.from?.id || !Number.isInteger(stars) || stars < 1) {
          await answerCallbackQuery(String(callback.id), 'Link your account first.');
          return NextResponse.json({ success: true });
        }
        const credits = stars * 3;
        const result = await sendInvoice({
          user_id: callback.from.id,
          title: `${credits} Doerforge credits`,
          description: `Permanent Doerforge credits. ${stars} Stars gives you ${credits} credits.`,
          payload: `credits_${stars}_${credits}_${user._id.toString()}`,
          currency: 'XTR',
          prices: [{ label: `${credits} credits`, amount: stars }],
        });
        await answerCallbackQuery(String(callback.id), result.ok ? 'Credit invoice sent.' : 'Could not create invoice.');
      }
      return NextResponse.json({ success: true });
    }

    if (body.message?.text?.startsWith('/start link_')) {
      const token = body.message.text.slice('/start link_'.length).trim();
      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({
        telegramLinkToken: token,
        telegramLinkExpires: { $gt: new Date() },
      });

      if (!user || !telegramId) {
        await sendTelegramMessage(telegramId, 'This link is invalid or expired. Generate a new Telegram link from Doerforge Settings.');
        return NextResponse.json({ success: true });
      }

      const linkedAccount = await db.collection('users').findOne({ telegramId });
      if (linkedAccount && linkedAccount._id.toString() !== user._id.toString()) {
        await sendTelegramMessage(telegramId, 'This Telegram account is already linked to another Doerforge account. Unlink it there first.');
        return NextResponse.json({ success: true });
      }

      if (user.telegramId && user.telegramId !== telegramId) {
        await sendTelegramMessage(telegramId, 'This Doerforge account is already linked to another Telegram account. Unlink it in Settings first.');
        return NextResponse.json({ success: true });
      }

      if (user && telegramId) {
        await db.collection('users').updateOne(
          { _id: user._id },
          {
            $set: {
              telegramId,
              telegramUsername: body.message.from.username || null,
              telegramName: [body.message.from.first_name, body.message.from.last_name].filter(Boolean).join(' ') || null,
              updatedAt: new Date(),
            },
            $unset: { telegramLinkToken: '', telegramLinkExpires: '' },
          }
        );
        await sendTelegramMessage(telegramId, '<b>Telegram connected</b> ✅\n\nYour Doerforge account is now linked. Send /store to browse tools and pay with Telegram Stars.');
      }

      return NextResponse.json({ success: true });
    }

    if (body.pre_checkout_query) {
      const { id, from } = body.pre_checkout_query;
      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ telegramId: from.id });

      if (!user) {
        await answerPreCheckoutQuery(String(id), false, 'User not found. Please link your account first.');
        return NextResponse.json({ success: false });
      }

      const payload = String(body.pre_checkout_query.invoice_payload || '');
      const payloadParts = payload.split('_');
      const expectedTool = payloadParts[0] === 'tool' ? tools.find((tool) => tool.id === payloadParts[1]) : null;
      if (payloadParts[0] === 'tool' && (!expectedTool || payloadParts[2] !== user._id.toString())) {
        await answerPreCheckoutQuery(String(id), false, 'This invoice is not valid for this account.');
        return NextResponse.json({ success: false });
      }
      if (payloadParts[0] === 'credits' && (!Number.isInteger(Number(payloadParts[1])) || !Number.isInteger(Number(payloadParts[2])) || payloadParts[3] !== user._id.toString())) {
        await answerPreCheckoutQuery(String(id), false, 'This credit invoice is not valid for this account.');
        return NextResponse.json({ success: false });
      }

      await answerPreCheckoutQuery(String(id), true);
      return NextResponse.json({ success: true });
    }

    const successfulPayment = body.message?.successful_payment;
    if (successfulPayment) {
      const telegramId = body.message?.from?.id;
      const { invoice_payload, telegram_payment_charge_id } = successfulPayment;

      if (!telegramId) {
        return NextResponse.json({ error: 'Missing user info' }, { status: 400 });
      }

      const payloadParts = invoice_payload.split('_');
      const isToolPurchase = payloadParts[0] === 'tool';
      const isCreditPurchase = payloadParts[0] === 'credits';
      const plan = isToolPurchase ? undefined : (payloadParts[0] || 'pro');

      const { db } = await connectToDatabase();
      const paymentUser = await db.collection('users').findOne({ telegramId });
      if (!paymentUser || (isToolPurchase && payloadParts[2] !== paymentUser._id.toString()) || (isCreditPurchase && payloadParts[3] !== paymentUser._id.toString())) {
        return NextResponse.json({ error: 'Payment account mismatch' }, { status: 400 });
      }
      const existingPayment = await db.collection('telegramPayments').findOne({
        telegramPaymentChargeId: telegram_payment_charge_id,
      });
      if (existingPayment) {
        return NextResponse.json({ success: true, duplicate: true });
      }

      await db.collection('users').updateOne(
        { telegramId },
        isCreditPurchase
          ? { $inc: { purchasedCredits: Number(payloadParts[2]) }, $set: { updatedAt: new Date() } }
          : isToolPurchase
            ? { $addToSet: { purchasedTools: payloadParts[1] }, $set: { updatedAt: new Date() } }
          : { $set: { plan, creditsRemaining: plan === 'pro' ? 999 : 9999, dailyCreditsRemaining: DEFAULT_DAILY_CREDITS[plan as keyof typeof DEFAULT_DAILY_CREDITS] || DEFAULT_DAILY_CREDITS.free, dailyCreditsResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000), updatedAt: new Date() } }
      );

      await db.collection('telegramPayments').insertOne({
        telegramPaymentChargeId: telegram_payment_charge_id,
        telegramId,
        invoicePayload: invoice_payload,
        createdAt: new Date(),
      });

      const purchasedTool = isToolPurchase ? tools.find((tool) => tool.id === payloadParts[1]) : null;
      await sendTelegramMessage(
        telegramId,
        isCreditPurchase
          ? `<b>Credit purchase successful</b> ✅\n\n<b>Credits added:</b> ${Number(payloadParts[2])}\n<b>Amount:</b> ${successfulPayment.total_amount} ⭐\n<b>Charge:</b> <code>${telegram_payment_charge_id}</code>\n\nYour permanent credits are now available in Doerforge.`
          : isToolPurchase
            ? `<b>Payment successful</b> ✅\n\n<b>Tool:</b> ${purchasedTool?.name || payloadParts[1]}\n<b>Amount:</b> ${successfulPayment.total_amount} ⭐\n<b>Charge:</b> <code>${telegram_payment_charge_id}</code>\n\nThe tool is now unlocked in your Doerforge account. You can use it from the website or send /store to buy another tool.`
          : `<b>Payment successful</b> ✅\n\n<b>Plan:</b> ${plan!.toUpperCase()}\n<b>Amount:</b> ${successfulPayment.total_amount} ⭐\n<b>Charge:</b> <code>${telegram_payment_charge_id}</code>`,
      );

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
