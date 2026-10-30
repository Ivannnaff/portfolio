import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { translations } from '../translations';

export default function FloatingNavbar() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const savedLang = localStorage.getItem('lang') || 'en';
    setLang(savedLang);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'id' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    window.dispatchEvent(new CustomEvent('langchange', { detail: next }));
  };

  const t = translations[lang]?.nav || translations.en.nav;

  const navItems = [
    { href: '/', label: t.home },
    { href: '/now', label: t.now },
    { href: '/uses', label: t.uses },
    { href: '/uses', label: 'TIL' },
    { href: '/contact', label: t.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
      <div className="max-w-2xl w-full px-6 flex justify-center">
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full transition-all duration-300 ease-out ${
            scrolled
              ? 'px-6 py-2.5 rounded-2xl bg-surface/90 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 scale-[0.98] max-w-lg border-0'
              : 'px-0 py-1 bg-transparent shadow-none border-0'
          }`}
        >
          <div className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-muted hover:text-fg transition-colors duration-200 text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono text-muted hover:text-fg hover:bg-border/40 transition-all duration-200 uppercase"
              aria-label="Translate"
              title="Switch Language"
            >
              <Globe size={14} />
              <span>{lang}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted hover:text-fg hover:bg-border/40 transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
