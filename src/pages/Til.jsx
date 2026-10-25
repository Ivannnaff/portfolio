import React, { useState } from 'react';
import Footer from '../components/Footer';

// Warna per tag
const TAG_COLORS = {
  CSS:        'bg-blue-50   dark:bg-blue-950/40   text-blue-600   dark:text-blue-400   border-blue-200   dark:border-blue-900',
  React:      'bg-cyan-50   dark:bg-cyan-950/40   text-cyan-600   dark:text-cyan-400   border-cyan-200   dark:border-cyan-900',
  Laravel:    'bg-red-50    dark:bg-red-950/40    text-red-600    dark:text-red-400    border-red-200    dark:border-red-900',
  Git:        'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900',
  TypeScript: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900',
  'Next.js':  'bg-zinc-100  dark:bg-zinc-800/60   text-zinc-600   dark:text-zinc-400   border-zinc-200   dark:border-zinc-700',
};

const DEFAULT_TAG_COLOR = 'bg-zinc-50 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800';

function TagBadge({ tag, small = false }) {
  const color = TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
  return (
    <span className={`inline-block font-mono border rounded px-1.5 py-0.5 ${small ? 'text-[10px]' : 'text-xs'} ${color}`}>
      {tag}
    </span>
  );
}

export default function TilPage({ t, tracks, navigate }) {
  const til = t.til;
  const entries = til.entries;

  // Kumpulkan semua tag unik
  const allTags = ['All', ...Array.from(new Set(entries.map((e) => e.tag)))];
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? entries
    : entries.filter((e) => e.tag === activeTag);

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-medium tracking-tight mb-3">{til.title}</h1>
        <p className="text-[#2a2a27] dark:text-[#999691] leading-relaxed">{til.intro}</p>
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`font-mono text-xs px-3 py-1 rounded border transition-colors
              ${activeTag === tag
                ? 'bg-[#111110] dark:bg-[#e8e6e1] text-white dark:text-[#111110] border-[#111110] dark:border-[#e8e6e1]'
                : 'text-[#4a4a46] dark:text-[#555451] border-[#eeecea] dark:border-[#2a2a27] hover:border-[#888683] dark:hover:border-[#555451] hover:text-[#111110] dark:hover:text-[#e8e6e1]'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-0 divide-y divide-[#eeecea] dark:divide-[#2a2a27]">
        {filtered.map((entry, idx) => (
          <article key={idx} className="py-7">
            <div className="flex items-center gap-3 mb-3">
              <TagBadge tag={entry.tag} small />
              <span className="font-mono text-xs text-[#6b6b66] dark:text-[#555451]">
                {entry.date}
              </span>
            </div>
            <h2 className="text-base font-medium text-[#111110] dark:text-[#e8e6e1] mb-2 leading-snug">
              {entry.title}
            </h2>
            <p className="text-sm text-[#3a3a36] dark:text-[#4a4a46] leading-relaxed">
              {entry.body}
            </p>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-[#4a4a46] dark:text-[#555451] py-8">No entries for this tag yet.</p>
      )}

      <Footer t={t} tracks={tracks} navigate={navigate} />

    </main>
  );
}
