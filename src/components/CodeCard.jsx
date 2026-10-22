import React, { useRef, useState } from 'react';

const k = 'text-[#c4623a]';
const key = 'text-[#111110] dark:text-[#e8e6e1]';
const str = 'text-[#4a7c59] dark:text-[#7fb08a]';
const punc = 'text-[#888683] dark:text-[#666461]';

export default function CodeCard() {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`,
    });
  };

  const onMouseLeave = () =>
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)' });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...style, transition: 'transform 180ms ease-out' }}
      className="rounded-xl border border-[#d0cdc6] dark:border-[#2a2a27] bg-[#fafaf8] dark:bg-[#161615] overflow-hidden shadow-sm"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#eeecea] dark:border-[#2a2a27]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-[#888683] dark:text-[#666461]">about.js</span>
      </div>
      <pre className="font-mono text-[11px] sm:text-xs leading-[1.8] p-4 sm:p-5 overflow-x-auto select-none">
<span className={k}>const</span> <span className={key}>developer</span> <span className={punc}>=&#123;</span>
  <span className={key}>name</span><span className={punc}>:</span> <span className={str}>"Ivan Akbar Alfahrezi"</span><span className={punc}>,</span>
  <span className={key}>role</span><span className={punc}>:</span> <span className={str}>"Full-Stack Web Developer"</span><span className={punc}>,</span>
  <span className={key}>based</span><span className={punc}>:</span> <span className={str}>"Semarang, Indonesia"</span><span className={punc}>,</span>
  <span className={key}>stack</span><span className={punc}>:</span> <span className={punc}>[</span><span className={str}>"Laravel"</span><span className={punc}>,</span> <span className={str}>"React"</span><span className={punc}>,</span> <span className={str}>"Next.js"</span><span className={punc}>]</span><span className={punc}>,</span>
  <span className={key}>learning</span><span className={punc}>:</span> <span className={str}>"TypeScript & AI Integration"</span><span className={punc}>,</span>
  <span className={key}>available</span><span className={punc}>:</span> <span className={punc}>!</span><span className={key}>false</span><span className={punc}>,</span>
<span className={punc}>&#125;</span><span className={punc}>;</span>

<span className={k}>export default</span> <span className={key}>developer</span><span className={punc}>;</span> <span className="cursor-blink text-[#c4623a]">▌</span>
      </pre>
    </div>
  );
}
