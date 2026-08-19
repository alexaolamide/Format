export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { chatCompletion } from '@/lib/openrouter';
import { tools, toolInstructions } from '@/lib/tools';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { toolId, input } = await request.json();
    const tool = tools.find((item) => item.id === toolId);
    if (!tool || !toolInstructions[toolId]) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }
    if (typeof input !== 'string' || input.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide more detail for this tool' }, { status: 400 });
    }
    if (input.length > 12000) {
      return NextResponse.json({ error: 'Input is too long. Keep it under 12,000 characters.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    const purchasedTools = user?.purchasedTools || [];
    if (tool.priceStars && user?.plan !== 'pro' && !purchasedTools.includes(toolId)) {
      return NextResponse.json({ error: 'Purchase this tool with Telegram Stars before using it.' }, { status: 402 });
    }

    const output = await chatCompletion([
      {
        role: 'system',
        content: `You are Doerforge, an AI productivity tool by Alex Studio. ${toolInstructions[toolId]} Be accurate, practical, and do not invent personal facts. Return only the useful result, with clear headings where helpful.`,
      },
      { role: 'user', content: input.trim() },
    ]);

    await db.collection('toolOutputs').insertOne({
      userId,
      toolId,
      input: input.trim(),
      output,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, output });
  } catch (error) {
    console.error('Tool execution error:', error);
    return NextResponse.json({ error: 'Failed to run tool' }, { status: 500 });
  }
}