import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/hooks';

/** Anneau qui suit le pointeur avec inertie et grossit sur les éléments cliquables. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [enabled] = useState(
    () => window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion(),
  );

  useEffect(() => {
    if (!enabled) return;
    const el = ring.current;
    if (!el) return;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
      const target = e.target as Element | null;
      el.classList.toggle('is-hover', !!target?.closest('a, button, [data-cursor], input, textarea'));
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };
    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  return enabled ? <div ref={ring} className="cursor-ring hidden md:block" aria-hidden="true" /> : null;
}
