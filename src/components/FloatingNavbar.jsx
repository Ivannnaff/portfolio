import React, { useState, useEffect } from 'react';
import { Home, Compass, Wrench, FileText, Mail, Sun, Moon } from 'lucide-react';

export default function FloatingNavbar() {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/now', label: 'Now', icon: Compass },
    { href: '/uses', label: 'Uses', icon: Wrench },
    { href: '/resume', label: 'Resume', icon: FileText },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      <nav className={`flex items-center gap-1 px-3 py-2 rounded-full border border-border bg-surface/80 backdrop-blur-md shadow-lg transition-all duration-300 ${scrolled ? 'p-1.5' : 'px-3 py-2'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-muted hover:text-fg hover:bg-border/50 transition-all ${scrolled ? 'px-2' : ''}`}
            >
              <Icon size={14} />
              <span className={`transition-all duration-300 overflow-hidden ${scrolled ? 'w-0 opacity-0 hidden sm:inline' : 'w-auto opacity-100'}`}>
                {item.label}
              </span>
            </a>
          );
        })}
        <div className="w-[1px] h-4 bg-border mx-1" />
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full text-muted hover:text-fg hover:bg-border/50 transition-all"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>
    </div>
  );
}
