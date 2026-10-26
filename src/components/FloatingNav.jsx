import React, { useState, useEffect } from 'react';
import { Home, Compass, Wrench, FileText, Mail, Sun, Moon } from 'lucide-react';

export default function FloatingNav() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/now', label: 'Now', icon: Compass },
    { href: '/uses', label: 'Uses', icon: Wrench },
    { href: '/resume', label: 'Resume', icon: FileText },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#e0ddd6] dark:border-[#2a2a27] bg-white/80 dark:bg-[#1a1a18]/80 backdrop-blur-md shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4a4a46] dark:text-[#999691] hover:text-[#111110] dark:hover:text-[#e8e6e1] hover:bg-[#eeecea] dark:hover:bg-[#2a2a27] transition-all"
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}
        <div className="w-[1px] h-4 bg-[#e0ddd6] dark:bg-[#2a2a27] mx-1" />
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full text-[#4a4a46] dark:text-[#999691] hover:text-[#111110] dark:hover:text-[#e8e6e1] hover:bg-[#eeecea] dark:hover:bg-[#2a2a27] transition-all"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>
    </div>
  );
}
