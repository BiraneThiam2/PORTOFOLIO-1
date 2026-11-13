import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { projects } from '../data';
import { useLang } from '../lib/i18n';
import { projectFromHash } from '../lib/nav';
import { GithubIcon } from './ui';

/** Panneau « étude de cas » ouvert via #projet/<slug>. */
export default function CaseStudy() {
  const { t, tr } = useLang();
  const [slug, setSlug] = useState<string | null>(projectFromHash);
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const project = projects.find((p) => p.slug === slug && p.caseStudy);

  useEffect(() => {
    const onHash = () => setSlug(projectFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const close = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search + '#projects');
    setSlug(null);
  };

  useEffect(() => {
    if (!project) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    panel.current?.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.slug]);

  if (!project?.caseStudy) return null;
  const p = project;
  const cs = project.caseStudy;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-bg/60 backdrop-blur-sm" onClick={close}>
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-3xl overflow-y-auto border-l border-line/10 bg-bg shadow-2xl outline-none [animation:slideIn_.5s_cubic-bezier(.2,.8,.2,1)_both]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line/10 bg-bg/85 px-6 py-4 backdrop-blur sm:px-10">
          <span className="label">{t('projects.case')}</span>
          <button
            onClick={close}
            aria-label={t('case.close')}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bg transition-transform hover:rotate-90"
          >
            <X size={18} />
          </button>
        </div>

        {p.image && (
          <div className="border-b border-line/10" style={{ background: `hsl(${p.hue} 80% 60%)` }}>
            <img src={p.image} alt="" className="max-h-80 w-full object-cover" />
          </div>
        )}

        <div className="px-6 py-10 sm:px-10">
          <h2 id="case-title" className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {tr(p.title)}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{tr(p.description)}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5">
                <Play size={15} /> {t('projects.demo')}
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
                <GithubIcon size={16} /> {t('case.code')} <ArrowUpRight size={15} />
              </a>
            )}
          </div>

          <Block title={t('case.goal')}>
            <p className="text-xl leading-relaxed">{tr(cs.goal)}</p>
          </Block>

          <Block title={t('case.approach')}>
            <ol className="space-y-4">
              {cs.approach.map((a, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 leading-relaxed">
                  <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <span>{tr(a)}</span>
                </li>
              ))}
            </ol>
          </Block>

          {cs.results && (
            <Block title={t('case.results')}>
              <div className="grid gap-3 sm:grid-cols-2">
                {cs.results.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-line/10 p-5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-semibold tabular-nums text-signal">{tr(r.value)}</span>
                      {r.ref && <span className="font-mono text-sm tabular-nums text-muted line-through decoration-line/30">{tr(r.ref)}</span>}
                    </div>
                    <div className="mt-2 text-sm text-muted">{tr(r.label)}</div>
                  </div>
                ))}
              </div>
              {cs.resultsNote && <p className="mt-4 text-sm leading-relaxed text-muted">{tr(cs.resultsNote)}</p>}
            </Block>
          )}

          {cs.limits && (
            <Block title={t('case.limits')}>
              <ul className="space-y-3">
                {cs.limits.map((l, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hot" />
                    {tr(l)}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block title={t('case.stack')}>
            <div className="flex flex-wrap gap-2">
              {cs.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-line/10 pt-8">
      <h3 className="label mb-5">{title}</h3>
      {children}
    </section>
  );
}
