import { Award, ArrowUpRight } from 'lucide-react';
import { certifications, educations } from '../data';
import { useElementProgress } from '../lib/hooks';
import { Reveal, SectionHeading } from './ui';
import { useLang } from '../lib/i18n';

export default function Education() {
  const [lineRef, progress] = useElementProgress<HTMLOListElement>();
  const { t, tr } = useLang();

  return (
    <section id="education" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="05"
          label={t('edu.label')}
          title={
            <>
              {t('edu.title1')} <span className="em">{t('edu.title2')}</span> {t('edu.title3')}
            </>
          }
        />

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          {/* Timeline : la ligne se remplit au défilement */}
          <ol ref={lineRef} className="relative pl-10">
            <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line/15" aria-hidden="true" />
            <span
              className="absolute left-[7px] top-2 w-px bg-signal transition-[height] duration-150"
              style={{ height: `calc(${progress * 100}% - 1rem)` }}
              aria-hidden="true"
            />
            {educations.map((e, i) => {
              const lit = progress > i / educations.length;
              return (
                <li key={e.degree.fr} className="relative pb-14 last:pb-0">
                  <span
                    className={`absolute -left-10 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 transition-colors duration-500 ${
                      lit ? 'border-signal bg-signal' : 'border-line/30 bg-bg'
                    }`}
                  >
                    {e.current && <span className="absolute h-full w-full animate-ping rounded-full bg-accent/60" />}
                  </span>
                  <Reveal delay={i * 120}>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="label">{tr(e.period)}</span>
                      {e.current && (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#111]">
                          {t('edu.current')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{tr(e.degree)}</h3>
                    <p className="mt-1 text-signal">{tr(e.school)}</p>
                    <p className="mt-4 max-w-xl leading-relaxed text-muted">{tr(e.description)}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.subjects.map((s) => (
                        <span key={s.fr} className="chip">
                          {tr(s)}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* Certifications */}
          <div>
            <Reveal>
              <div className="label mb-5 flex items-center gap-2">
                <Award size={14} className="text-signal" /> {t('edu.certs')}
              </div>
            </Reveal>
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={100 + i * 100}>
                <a
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-3xl bg-ink p-7 text-bg transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/30 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-[#111]">
                      <Award size={22} />
                    </span>
                    <ArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                  <h3 className="relative mt-8 text-2xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="relative mt-1 font-mono text-xs uppercase tracking-wider opacity-60">
                    {c.issuer} · {tr(c.period)}
                  </p>
                  <p className="relative mt-4 leading-relaxed opacity-75">{tr(c.description)}</p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {c.skills.map((s) => (
                      <span key={s} className="rounded-full border border-bg/20 px-3 py-1 font-mono text-[11px] opacity-80">
                        {s}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
