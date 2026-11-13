import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { prefersReducedMotion, useInView } from '../lib/hooks';

/** Fait apparaître son contenu quand il entre dans l'écran. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, '--reveal-y': `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEF';

/** Texte qui se « décode » caractère par caractère à l'apparition. */
export function Scramble({ text, className = '' }: { text: string; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame++;
      const revealed = Math.floor(frame / 2);
      setOut(
        text
          .split('')
          .map((c, i) => (i < revealed || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      );
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** En-tête de section : numéro + libellé décodé + titre. */
export function SectionHeading({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-14 sm:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-3 label">
          <span className="text-signal">{index}</span>
          <span className="h-px w-10 bg-line/25" />
          <Scramble text={label} />
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Bouton « magnétique » qui suit légèrement le pointeur. */
export function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  );
}

export function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.01-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
