import type { ClientSession, Db } from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './mongodb';

export const DEFAULT_DAILY_CREDITS = {
  free: 10,
  pro: 75,
  enterprise: 200,
} as const;

export interface CreditReservation {
  _id?: ObjectId;
  userId: string;
  toolId: string;
  requestId: string;
  amount: number;
  dailyAmount: number;
  purchasedAmount: number;
  status: 'reserved' | 'consumed' | 'released';
  createdAt: Date;
  completedAt?: Date;
}

function nextDailyReset() {
  const reset = new Date();
  reset.setUTCHours(24, 0, 0, 0);
  return reset;
}

export async function ensureDailyCredits(db: Db, userId: string, session?: ClientSession) {
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { session });
  if (!user) throw new Error('User not found');

  const plan = (user.plan || 'free') as keyof typeof DEFAULT_DAILY_CREDITS;
  const quota = DEFAULT_DAILY_CREDITS[plan] || DEFAULT_DAILY_CREDITS.free;
  const resetAt = user.dailyCreditsResetAt ? new Date(user.dailyCreditsResetAt) : new Date(0);

  if (!user.dailyCreditsResetAt || resetAt <= new Date()) {
    await db.collection('users').updateOne(
      {
        _id: new ObjectId(userId),
        $or: [
          { dailyCreditsResetAt: { $exists: false } },
          { dailyCreditsResetAt: { $lte: new Date() } },
        ],
      },
      {
        $set: {
          dailyCreditsRemaining: quota,
          dailyCreditsResetAt: nextDailyReset(),
          updatedAt: new Date(),
        },
      },
      { session },
    );
  }
}

export async function reserveCredits(db: Db, userId: string, toolId: string, amount: number, requestId: string) {
  if (!Number.isInteger(amount) || amount < 1) throw new Error('Invalid credit amount');
  const { client } = await connectToDatabase();
  const session = client.startSession();
  try {
    let reservation: CreditReservation | null = null;
    await session.withTransaction(async () => {
      await ensureDailyCredits(db, userId, session);
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { session });
      const daily = user?.dailyCreditsRemaining || 0;
      const purchased = user?.purchasedCredits || 0;
      if (daily + purchased < amount) throw new Error('CREDIT_LIMIT');

      const dailyAmount = Math.min(daily, amount);
      const purchasedAmount = amount - dailyAmount;
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId), dailyCreditsRemaining: { $gte: dailyAmount }, purchasedCredits: { $gte: purchasedAmount } },
        { $inc: { dailyCreditsRemaining: -dailyAmount, purchasedCredits: -purchasedAmount }, $set: { updatedAt: new Date() } },
        { session },
      );
      if (!result.modifiedCount) throw new Error('CREDIT_LIMIT');

      reservation = {
        userId,
        toolId,
        requestId,
        amount,
        dailyAmount,
        purchasedAmount,
        status: 'reserved',
        createdAt: new Date(),
      };
      await db.collection('creditTransactions').insertOne({ userId, toolId, requestId, type: 'reserve', amount: -amount, dailyAmount, purchasedAmount, createdAt: new Date() }, { session });
      await db.collection('creditReservations').insertOne(reservation, { session });
    });
    return reservation;
  } finally {
    await session.endSession();
  }
}

export async function completeReservation(db: Db, reservation: CreditReservation) {
  await db.collection('creditReservations').updateOne({ _id: reservation._id, status: 'reserved' }, { $set: { status: 'consumed', completedAt: new Date() } });
  await db.collection('creditTransactions').insertOne({ userId: reservation.userId, toolId: reservation.toolId, requestId: reservation.requestId, type: 'consume', amount: reservation.amount, createdAt: new Date() });
}

export async function releaseReservation(db: Db, reservation: CreditReservation) {
  const result = await db.collection('creditReservations').updateOne({ _id: reservation._id, status: 'reserved' }, { $set: { status: 'released', completedAt: new Date() } });
  if (!result.modifiedCount) return;
  await db.collection('users').updateOne({ _id: new ObjectId(reservation.userId) }, { $inc: { dailyCreditsRemaining: reservation.dailyAmount, purchasedCredits: reservation.purchasedAmount }, $set: { updatedAt: new Date() } });
  await db.collection('creditTransactions').insertOne({ userId: reservation.userId, toolId: reservation.toolId, requestId: reservation.requestId, type: 'release', amount: reservation.amount, createdAt: new Date() });
}

export function creditLimitMessage() {
  return 'You have used today\'s credits. Your next daily allowance arrives at reset, or you can buy permanent credits with Telegram Stars.';
}