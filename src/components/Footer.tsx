import { ArrowUp, Command } from 'lucide-react';
import { nav, profile } from '../data';
import { openPalette, scrollToId } from '../lib/nav';
import { useLang } from '../lib/i18n';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-line/10 pt-20">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="label mb-4">{t('footer.nav')}</div>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollToId(n.id)} className="text-muted transition-colors hover:text-ink">
                    {t(n.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label mb-4">{t('footer.social')}</div>
            <ul className="space-y-2">
              <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">GitHub ↗</a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">LinkedIn ↗</a></li>
              <li><a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-ink">Email ↗</a></li>
              <li><a href={profile.cv} download={profile.cvName} className="text-muted transition-colors hover:text-ink">{t('hero.cv')} (PDF) ↓</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <button
              onClick={() => scrollToId('top')}
              className="group grid h-14 w-14 place-items-center rounded-full bg-accent text-[#111]"
              aria-label={t('nav.top')}
            >
              <ArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
            <button onClick={openPalette} className="hidden items-center gap-2 font-mono text-xs text-muted hover:text-ink sm:flex">
              {t('footer.tip1')} <span className="chip gap-1"><Command size={11} /> K</span> {t('footer.tip2')}
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-16 select-none whitespace-nowrap text-center text-[17.5vw] font-semibold leading-[0.8] tracking-[-0.05em] text-line/[0.07]"
        aria-hidden="true"
      >
        Birane<span className="font-serif font-normal italic">Thiam</span>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-2 border-t border-line/10 py-6 font-mono text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
        <span>{t('footer.made')}</span>
      </div>
    </footer>
  );
}
