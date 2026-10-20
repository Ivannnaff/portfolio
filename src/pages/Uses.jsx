import React from 'react';
import Footer from '../components/Footer';

export default function UsesPage({ t, tracks, navigate }) {
  const uses = t.uses;

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-medium tracking-tight mb-3">{uses.title}</h1>
        <p className="text-[#2a2a27] dark:text-[#999691] leading-relaxed">{uses.intro}</p>
      </div>

      {/* Sections */}
      <div className="divide-y divide-[#eeecea] dark:divide-[#2a2a27]">
        {uses.sections.map((section, idx) => (
          <section key={idx} className="py-8 grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-6 items-start">

            {/* Label */}
            <p className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] pt-1">
              {section.label}
            </p>

            {/* Items */}
            <ul className="space-y-4">
              {section.items.map((item, iIdx) => (
                <li key={iIdx}>
                  <p className="text-sm font-medium text-[#111110] dark:text-[#e8e6e1]">
                    {item.name}
                  </p>
                  {item.note && (
                    <p className="mt-0.5 text-sm text-[#3a3a36] dark:text-[#4a4a46] leading-relaxed">
                      {item.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>

          </section>
        ))}
      </div>

      <Footer t={t} tracks={tracks} navigate={navigate} />
    </main>
  );
}
