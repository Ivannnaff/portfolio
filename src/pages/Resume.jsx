import React from 'react';
import { ArrowUpRight, Printer } from 'lucide-react';

export default function ResumePage({ t, navigate }) {
  const r = t.resume;

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Back + Print */}
      <div className="flex items-center justify-between mb-12 print:hidden">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-[#4a4a46] dark:text-[#555451] hover:text-[#111110] dark:hover:text-[#e8e6e1] transition-colors"
        >
          {r.backButton}
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-[#e2e0db] dark:border-[#2a2a27] text-[#4a4a46] dark:text-[#999691] hover:text-[#111110] dark:hover:text-[#e8e6e1] hover:border-[#4a4a46] dark:hover:border-[#555451] transition-colors"
        >
          <Printer size={13} />
          {r.printButton}
        </button>
      </div>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-[#111110] dark:text-[#e8e6e1] mb-2">
          <span className="text-[#c4623a]">Ivan</span> Akbar Alfahrezi
        </h1>
        <p className="text-base text-[#3a3a36] dark:text-[#999691] mb-4">{r.role}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#4a4a46] dark:text-[#6b6b66] font-mono">
          <span>{r.location}</span>
          <a href={`mailto:${r.email}`} className="hover:text-[#c4623a] transition-colors">{r.email}</a>
          <a href={`https://${r.github}`} target="_blank" rel="noreferrer" className="hover:text-[#c4623a] transition-colors">{r.github}</a>
          <a href={`https://${r.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-[#c4623a] transition-colors">{r.linkedin}</a>
        </div>
      </div>

      {/* Profile / Summary */}
      <section className="mb-12 pb-12 border-b border-[#e2e0db] dark:border-[#2a2a27]">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b66] dark:text-[#555451] mb-4">Profile</h2>
        <p className="text-[#2a2a27] dark:text-[#c8c6c0] leading-relaxed">{r.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-12 pb-12 border-b border-[#e2e0db] dark:border-[#2a2a27]">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b66] dark:text-[#555451] mb-8">Experience</h2>
        <div className="space-y-8">
          {r.experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-medium text-[#111110] dark:text-[#e8e6e1]">{exp.role}</h3>
                <span className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] shrink-0">{exp.period}</span>
              </div>
              <p className="text-sm text-[#c4623a] mb-3">{exp.company}</p>
              <div className="space-y-2">
                {exp.points.map((point, pIdx) => (
                  <p key={pIdx} className="text-sm text-[#3a3a36] dark:text-[#999691] leading-relaxed pl-4 border-l-2 border-[#e2e0db] dark:border-[#2a2a27]">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-12 pb-12 border-b border-[#e2e0db] dark:border-[#2a2a27]">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b66] dark:text-[#555451] mb-8">Projects</h2>
        <div className="space-y-6">
          {r.projects.map((proj, idx) => (
            <div key={idx}>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <a href={proj.url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#111110] dark:text-[#e8e6e1] hover:text-[#c4623a] transition-colors">
                  {proj.name} <ArrowUpRight size={13} />
                </a>
                <span className="font-mono text-[10px] text-[#6b6b66] dark:text-[#555451] shrink-0">{proj.tech}</span>
              </div>
              <p className="text-sm text-[#3a3a36] dark:text-[#999691] leading-relaxed">{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12 pb-12 border-b border-[#e2e0db] dark:border-[#2a2a27]">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b66] dark:text-[#555451] mb-6">Skills</h2>
        <div className="space-y-3">
          {[
            { label: 'Languages', items: r.skills.languages },
            { label: 'Frontend',  items: r.skills.frontend  },
            { label: 'Backend',   items: r.skills.backend   },
            { label: 'Tools',     items: r.skills.tools     },
          ].map((group) => (
            <div key={group.label} className="flex gap-6 items-baseline">
              <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#6b6b66] dark:text-[#555451]">
                {group.label}
              </span>
              <p className="text-sm text-[#3a3a36] dark:text-[#999691]">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12 pb-12 border-b border-[#e2e0db] dark:border-[#2a2a27]">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b66] dark:text-[#555451] mb-8">Education</h2>
        {r.education.map((edu, idx) => (
          <div key={idx}>
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h3 className="font-medium text-[#111110] dark:text-[#e8e6e1]">{edu.school}</h3>
              <span className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] shrink-0">{edu.period}</span>
            </div>
            <p className="text-sm text-[#c4623a] mb-2">{edu.degree}</p>
            <p className="text-sm text-[#3a3a36] dark:text-[#999691] leading-relaxed">{edu.note}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section>
        <p className="text-[#3a3a36] dark:text-[#999691] leading-relaxed mb-6">
          Available for internships, freelance projects, and collaboration. The fastest way to reach me is through the contact form — I reply to every serious inquiry.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#c4623a] hover:text-[#a8522e] transition-colors"
        >
          Get in touch <ArrowUpRight size={13} />
        </button>
      </section>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          header, .print\\:hidden { display: none !important; }
          main { padding-top: 1rem !important; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

    </main>
  );
}
