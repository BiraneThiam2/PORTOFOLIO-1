import { useEffect, useState } from 'react';
import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import { GITHUB_USER, profile } from '../data';
import { useLang } from '../lib/i18n';
import { useInView, useCountUp } from '../lib/hooks';
import { Reveal, SectionHeading } from './ui';

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
};

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#663399',
};

const CACHE_KEY = 'gh-repos-v1';
const CACHE_MS = 60 * 60 * 1000;

/** Récupère les dépôts publics (avec cache d'une heure pour ménager la limite de l'API). */
function useRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.at < CACHE_MS) {
        setRepos(cached.data);
        return;
      }
    } catch {
      /* cache illisible : on refait l'appel */
    }
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => {
        const list = data.filter((r) => !r.fork && r.name !== GITHUB_USER);
        setRepos(list);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: list }));
        } catch {
          /* stockage indisponible */
        }
      })
      .catch((e) => {
        if (e?.name !== 'AbortError') setError(true);
      });
    return () => ctrl.abort();
  }, []);

  return { repos, error };
}

function timeAgo(iso: string, lang: string) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return rtf.format(Math.round(diff), 'second');
}

function BigStat({ value, label, run }: { value: number; label: string; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div>
      <div className="text-5xl font-semibold tabular-nums">{n}</div>
      <div className="label mt-2">{label}</div>
    </div>
  );
}

export default function GithubActivity() {
  const { t, lang } = useLang();
  const { repos, error } = useRepos();
  const [statsRef, statsIn] = useInView<HTMLDivElement>(0.3);

  const stars = repos?.reduce((s, r) => s + r.stargazers_count, 0) ?? 0;
  const langCounts = Object.entries(
    (repos ?? []).reduce<Record<string, number>>((acc, r) => {
      if (r.language) acc[r.language] = (acc[r.language] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const langTotal = langCounts.reduce((s, [, c]) => s + c, 0);

  return (
    <section id="github" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="04"
          label={t('gh.label')}
          title={
            <>
              {t('gh.title1')} <span className="em">{t('gh.title2')}</span> {t('gh.title3')}
            </>
          }
          intro={t('gh.intro')}
        />

        {error ? (
          <div className="rounded-3xl border border-line/15 p-8 text-center">
            <p className="text-muted">{t('gh.error')}</p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">
              {t('gh.all')} <ArrowUpRight size={16} />
            </a>
          </div>
        ) : (
          <>
            {/* Chiffres + répartition des langages */}
            <div ref={statsRef} className="mb-10 grid gap-8 rounded-3xl border border-line/10 p-6 sm:p-8 lg:grid-cols-[auto_auto_1fr] lg:gap-16">
              <BigStat value={repos?.length ?? 0} label={t('gh.repos')} run={statsIn && !!repos} />
              <BigStat value={stars} label={t('gh.stars')} run={statsIn && !!repos} />
              <div>
                <div className="label mb-3">{t('gh.langs')}</div>
                <div className="flex h-3 overflow-hidden rounded-full bg-line/10">
                  {langCounts.map(([name, c]) => (
                    <div
                      key={name}
                      title={`${name} · ${Math.round((c / langTotal) * 100)}%`}
                      className="h-full transition-[width] duration-1000 ease-out"
                      style={{ width: statsIn ? `${(c / langTotal) * 100}%` : '0%', background: LANG_COLORS[name] ?? '#888' }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                  {langCounts.map(([name, c]) => (
                    <span key={name} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: LANG_COLORS[name] ?? '#888' }} />
                      {name} <span className="font-mono text-xs">{Math.round((c / langTotal) * 100)}%</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dépôts récents */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(repos ?? Array.from({ length: 6 }, () => null)).slice(0, 6).map((r, i) =>
                r ? (
                  <Reveal key={r.name} delay={i * 60}>
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-2xl border border-line/10 p-5 transition-colors duration-300 hover:border-ink"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="break-all font-mono text-sm font-medium">{r.name}</span>
                        <ArrowUpRight size={16} className="shrink-0 text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-ink" />
                      </div>
                      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                        {r.description || t('gh.nodesc')}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted">
                        {r.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full" style={{ background: LANG_COLORS[r.language] ?? '#888' }} />
                            {r.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={12} /> {r.stargazers_count}
                        </span>
                        {r.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork size={12} /> {r.forks_count}
                          </span>
                        )}
                        <span className="ml-auto">{timeAgo(r.pushed_at, lang)}</span>
                      </div>
                    </a>
                  </Reveal>
                ) : (
                  <div key={i} className="h-40 animate-pulse rounded-2xl bg-line/5" />
                ),
              )}
            </div>

            <div className="mt-8 text-center">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {t('gh.all')} <ArrowUpRight size={16} />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
