import Link from 'next/link';
import { toolCategories, tools } from '@/lib/tools';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <header className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-lg font-extrabold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#147d70] text-sm text-white">D</span>
          <span>Doerforge</span>
          <span className="hidden border-l border-soft pl-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:inline">Alex Studio</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/login" className="hidden px-4 py-2 text-sm font-semibold text-muted transition hover:text-ink sm:inline">Sign in</Link>
          <Link href="/register" className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0c514a]">Start creating</Link>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-[0.86fr_1.14fr] lg:px-10 lg:pb-32 lg:pt-20">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b9d8cc] bg-[#e7f4ed] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#176b5e]"><span className="h-2 w-2 rounded-full bg-[#ef8d6d]" /> The practical AI studio</div>
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.02] tracking-normal sm:text-6xl lg:text-[5.2rem]">Make good work feel <span className="text-[#147d70]">lighter.</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-muted">Doerforge brings focused AI tools for your career, business, creative work, and learning into one calm, capable workspace.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/register" className="rounded-full bg-[#147d70] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#147d70]/20 transition hover:-translate-y-0.5 hover:bg-[#0c514a]">Explore the workspace <span className="ml-2">↗</span></Link><span className="text-sm font-semibold text-muted">Free to start · pay with Telegram Stars</span></div>
          <div className="mt-12 flex items-center gap-5 text-sm text-muted"><div className="flex -space-x-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-[#efc7a6] text-xs font-bold">A</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-[#a8d4c5] text-xs font-bold">M</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-[#c5c8e8] text-xs font-bold">J</span></div><span>Built for people who do.</span></div>
        </div>

        <div className="relative min-h-[470px] lg:min-h-[560px]">
          <div className="absolute left-4 top-12 h-16 w-16 rotate-12 rounded-2xl border border-[#e2bda9] bg-[#f4d8c8]" />
          <div className="relative mx-auto max-w-[590px] rotate-[2deg] rounded-[26px] border border-white/80 bg-[#17211f] p-3 shadow-lift"><div className="rounded-[18px] bg-[#f8faf7] p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-soft pb-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#147d70] text-sm font-bold text-white">D</span><span className="text-sm font-extrabold">Your workspace</span></div><span className="rounded-full bg-[#e7f4ed] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#176b5e]">Tuesday, 9:41</span></div>
            <div className="grid gap-4 pt-6 sm:grid-cols-[1.1fr_0.9fr]"><div className="rounded-2xl bg-[#e7f4ed] p-5"><span className="text-xs font-bold uppercase tracking-widest text-[#176b5e]">Career</span><h2 className="mt-8 max-w-[220px] text-2xl font-extrabold leading-tight tracking-tight">Your next move, clearer.</h2><div className="mt-10 flex items-end justify-between"><span className="text-xs text-[#4c776e]">Resume readiness</span><strong className="text-3xl text-[#147d70]">84<span className="text-base">%</span></strong></div><div className="mt-2 h-2 rounded-full bg-white"><div className="h-2 w-[84%] rounded-full bg-[#147d70]" /></div></div>
              <div className="space-y-4"><div className="rounded-2xl border border-soft bg-white p-4"><div className="flex items-center justify-between"><span className="text-xs font-bold text-muted">Today&apos;s tools</span><span className="text-[#ef8d6d]">✦</span></div><div className="mt-5 space-y-3 text-sm font-bold"><p><span className="mr-2 text-[#147d70]">↗</span> Cover letter</p><p><span className="mr-2 text-[#147d70]">↗</span> ATS score check</p><p><span className="mr-2 text-[#147d70]">↗</span> Email writer</p></div></div><div className="rounded-2xl bg-[#17211f] p-4 text-white"><span className="text-xs text-[#b7ccc4]">Saved this week</span><p className="mt-2 text-3xl font-extrabold">12 <span className="text-sm font-medium text-[#b7ccc4]">outputs</span></p></div></div>
            </div>
          </div></div>
          <div className="absolute -bottom-3 -left-2 rounded-2xl border border-white bg-white p-4 shadow-soft sm:left-0"><p className="text-[10px] font-bold uppercase tracking-widest text-muted">One workspace</p><p className="mt-1 text-lg font-extrabold">11 useful tools</p></div>
        </div>
      </section>

      <section className="border-y border-soft bg-white px-6 py-24 lg:px-10"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#147d70]">The toolkit</p><h2 className="mt-3 max-w-xl text-4xl font-extrabold leading-tight tracking-normal">A focused tool for every kind of momentum.</h2></div><p className="max-w-sm text-sm leading-6 text-muted">No noisy dashboards. Just clear tools that turn a blank page into a useful first draft.</p></div><div className="mt-14 grid gap-8 md:grid-cols-5">{toolCategories.map((category, index) => <div key={category} className="border-t-2 border-[#dfe6e1] pt-5"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#147d70]">0{index + 1}</span><span className="text-sm text-[#ef8d6d]">✦</span></div><h3 className="mt-8 text-lg font-extrabold">{category}</h3><ul className="mt-4 space-y-2 text-sm leading-6 text-muted">{tools.filter((tool) => tool.category === category).map((tool) => <li key={tool.id}>{tool.name}</li>)}</ul></div>)}</div></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10"><span className="font-bold text-ink">Doerforge <span className="font-normal text-muted">by Alex Studio</span></span><span>© 2026 · Practical tools for people who do.</span></footer>
    </main>
  );
}
