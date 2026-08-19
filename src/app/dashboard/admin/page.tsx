'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'enterprise';
  creditsRemaining: number;
  telegramConnected: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') loadOverview();
  }, [status]);

  const loadOverview = async (term = '') => {
    setLoading(true);
    const response = await fetch(`/api/admin/overview${term ? `?search=${encodeURIComponent(term)}` : ''}`);
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || 'Admin access required');
      router.replace('/dashboard');
    } else {
      setUsers(data.users);
      setStats(data.stats);
    }
    setLoading(false);
  };

  const updateUser = async (userId: string, field: string, value: string | number) => {
    const response = await fetch('/api/admin/overview', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, [field]: field === 'creditsRemaining' ? Number(value) : value }),
    });
    const data = await response.json();
    if (!response.ok) toast.error(data.error || 'Update failed');
    else { toast.success('User updated'); loadOverview(search); }
  };

  if (status === 'loading' || loading) return <div className="flex min-h-screen items-center justify-center bg-paper text-muted">Loading admin workspace...</div>;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-soft bg-white/90"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"><Link href="/dashboard" className="flex items-center gap-3 text-lg font-extrabold"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#147d70] text-sm text-white">D</span>Doerforge <span className="hidden text-xs font-bold uppercase tracking-wider text-[#147d70] sm:inline">Admin</span></Link><Link href="/dashboard" className="text-sm font-bold text-muted hover:text-ink">Back to workspace</Link></div></header>
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#147d70]">Operations</p><h1 className="mt-2 text-4xl font-extrabold">Admin control room</h1><p className="mt-3 text-muted">Manage accounts, access, credits, and platform health.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{[['Users', stats.totalUsers], ['Resumes', stats.totalResumes], ['Cover letters', stats.totalCoverLetters], ['Tool outputs', stats.totalOutputs], ['Pro users', stats.proUsers], ['Telegram', stats.connectedTelegram]].map(([label, value]) => <div key={label} className="rounded-2xl border border-soft bg-white p-5 shadow-soft"><p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p><p className="mt-2 text-3xl font-extrabold text-[#147d70]">{value ?? 0}</p></div>)}</div>
        <div className="mt-10 rounded-2xl border border-soft bg-white p-6 shadow-soft"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-xl font-extrabold">Users</h2><p className="mt-1 text-sm text-muted">The latest 100 accounts matching your search.</p></div><input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && loadOverview(search)} placeholder="Search name or email" className="rounded-full border border-soft px-4 py-2 text-sm outline-none focus:border-[#147d70]" /></div>
          <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="border-b border-soft text-xs uppercase tracking-wider text-muted"><tr><th className="px-3 py-3">User</th><th className="px-3 py-3">Role</th><th className="px-3 py-3">Plan</th><th className="px-3 py-3">Credits</th><th className="px-3 py-3">Telegram</th><th className="px-3 py-3">Joined</th></tr></thead><tbody>{users.map((user) => <tr key={user.id} className="border-b border-soft last:border-0"><td className="px-3 py-4"><p className="font-bold">{user.name}</p><p className="text-xs text-muted">{user.email}</p></td><td className="px-3 py-4"><select value={user.role} onChange={(event) => updateUser(user.id, 'role', event.target.value)} className="rounded-lg border border-soft bg-white px-2 py-1 text-xs"><option value="user">User</option><option value="admin">Admin</option></select></td><td className="px-3 py-4"><select value={user.plan} onChange={(event) => updateUser(user.id, 'plan', event.target.value)} className="rounded-lg border border-soft bg-white px-2 py-1 text-xs"><option value="free">Free</option><option value="pro">Pro</option><option value="enterprise">Enterprise</option></select></td><td className="px-3 py-4"><input type="number" min="0" value={user.creditsRemaining} onChange={(event) => updateUser(user.id, 'creditsRemaining', event.target.value)} className="w-20 rounded-lg border border-soft px-2 py-1 text-xs" /></td><td className="px-3 py-4">{user.telegramConnected ? <span className="font-bold text-[#147d70]">Connected</span> : <span className="text-muted">Not connected</span>}</td><td className="px-3 py-4 text-muted">{new Date(user.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table>{users.length === 0 && <p className="py-10 text-center text-sm text-muted">No users found.</p>}</div>
        </div>
      </section>
    </main>
  );
}