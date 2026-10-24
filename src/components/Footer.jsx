import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ t, tracks = [], navigate }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const time = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTimeStr(`It's ${time} at UTC+7`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: t.nav.home,    to: '/'        },
    { label: t.nav.now,     to: '/now'     },
    { label: t.nav.uses,    to: '/uses'    },
    { label: t.nav.til,     to: '/til'     },
    { label: t.nav.contact, to: '/contact' },
  ];

  const resources = [
    { label: 'Resume', href: '/resume' },
  ];

  const connect = [
    { label: 'GitHub',    href: 'https://github.com/Ivannnaff', external: true },
    { label: 'LinkedIn',  href: 'https://linkedin.com/in/IvanAkbarAlfahrezi', external: true },
    { label: 'Instagram', href: 'https://instagram.com/ivannnaff', external: true },
    { label: 'Email',     href: 'mailto:ivanalfa647@gmail.com' },
  ];

  return (
    <footer className="mt-20 border-t border-[#eeecea] dark:border-[#2a2a27]">
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-28 lg:pb-12">

        {/* Top row: handle + copyright | last played */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-sm text-[#111110] dark:text-[#e8e6e1]">ivannnaff</p>
            <p className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] mt-1">
              © {new Date().getFullYear()} Ivan Akbar Alfahrezi
            </p>
          </div>

          {tracks.length > 0 && (
            <a
              href={tracks[0].url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col sm:items-end gap-1"
            >
              <span className="font-mono text-xs text-[#6b6b66] dark:text-[#555451]">
                {tracks[0].nowPlaying ? t.footer.nowPlaying : t.footer.lastPlayed}
              </span>
              <span className="flex items-center gap-2.5">
                {tracks[0].image && (
                  <img
                    src={tracks[0].image}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                    className="h-9 w-9 rounded border border-[#eeecea] dark:border-[#2a2a27] object-cover shrink-0"
                  />
                )}
                <span className="flex flex-col sm:items-end">
                  <span className="inline-flex items-center gap-1 text-sm text-[#111110] dark:text-[#e8e6e1] group-hover:text-[#c4623a] transition-colors">
                    {tracks[0].nowPlaying && <span className="text-[#c4623a]">●</span>}
                    {tracks[0].name}
                    <ArrowUpRight size={12} />
                  </span>
                  <span className="text-xs text-[#4a4a46] dark:text-[#555451]">{tracks[0].artist}</span>
                </span>
              </span>
            </a>
          )}
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

          {/* This Site */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#4a4a46] dark:text-[#555451] mb-4">
              {t.footer.site}
            </p>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                    className="text-sm text-[#2a2a27] dark:text-[#999691] hover:text-[#111110] dark:hover:text-[#e8e6e1] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#4a4a46] dark:text-[#555451] mb-4">
              {t.footer.resources}
            </p>
            <ul className="space-y-2.5">
              {resources.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={!item.external ? (e) => { e.preventDefault(); navigate(item.href); } : undefined}
                    {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="inline-flex items-center gap-1 text-sm text-[#2a2a27] dark:text-[#999691] hover:text-[#111110] dark:hover:text-[#e8e6e1] transition-colors"
                  >
                    {item.label}
                    {item.external && <ArrowUpRight size={11} className="text-[#6b6b66] dark:text-[#555451]" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#4a4a46] dark:text-[#555451] mb-4">
              {t.footer.connect}
            </p>
            <ul className="space-y-2.5">
              {connect.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="inline-flex items-center gap-1 text-sm text-[#2a2a27] dark:text-[#999691] hover:text-[#111110] dark:hover:text-[#e8e6e1] transition-colors"
                  >
                    {item.label}
                    {item.external && <ArrowUpRight size={11} className="text-[#6b6b66] dark:text-[#555451]" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Live Time */}
        {timeStr && (
          <div className="mt-12 pt-6 border-t border-[#eeecea] dark:border-[#2a2a27] flex justify-end">
            <p className="font-mono text-xs text-[#6b6b66] dark:text-[#555451]">
              {timeStr}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
