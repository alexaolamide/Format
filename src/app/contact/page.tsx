import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Alex Studio | Doerforge',
  description: 'Get support for Doerforge by Alex Studio.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-soft bg-white/90"><div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6"><Link href="/" className="flex items-center gap-3 text-lg font-extrabold"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#147d70] text-sm text-white">D</span>Doerforge</Link><Link href="/" className="text-sm font-bold text-muted hover:text-ink">Back home</Link></div></header>
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#147d70]">Alex Studio support</p><h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">How can we help?</h1><p className="mt-6 max-w-xl text-lg leading-8 text-muted">For account help, payment issues, privacy requests, or feedback about a tool, send us a message with enough detail to investigate.</p><div className="mt-10 grid gap-5 sm:grid-cols-2"><a href="mailto:support@doerforge.com" className="rounded-2xl border border-soft bg-white p-6 shadow-soft transition hover:-translate-y-1"><p className="text-xs font-bold uppercase tracking-wider text-muted">General support</p><p className="mt-3 font-extrabold text-[#147d70]">support@doerforge.com</p><p className="mt-2 text-sm leading-6 text-muted">Account, tool, or payment questions.</p></a><a href="mailto:privacy@doerforge.com" className="rounded-2xl border border-soft bg-white p-6 shadow-soft transition hover:-translate-y-1"><p className="text-xs font-bold uppercase tracking-wider text-muted">Privacy requests</p><p className="mt-3 font-extrabold text-[#147d70]">privacy@doerforge.com</p><p className="mt-2 text-sm leading-6 text-muted">Data access, correction, or deletion requests.</p></a></div><div className="mt-10 rounded-2xl bg-[#17211f] p-6 text-sm leading-7 text-[#c5d5cf]"><strong className="text-white">Include:</strong> your account email, the page or tool involved, what happened, and any relevant payment charge ID. Never include a password or secret key.</div></section>
    </main>
  );
}
