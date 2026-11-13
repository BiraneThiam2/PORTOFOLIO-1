import { stack } from '../data';

/** Bandeau défilant infini avec les technologies. */
export default function Marquee() {
  const items = [...stack, ...stack];
  return (
    <div className="relative -rotate-1 border-y border-line/10 bg-accent py-4 text-[#111]" role="img" aria-label={`Technologies : ${stack.join(', ')}`}>
      <div className="group flex overflow-hidden mask-fade-x">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {items.map((s, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap text-2xl font-semibold tracking-tight sm:text-3xl">
              {i % 3 === 1 ? <span className="font-serif font-normal italic">{s}</span> : s}
              <span className="text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
