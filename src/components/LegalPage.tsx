import Link from 'next/link';

interface LegalSection {
  title: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export default function LegalPage({ eyebrow, title, intro, updated, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-soft bg-white/90">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-lg font-extrabold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#147d70] text-sm text-white">D</span>
            Doerforge
          </Link>
          <Link href="/" className="text-sm font-bold text-muted hover:text-ink">Back home</Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#147d70]">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted">{intro}</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">Last updated: {updated}</p>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-extrabold">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-[#4f5d58]">
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-14 border-t border-soft pt-6 text-sm text-muted">
          Questions? Contact <a className="font-bold text-[#147d70]" href="mailto:support@doerforge.com">support@doerforge.com</a>.
        </div>
      </article>
    </main>
  );
}
