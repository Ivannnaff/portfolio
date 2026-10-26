import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/now', label: 'Now' },
    { href: '/uses', label: 'Uses' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="max-w-2xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between sticky top-0 bg-[var(--bg)]/80 backdrop-blur-md z-50">
      <nav className="flex items-center gap-6 text-sm font-medium">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="text-muted hover:text-accent transition-colors">
            {item.label}
          </a>
        ))}
      </nav>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-muted hover:text-accent hover:bg-surface transition-all"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}
