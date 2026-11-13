import { goals } from '../data';
import { Reveal, SectionHeading } from './ui';
import { useLang } from '../lib/i18n';

export default function Vision() {
  const { t, tr } = useLang();
  return (
    <section id="vision" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="06"
          label={t('vision.label')}
          title={
            <>
              {t('vision.title1')} <span className="em">tech</span> {t('vision.and')} <span className="em">business</span>.
            </>
          }
        />

        <div className="border-t border-line/15" role="list">
          {goals.map((g, i) => (
            <Reveal key={g.title.fr} delay={i * 80}>
              <div role="listitem" className="group relative overflow-hidden border-b border-line/15">
                {/* Balayage de couleur au survol */}
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(.7,0,.3,1)] group-hover:scale-y-100" />
                <div className="relative grid gap-3 px-2 py-8 transition-colors duration-500 group-hover:text-[#111] sm:grid-cols-[80px_1fr_1.2fr] sm:items-center sm:gap-8 sm:px-4">
                  <span className="font-mono text-sm text-muted transition-colors duration-500 group-hover:text-[#111]">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-4xl">{tr(g.title)}</h3>
                  <p className="text-muted transition-colors duration-500 group-hover:text-[#111]/80">{tr(g.description)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <blockquote className="mx-auto mt-20 max-w-3xl text-center text-2xl leading-snug sm:text-3xl">
            {t('vision.quote1')}
            <span className="em">{t('vision.quote2')}</span>
            {t('vision.quote3')}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
