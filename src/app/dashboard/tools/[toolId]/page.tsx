'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { tools } from '@/lib/tools';

export default function ToolPage() {
  const params = useParams();
  const tool = tools.find((item) => item.id === params.toolId);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [telegramId, setTelegramId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/telegram/verify').then((response) => response.json()).then((data) => {
      if (data.success) {
        setTelegramId(data.telegramId);
        setPurchased(data.plan === 'pro' || data.purchasedTools?.includes(tool?.id));
      }
    });
  }, [tool?.id]);

  if (!tool) {
    return <div className="min-h-screen flex items-center justify-center">Tool not found</div>;
  }

  const runTool = async () => {
    setRunning(true);
    try {
      const response = await fetch('/api/tools/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: tool.id, input }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || 'Unable to run tool');
        return;
      }
      setOutput(data.output);
      toast.success('Your result is ready');
    } catch {
      toast.error('Unable to run tool');
    } finally {
      setRunning(false);
    }
  };

  const buyTool = async () => {
    const response = await fetch('/api/telegram/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId: tool.id }),
    });
    const data = await response.json();
    toast[data.success ? 'success' : 'error'](data.success ? data.message : data.error);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/dashboard" className="text-2xl font-bold text-primary-600">Doerforge</Link>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Back to toolkit</Link>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">{tool.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{tool.name}</h1>
          <p className="mt-2 text-gray-600">{tool.description}</p>
        </div>
        {tool.priceStars && !purchased ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="font-semibold text-amber-950">Unlock this tool</h2>
            <p className="mt-2 text-sm text-amber-900">Pay {tool.priceStars} Telegram Stars to use {tool.name}.</p>
            <button onClick={buyTool} disabled={!telegramId} className="mt-4 rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
              {telegramId ? `Pay ${tool.priceStars} ⭐` : 'Connect Telegram in Settings first'}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="block text-sm font-semibold text-gray-900">What do you need?</label>
              <p className="mt-1 text-sm text-gray-500">Include your context, goal, tone, and any details the tool should use.</p>
              <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={14} maxLength={12000} className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200" placeholder="Describe what you want to create..." />
              <button onClick={runTool} disabled={running || input.trim().length < 10} className="mt-4 w-full rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                {running ? 'Working...' : 'Generate result'}
              </button>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-900">Your result</h2>
                {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm font-semibold text-primary-600">Copy</button>}
              </div>
              <div className="mt-4 min-h-[390px] whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                {output || 'Your generated result will appear here.'}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}