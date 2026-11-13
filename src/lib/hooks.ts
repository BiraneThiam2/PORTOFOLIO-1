import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Passe à true quand l'élément entre dans le viewport (une seule fois). */
export function useInView<T extends Element>(threshold = 0.15, rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}

/** Compteur animé de 0 à `target` lorsque `run` devient vrai. */
export function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);

  return value;
}

/** Effet machine à écrire qui fait défiler une liste de mots. */
export function useTypewriter(words: string[], typeMs = 70, holdMs = 1800) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(words[index]);
      const id = setTimeout(() => setIndex((i) => (i + 1) % words.length), holdMs * 1.5);
      return () => clearTimeout(id);
    }
    const word = words[index];
    let delay = deleting ? typeMs / 2 : typeMs;
    if (!deleting && text === word) delay = holdMs;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, typeMs, holdMs]);

  return text;
}

/** Heure locale de Dakar, mise à jour chaque seconde. */
export function useDakarTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Africa/Dakar',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now);
}

/** Progression (0 → 1) du défilement de la page. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

/** Progression d'un élément pendant qu'il traverse le centre de l'écran. */
export function useElementProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, (mid - rect.top) / rect.height)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, progress] as const;
}
