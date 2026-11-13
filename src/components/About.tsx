import { useRef } from 'react';
import { profile } from '../data';
import { useLang } from '../lib/i18n';
import { Reveal, SectionHeading } from './ui';

function Photo({ badge }: { badge: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div className="relative mx-auto w-full max-w-sm" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
        <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] bg-accent" />
        <div className="aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line/10">
          <img
            src={profile.photo}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 hover:scale-105 hover:grayscale-0"
            loading="lazy"
          />
        </div>
      </div>

      {/* Badge circulaire rotatif */}
      <div className="absolute -bottom-8 -left-8 grid h-32 w-32 place-items-center rounded-full bg-ink text-bg shadow-2xl">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
          <defs>
            <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-current font-mono text-[9.5px] uppercase tracking-[0.2em]">
            <textPath href="#circle">{badge}</textPath>
          </text>
        </svg>
        <span className="font-serif text-3xl italic text-accent">✦</span>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  const facts = [
    { k: t('about.k1'), v: t('about.v1') },
    { k: t('about.k2'), v: t('about.v2') },
    { k: t('about.k3'), v: t('about.v3') },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          label={t('about.label')}
          title={
            <>
              {t('about.title1')} <span className="em">{t('about.title2')}</span> {t('about.title3')}{' '}
              <span className="em">{t('about.title4')}</span>.
            </>
          }
        />

        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal y={40}>
            <Photo badge={t('about.badge')} />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-2xl leading-snug sm:text-3xl">
                {t('about.lead1')} <span className="text-signal">{profile.school}</span>
                {t('about.lead2')}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-lg leading-relaxed text-muted">{t('about.body')}</p>
            </Reveal>

            <dl className="mt-12 divide-y divide-line/10 border-y border-line/10">
              {facts.map((f, i) => (
                <Reveal key={i} delay={150 + i * 80}>
                  <div className="group grid gap-2 py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
                    <dt className="label flex items-center gap-2 pt-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-line/30 transition-colors duration-300 group-hover:bg-accent" />
                      {f.k}
                    </dt>
                    <dd className="text-lg transition-transform duration-300 group-hover:translate-x-1">{f.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
