import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/hooks';

type Node = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean; phase: number };

/** Réseau de neurones interactif : les nœuds se connectent et réagissent au pointeur. */
export default function NeuralCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = prefersReducedMotion();
    const LINK = 140;
    const MOUSE = 200;
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    let ink = '242 239 231';
    let signal = '212 255 58';

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      ink = s.getPropertyValue('--ink').trim();
      signal = s.getPropertyValue('--signal').trim();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(95, Math.floor((w * h) / 13000));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.8,
        hot: i % 9 === 0,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE && d > 1) {
            n.vx += (dx / d) * 0.012;
            n.vy += (dy / d) * 0.012;
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed < 0.12) {
            n.vx += (Math.random() - 0.5) * 0.04;
            n.vy += (Math.random() - 0.5) * 0.04;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgb(${ink} / ${(1 - d / LINK) * 0.22})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE) {
          ctx.strokeStyle = `rgb(${signal} / ${(1 - dm / MOUSE) * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const pulse = n.hot ? 1 + Math.sin(t / 500 + n.phase) * 0.6 : 1;
        ctx.fillStyle = n.hot ? `rgb(${signal})` : `rgb(${ink} / 0.55)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse * (n.hot ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      if (running) raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reduce) draw(0);
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    readColors();
    resize();

    const themeObs = new MutationObserver(() => {
      readColors();
      if (reduce) draw(0);
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const visObs = new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting && !reduce;
      if (running && !wasRunning) raf = requestAnimationFrame(loop);
    });
    visObs.observe(canvas);

    if (reduce) {
      running = false;
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      visObs.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
