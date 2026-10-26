import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
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

  return (
    <footer className="mt-20 border-t border-[#eeecea] dark:border-[#2a2a27]">
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-sm text-[#111110] dark:text-[#e8e6e1]">ivannnaff</p>
            <p className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] mt-1">
              © {new Date().getFullYear()} Ivan Akbar Alfahrezi
            </p>
          </div>
          <p className="font-mono text-xs text-[#6b6b66] dark:text-[#555451]">{timeStr}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs">
          <a href="/resume" className="text-[#4a4a46] dark:text-[#999691] hover:text-[#c4623a] transition-colors">Resume</a>
          <a href="https://github.com/Ivannnaff" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#4a4a46] dark:text-[#999691] hover:text-[#c4623a] transition-colors">
            GitHub <ArrowUpRight size={12} />
          </a>
          <a href="https://linkedin.com/in/IvanAkbarAlfahrezi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#4a4a46] dark:text-[#999691] hover:text-[#c4623a] transition-colors">
            LinkedIn <ArrowUpRight size={12} />
          </a>
          <a href="mailto:ivanalfa647@gmail.com" className="inline-flex items-center gap-1 text-[#4a4a46] dark:text-[#999691] hover:text-[#c4623a] transition-colors">
            Email <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
