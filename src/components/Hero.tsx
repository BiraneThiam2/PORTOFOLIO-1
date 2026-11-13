import { ArrowDownRight, Download } from 'lucide-react';
import { profile, projects } from '../data';
import { useCountUp, useDakarTime, useInView, useTypewriter } from '../lib/hooks';
import NeuralCanvas from './NeuralCanvas';
import { scrollToId } from '../lib/nav';
import { Magnetic } from './ui';
import { useLang } from '../lib/i18n';
import { useMemo } from 'react';

function SplitLine({ text, delay, className = '' }: { text: string; delay: number; className?: string }) {
  let n = 0;
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`} aria-hidden="true">
      {text.split(' ').map((word, w, words) => (
        <span key={w}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((c, i) => (
              <span key={i} className="inline-block animate-rise" style={{ animationDelay: `${delay + n++ * 35}ms` }}>
                {c}
              </span>
            ))}
          </span>
          {w < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}

function Stat({ value, suffix = '', label, run }: { value: number; suffix?: string; label: string; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div>
      <div className="text-3xl font-semibold tabular-nums sm:text-4xl">
        {n}
        <span className="text-signal">{suffix}</span>
      </div>
      <div className="label mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const roles = useMemo(() => profile.roles.map((r) => r[lang]), [lang]);
  const role = useTypewriter(roles);
  const time = useDakarTime();
  const [statsRef, statsIn] = useInView<HTMLDivElement>(0.3);

  return (
    <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 sm:pb-20">
      <NeuralCanvas className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/30 to-bg" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-x relative">
        <div className="mb-8 flex flex-wrap items-center gap-3 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line/15 bg-bg/60 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t('hero.available')}
          </span>
          <span className="label rounded-full border border-line/15 bg-bg/60 px-3 py-1.5 backdrop-blur">
            Dakar · <span className="tabular-nums text-ink">{time}</span> GMT
          </span>
        </div>

        <h1 className="text-[clamp(2.9rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
          <span className="sr-only">
            {profile.firstName} {profile.lastName}
          </span>
          <SplitLine text={profile.firstName} delay={100} />
          <SplitLine text={profile.lastName} delay={500} className="font-serif font-normal italic tracking-[-0.02em] text-signal" />
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="animate-fade-up" style={{ animationDelay: '900ms' }}>
            <p className="text-xl text-muted sm:text-2xl">
              {t('hero.student')}{' '}
              <span className="font-medium text-ink">
                {role}
                <span className="ml-0.5 inline-block w-[2px] animate-blink bg-signal align-[-0.1em]" style={{ height: '1em' }} />
              </span>
            </p>
            <p className="mt-2 text-muted">
              {t('hero.at')} {profile.school}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <button onClick={() => scrollToId('projects')} className="btn-primary group">
                  {t('hero.cta')}
                  <ArrowDownRight size={18} className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
                </button>
              </Magnetic>
              <Magnetic>
                <a href={profile.cv} download={profile.cvName} className="btn-ghost">
                  <Download size={17} /> {t('hero.cv')}
                </a>
              </Magnetic>
            </div>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 border-t border-line/15 pt-6 animate-fade-up"
            style={{ animationDelay: '1100ms' }}
          >
            <Stat value={projects.length} suffix="+" label={t('hero.projects')} run={statsIn} />
            <Stat value={2} suffix="+" label={t('hero.years')} run={statsIn} />
            <Stat value={1} label={t('hero.certs')} run={statsIn} />
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToId('about')}
        className="absolute bottom-6 right-6 hidden h-12 w-7 justify-center rounded-full border border-line/30 pt-2 sm:flex"
        aria-label={t('hero.scroll')}
      >
        <span className="h-2 w-1 animate-scroll-dot rounded-full bg-ink" />
      </button>
    </section>
  );
}
