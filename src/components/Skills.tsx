import { useState } from 'react';
import { softSkills, technicalSkills, type Skill } from '../data';
import { useCountUp, useInView } from '../lib/hooks';
import { Reveal, SectionHeading } from './ui';
import { useLang } from '../lib/i18n';
import type { UIKey } from '../i18n/ui';

const tabs = [
  { id: 'tech', label: 'skills.tech' as UIKey, skills: technicalSkills },
  { id: 'soft', label: 'skills.soft' as UIKey, skills: softSkills },
] as const;

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const value = useCountUp(skill.pct, inView, 1200 + index * 80);
  const Icon = skill.icon;
  const { tr } = useLang();

  return (
    <div
      ref={ref}
      className="group animate-fade-up rounded-2xl border border-line/10 p-5 transition-colors duration-300 hover:border-line/30"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-line/5 transition-colors duration-300 group-hover:bg-accent group-hover:text-[#111]">
            <Icon size={18} />
          </span>
          <span className="font-medium">{tr(skill.name)}</span>
        </div>
        <span className="font-mono text-sm tabular-nums text-muted">{value}%</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-line/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-signal transition-[width] duration-[1400ms] ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{ width: inView ? `${skill.pct}%` : '0%', transitionDelay: `${index * 80}ms` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('tech');
  const current = tabs.find((x) => x.id === tab)!;
  const { t } = useLang();

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="02"
          label={t('skills.label')}
          title={
            <>
              {t('skills.title1')} <span className="em">{t('skills.title2')}</span>
              {t('skills.title3')}
            </>
          }
          intro={t('skills.intro')}
        />

        <Reveal>
          <div className="mb-10 inline-flex rounded-full border border-line/15 p-1" role="tablist" aria-label={t('skills.tabs')}>
            {tabs.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={tab === x.id}
                onClick={() => setTab(x.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  tab === x.id ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
                }`}
              >
                {t(x.label)}
                <span className="ml-2 font-mono text-[11px] opacity-60">{x.skills.length}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div key={tab} className="grid gap-4 sm:grid-cols-2" role="tabpanel">
          {current.skills.map((s, i) => (
            <SkillRow key={s.name.fr} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
