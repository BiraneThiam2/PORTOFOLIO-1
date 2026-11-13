import { useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, BookOpen, Play } from 'lucide-react';
import { categories, projects, type Category, type Project } from '../data';
import { useLang } from '../lib/i18n';
import { openProject } from '../lib/nav';
import { GithubIcon, Reveal, SectionHeading } from './ui';

/** Aperçu du projet : image si disponible, sinon motif généré à partir de sa couleur. */
function Preview({ project: p, className = '' }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false);
  const Icon = p.icon;
  const showImage = p.image && !failed;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, hsl(${p.hue} 85% 62%), hsl(${(p.hue + 40) % 360} 80% 48%))` }}
    >
      {showImage ? (
        <img
          src={p.image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="relative grid h-full w-full place-items-center">
          <div
            className="absolute inset-0 opacity-30 [background-image:radial-gradient(#111_1px,transparent_1px)] [background-size:18px_18px]"
            aria-hidden="true"
          />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[18px] border-[#111]/10" aria-hidden="true" />
          <span className="relative grid h-20 w-20 place-items-center rounded-3xl bg-[#111] text-white shadow-2xl transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110">
            <Icon size={34} />
          </span>
          <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-wider text-[#111]/60">
            {p.tech[0]}
          </span>
        </div>
      )}
    </div>
  );
}

function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T>(null);
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    if (e.pointerType === 'mouse') {
      el.style.transform = `perspective(1000px) rotateX(${(y / r.height - 0.5) * -max}deg) rotateY(${(x / r.width - 0.5) * max}deg) translateY(-4px)`;
    }
  };
  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return { ref, onPointerMove, onPointerLeave };
}

function Actions({ project: p }: { project: Project }) {
  const { t, tr } = useLang();
  const primary =
    'inline-flex flex-1 items-center justify-between gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-colors duration-300 hover:bg-accent hover:text-[#111]';
  const round =
    'grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line/15 text-muted transition-colors hover:border-ink hover:text-ink';

  return (
    <div className="relative mt-6 flex items-center gap-2 border-t border-line/10 pt-5">
      {p.caseStudy ? (
        <button onClick={() => openProject(p.slug)} className={primary}>
          <span className="flex items-center gap-2">
            <BookOpen size={15} /> {t('projects.case')}
          </span>
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
        </button>
      ) : (
        <a href={p.link} target="_blank" rel="noopener noreferrer" className={primary}>
          {p.link.endsWith('.pdf') ? t('projects.doc') : t('projects.view')}
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
        </a>
      )}
      {p.demo && (
        <a
          href={p.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t('projects.demo')} — ${tr(p.title)}`}
          title={t('projects.demo')}
          className={`${round} border-accent bg-accent text-[#111] hover:border-accent hover:text-[#111]`}
        >
          <Play size={15} />
        </a>
      )}
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t('projects.source')} — ${tr(p.title)}`}
          title={t('projects.source')}
          className={round}
        >
          <GithubIcon size={16} />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const tilt = useTilt<HTMLElement>();
  const { tr } = useLang();

  return (
    <div className="animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
      <article
        {...tilt}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-surface/50 transition-[transform,border-color] duration-300 ease-out hover:border-line/30"
        style={{ '--hue': p.hue } as CSSProperties}
      >
        <div className="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Preview project={p} className="aspect-[2/1] border-b border-line/10" />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {p.tech.map((x) => (
                <span key={x} className="chip">
                  {x}
                </span>
              ))}
            </div>
            <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight">{tr(p.title)}</h3>
          <p className="mt-3 flex-1 leading-relaxed text-muted">{tr(p.description)}</p>
          <Actions project={p} />
        </div>
      </article>
    </div>
  );
}

function FeaturedCard({ project: p }: { project: Project }) {
  const tilt = useTilt<HTMLElement>(3);
  const { t, tr } = useLang();

  return (
    <div className="animate-fade-up md:col-span-2 lg:col-span-3">
      <article
        {...tilt}
        className="group relative grid overflow-hidden rounded-3xl border border-line/10 bg-surface/50 transition-[transform,border-color] duration-300 ease-out hover:border-line/30 lg:grid-cols-[1.25fr_1fr]"
        style={{ '--hue': p.hue } as CSSProperties}
      >
        <div className="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Preview project={p} className="aspect-[2/1] lg:aspect-auto lg:min-h-[340px]" />
        <div className="flex flex-col p-6 sm:p-8">
          <span className="w-fit rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[#111]">
            ★ {t('projects.featured')}
          </span>
          <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{tr(p.title)}</h3>
          <p className="mt-4 flex-1 text-lg leading-relaxed text-muted">{tr(p.description)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tech.map((x) => (
              <span key={x} className="chip">
                {x}
              </span>
            ))}
          </div>
          <Actions project={p} />
        </div>
      </article>
    </div>
  );
}

export default function Projects() {
  const { t, tr } = useLang();
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const list = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));
  const count = (id: Category | 'all') =>
    id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(id)).length;
  let n = 0;

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="03"
          label={t('projects.label')}
          title={
            <>
              {t('projects.title1')} <span className="em">{t('projects.title2')}</span>.
            </>
          }
          intro={t('projects.intro')}
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={t('projects.filter')}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === c.id
                    ? 'border-accent bg-accent text-[#111]'
                    : 'border-line/15 text-muted hover:border-line/40 hover:text-ink'
                }`}
              >
                {tr(c.label)}
                <sup className="ml-1 font-mono text-[10px]">{count(c.id)}</sup>
              </button>
            ))}
          </div>
        </Reveal>

        <div key={filter} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) =>
            p.featured ? (
              <FeaturedCard key={p.slug} project={p} />
            ) : (
              <ProjectCard key={p.slug} project={p} index={n++} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
