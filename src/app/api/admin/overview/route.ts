export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getAdminContext } from '@/lib/admin';

function safeUser(user: any) {
  return {
    id: user._id.toString(),
    name: user.name || 'Unnamed user',
    email: user.email,
    role: user.role || 'user',
    plan: user.plan || 'free',
    creditsRemaining: user.creditsRemaining ?? 0,
    dailyCreditsRemaining: user.dailyCreditsRemaining ?? 0,
    purchasedCredits: user.purchasedCredits ?? 0,
    telegramConnected: Boolean(user.telegramId),
    purchasedTools: user.purchasedTools || [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function GET(request: NextRequest) {
  try {
    const context = await getAdminContext();
    if (!context) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const search = request.nextUrl.searchParams.get('search')?.trim();
    const query = search
      ? { $or: [{ email: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] }
      : {};
    const [users, totalUsers, totalResumes, totalCoverLetters, totalOutputs, proUsers, connectedTelegram] = await Promise.all([
      context.db.collection('users').find(query).project({ password: 0, verificationToken: 0, resetToken: 0, telegramLinkToken: 0 }).sort({ createdAt: -1 }).limit(100).toArray(),
      context.db.collection('users').countDocuments(),
      context.db.collection('resumes').countDocuments(),
      context.db.collection('coverletters').countDocuments(),
      context.db.collection('toolOutputs').countDocuments(),
      context.db.collection('users').countDocuments({ plan: 'pro' }),
      context.db.collection('users').countDocuments({ telegramId: { $exists: true } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: { totalUsers, totalResumes, totalCoverLetters, totalOutputs, proUsers, connectedTelegram },
      users: users.map(safeUser),
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    return NextResponse.json({ error: 'Failed to load admin overview' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const context = await getAdminContext();
    if (!context) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { userId, role, plan, creditsRemaining, dailyCreditsRemaining, purchasedCredits } = await request.json();
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Valid user ID is required' }, { status: 400 });
    }
    if (role && !['user', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
    if (plan && !['free', 'pro', 'enterprise'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    if (creditsRemaining !== undefined && (!Number.isInteger(creditsRemaining) || creditsRemaining < 0)) {
      return NextResponse.json({ error: 'Credits must be a non-negative integer' }, { status: 400 });
    }
    if ([dailyCreditsRemaining, purchasedCredits].some((value) => value !== undefined && (!Number.isInteger(value) || value < 0))) {
      return NextResponse.json({ error: 'Credit balances must be non-negative integers' }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (role) updates.role = role;
    if (plan) updates.plan = plan;
    if (creditsRemaining !== undefined) updates.creditsRemaining = creditsRemaining;
    if (dailyCreditsRemaining !== undefined) updates.dailyCreditsRemaining = dailyCreditsRemaining;
    if (purchasedCredits !== undefined) updates.purchasedCredits = purchasedCredits;

    const result = await context.db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );
    if (!result.matchedCount) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin user update error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}