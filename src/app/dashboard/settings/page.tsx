'use client';

export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [telegramLink, setTelegramLink] = useState('');
  const [linkingTelegram, setLinkingTelegram] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [unlinkingTelegram, setUnlinkingTelegram] = useState(false);
  const [telegramProfile, setTelegramProfile] = useState('');
  const [creditStars, setCreditStars] = useState('10');
  const [creditMessage, setCreditMessage] = useState('');
  const [creditBalance, setCreditBalance] = useState({ dailyCreditsRemaining: 0, purchasedCredits: 0 });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/telegram/verify').then((response) => response.json()).then((data) => {
        if (data.success) {
          setTelegramId(data.telegramId);
          setTelegramProfile(data.telegramUsername ? `@${data.telegramUsername}` : (data.telegramName || ''));
        }
      });
      fetch('/api/credits').then((response) => response.json()).then((data) => {
        if (data.success) setCreditBalance(data);
      });
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const user = session?.user as any;
  const isPro = user?.plan === 'pro';

  const connectTelegram = async () => {
    setLinkingTelegram(true);
    const response = await fetch('/api/telegram/link', { method: 'POST' });
    const data = await response.json();
    if (data.success) setTelegramLink(data.url);
    setLinkingTelegram(false);
  };

  const unlinkTelegram = async () => {
    if (!window.confirm('Unlink Telegram from this Doerforge account?')) return;
    setUnlinkingTelegram(true);
    const response = await fetch('/api/telegram/unlink', { method: 'POST' });
    const data = await response.json();
    if (data.success) {
      setTelegramId(null);
      setTelegramProfile('');
      setTelegramLink('');
    }
    setUnlinkingTelegram(false);
  };

  const buyCredits = async () => {
    const response = await fetch('/api/telegram/credits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stars: Number(creditStars) }),
    });
    const data = await response.json();
    setCreditMessage(data.success ? `${data.credits} credits will be added after Telegram confirms payment.` : data.error);
  };

  const deleteAccount = async () => {
    if (!window.confirm('Delete your account and all saved data? This cannot be undone.')) return;
    setDeletingAccount(true);
    const response = await fetch('/api/auth/delete-account', { method: 'POST' });
    const data = await response.json();
    if (data.success) router.push('/');
    setDeletingAccount(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/dashboard" className="text-2xl font-bold text-primary-600">Doerforge</a>
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Back to Dashboard</a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-gray-900">{session?.user?.name || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Credits</h2>
          <p className="text-sm text-gray-600">{creditBalance.dailyCreditsRemaining} daily credits + {creditBalance.purchasedCredits} permanent credits available.</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="text-sm font-semibold text-gray-700" htmlFor="credit-stars">Telegram Stars</label>
            <input id="credit-stars" type="number" min="1" max="10000" value={creditStars} onChange={(event) => setCreditStars(event.target.value)} className="w-28 rounded-lg border border-gray-300 px-3 py-2" />
            <span className="text-sm text-gray-500">= {Math.max(0, Number(creditStars) * 3 || 0)} credits</span>
            <button onClick={buyCredits} disabled={!telegramId} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Buy credits</button>
          </div>
          {creditMessage && <p className="mt-3 text-sm text-primary-700">{creditMessage}</p>}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription</h2>
          <div className={`p-4 rounded-lg ${isPro ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">
                  {isPro ? 'Pro Plan' : 'Free Plan'}
                </p>
                <p className="text-sm text-gray-600">
                  {isPro
                    ? 'Your plan includes a larger daily credit allowance'
                    : `${creditBalance.dailyCreditsRemaining} daily credits remaining`}
                </p>
              </div>
              {!isPro && (telegramLink ? (
                <a href={telegramLink} target="_blank" rel="noreferrer" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
                  Open Telegram
                </a>
              ) : (
                <button onClick={connectTelegram} disabled={linkingTelegram} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium disabled:opacity-50">
                  {linkingTelegram ? 'Preparing...' : 'Connect Telegram'}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Pro plan includes unlimited resume optimizations, cover letters, and priority support.
            Pay securely with Telegram Stars.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Telegram Stars</h2>
          <p className="text-sm text-gray-600">Connect Telegram securely to receive invoices and unlock paid Doerforge tools.</p>
          {telegramId ? (
            <div className="mt-4 flex flex-wrap items-center gap-4"><p className="text-sm font-semibold text-green-700">Telegram is connected{telegramProfile ? ` as ${telegramProfile}` : ''}.</p><button onClick={unlinkTelegram} disabled={unlinkingTelegram} className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50">{unlinkingTelegram ? 'Unlinking...' : 'Unlink Telegram'}</button></div>
          ) : (
            <button onClick={connectTelegram} disabled={linkingTelegram} className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50">
              {linkingTelegram ? 'Preparing link...' : 'Connect Telegram'}
            </button>
          )}
          {telegramLink && <a href={telegramLink} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-semibold text-primary-700">Open Telegram to finish connecting</a>}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Danger Zone</h2>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button onClick={deleteAccount} disabled={deletingAccount} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium disabled:opacity-50">
            {deletingAccount ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </main>
    </div>
  );
}
