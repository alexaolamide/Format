'use client';

export const dynamic = 'force-dynamic';



import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toolCategories, tools, type ToolDefinition } from '@/lib/tools';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchResumes();
      fetchCoverLetters();
      fetch('/api/telegram/verify').then((response) => response.json()).then((data) => {
        if (data.success) setTelegramId(data.telegramId);
      });
    }
  }, [session]);

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resume/list');
      const data = await response.json();
      if (data.success) {
        setResumes(data.resumes);
      }
    } catch (error) {
      console.error('Failed to fetch resumes');
    }
  };

  const buyTool = async (tool: ToolDefinition) => {
    setPurchaseMessage('');
    const response = await fetch('/api/telegram/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId: tool.id }),
    });
    const data = await response.json();
    setPurchaseMessage(data.success ? data.message : data.error);
  };

  const fetchCoverLetters = async () => {
    try {
      const response = await fetch('/api/cover-letter/list');
      const data = await response.json();
      if (data.success) {
        setCoverLetters(data.coverLetters);
      }
    } catch (error) {
      console.error('Failed to fetch cover letters');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="border-b border-soft bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 text-lg font-extrabold tracking-tight"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#147d70] text-sm text-white">D</span>Doerforge</Link>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm font-semibold text-muted sm:inline">{session?.user?.name || session?.user?.email}</span>
              {(session?.user as any)?.role === 'admin' && <Link href="/dashboard/admin" className="text-sm font-bold text-[#147d70]">Admin</Link>}
              <Link href="/dashboard/settings" className="rounded-full border border-soft px-4 py-2 text-sm font-bold text-ink transition hover:border-[#147d70] hover:text-[#147d70]">Settings</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#147d70]">Your toolkit · Alex Studio</p>
            <h1 className="mt-2 max-w-2xl text-4xl font-extrabold leading-tight tracking-normal text-ink">Everything you need to move forward</h1>
          </div>
          <Link
            href="/dashboard/resume/new"
            className="rounded-full bg-[#147d70] px-6 py-3 font-bold text-white shadow-lg shadow-[#147d70]/15 transition hover:-translate-y-0.5 hover:bg-[#0c514a]"
          >
            + New Resume
          </Link>
        </div>

        <section className="mb-12 rounded-[26px] border border-soft bg-white p-6 shadow-soft lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Tools for work and life</h2>
              <p className="mt-1 text-sm text-muted">Start free with career tools, then unlock more with Telegram Stars.</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted">{telegramId ? 'Telegram connected' : 'Connect Telegram in Settings to buy'}</span>
          </div>
          {purchaseMessage && <p className="mb-4 rounded-xl bg-[#e7f4ed] px-4 py-3 text-sm font-semibold text-[#176b5e]">{purchaseMessage}</p>}
          <div className="space-y-7">
            {toolCategories.map((category) => (
              <div key={category}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">{category}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.filter((tool) => tool.category === category).map((tool) => (
                    <div key={tool.id} className="flex min-h-[180px] flex-col rounded-2xl border border-soft bg-[#fbfcfa] p-5 transition hover:-translate-y-1 hover:border-[#9ecdbd] hover:bg-white hover:shadow-soft">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dff2e9] text-xs font-extrabold text-[#147d70]">{tool.icon}</span>
                      </div>
                      <h4 className="mt-4 font-extrabold text-ink">{tool.name}</h4>
                      <p className="mt-1 flex-1 text-sm leading-6 text-muted">{tool.description}</p>
                      {tool.available ? (
                        <Link href={tool.href!} className="mt-4 text-sm font-extrabold text-[#147d70] hover:text-[#0c514a]">Open tool <span className="ml-1">↗</span></Link>
                      ) : (
                        <button onClick={() => buyTool(tool)} disabled={!telegramId} className="mt-4 text-left text-sm font-extrabold text-[#147d70] disabled:cursor-not-allowed disabled:text-gray-400">
                          {tool.priceStars} ⭐ to Telegram →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border border-soft bg-white p-6 shadow-soft">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Total Resumes</h3>
            <p className="mt-2 text-4xl font-extrabold text-[#147d70]">{resumes.length}</p>
          </div>
          <div className="rounded-2xl border border-soft bg-white p-6 shadow-soft">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Cover Letters</h3>
            <p className="mt-2 text-4xl font-extrabold text-[#147d70]">{coverLetters.length}</p>
          </div>
          <div className="rounded-2xl border border-soft bg-[#17211f] p-6 text-white shadow-soft">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#b7ccc4]">Plan</h3>
            <p className="mt-2 text-4xl font-extrabold capitalize text-white">{(session?.user as any)?.plan || 'Free'}</p>
          </div>
        </div>

        {/* Recent Resumes */}
        <div className="mb-8 rounded-2xl border border-soft bg-white p-6 shadow-soft">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Resumes</h2>
            <Link href="/dashboard/resume/list" className="text-primary-600 hover:underline">
              View All
            </Link>
          </div>
          {resumes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No resumes yet</p>
              <Link
                href="/dashboard/resume/new"
                className="text-primary-600 hover:underline"
              >
                Create your first resume
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.slice(0, 5).map((resume: any) => (
                <div
                  key={resume._id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-semibold">{resume.title || 'Untitled Resume'}</h3>
                    <p className="text-sm text-gray-500">
                      {resume.personalInfo?.fullName || 'No name'} • Last updated: {' '}
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/resume/${resume._id}`}
                      className="text-primary-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Link
            href="/dashboard/resume/new"
            className="rounded-2xl border border-soft bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <h3 className="text-lg font-semibold mb-2">Create New Resume</h3>
            <p className="text-gray-600">
              Build a new ATS-optimized resume from scratch
            </p>
          </Link>
          <Link
            href="/dashboard/cover-letter/new"
            className="rounded-2xl border border-soft bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <h3 className="text-lg font-semibold mb-2">Generate Cover Letter</h3>
            <p className="text-gray-600">
              Create a tailored cover letter for any job
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
