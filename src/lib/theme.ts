import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export const getTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

function apply(next: Theme) {
  document.documentElement.classList.toggle('dark', next === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0a0a0c' : '#f3f0e8');
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* stockage indisponible : le thème reste valable pour la session */
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: next }));
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/** Bascule le thème avec une révélation circulaire depuis (x, y). */
export function toggleTheme(x?: number, y?: number) {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  const doc = document as ViewTransitionDoc;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!doc.startViewTransition || reduce) {
    apply(next);
    return;
  }

  const cx = x ?? window.innerWidth - 40;
  const cy = y ?? 40;
  const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));

  const transition = doc.startViewTransition(() => apply(next));
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
      { duration: 650, easing: 'cubic-bezier(.7,0,.3,1)', pseudoElement: '::view-transition-new(root)' } as KeyframeAnimationOptions,
    );
  });
}

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(getTheme);
  useEffect(() => {
    const onChange = () => setTheme(getTheme());
    window.addEventListener('themechange', onChange);
    return () => window.removeEventListener('themechange', onChange);
  }, []);
  return theme;
}
