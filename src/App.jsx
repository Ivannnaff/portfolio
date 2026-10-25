import React, { useState, useEffect, useRef } from 'react';
import {
  Moon, Sun, ArrowUpRight, CheckCircle2,
  House, Activity, Wrench, Lightbulb, Mail,
  SlidersHorizontal, Check
} from 'lucide-react';
import { translations } from './translations';
import UsesPage from './pages/Uses';
import TilPage from './pages/Til';
import Footer from './components/Footer';
import ResumePage from './pages/Resume';
import Turnstile from './components/Turnstile';
import CodeCard from './components/CodeCard';

const getLoc = () => ({
  path: typeof window !== 'undefined' ? window.location.pathname : '/',
});

const LASTFM_USER = "ivannaff_";
const LASTFM_API_KEY = "2d80059669d53a16fda4ee530bf363c2";
const lastfmConfigured = !LASTFM_USER.startsWith("YOUR_") && !LASTFM_API_KEY.startsWith("YOUR_");

export default function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [tracks, setTracks] = useState([]);
  const [loc, setLoc] = useState(getLoc);
  const [formState, setFormState] = useState('idle'); // idle | sending | success | error
  const [formError, setFormError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [dockHidden, setDockHidden] = useState(false);
  const [dockSettingsOpen, setDockSettingsOpen] = useState(false);
  const dockRef = useRef(null);
  const turnstileRef = useRef(null);

  const t = translations[lang];

  const pages = ['home', 'now', 'uses', 'til', 'resume', 'contact'];
  const page = pages.includes(loc.path.substring(1)) 
    ? loc.path.substring(1) 
    : (loc.path === '/' ? 'home' : '404');

  // Dynamic Document Title
  useEffect(() => {
    const titles = {
      home: "Ivan Akbar Alfahrezi — Full-Stack Developer",
      now: "Now — Ivan Akbar Alfahrezi",
      uses: "Uses — Ivan Akbar Alfahrezi",
      til: "TIL — Ivan Akbar Alfahrezi",
      contact: "Contact — Ivan Akbar Alfahrezi",
      resume: "Resume — Ivan Akbar Alfahrezi",
    };
    document.title = titles[page] || "Ivan Akbar Alfahrezi";
  }, [page]);

  // Outside click for dock settings
  useEffect(() => {
    function handleClickOutside(e) {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setDockSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Scroll & Dock visibility
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        if (y <= 80) {
          setDockHidden(false);
        } else if (y > lastY + 40) {
          setDockHidden(true);
        } else if (y < lastY - 40) {
          setDockHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Last.fm
  useEffect(() => {
    if (!lastfmConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(LASTFM_USER)}&api_key=${LASTFM_API_KEY}&format=json&limit=8`
        );
        const data = await res.json();
        let raw = data?.recenttracks?.track ?? [];
        if (!Array.isArray(raw)) raw = [raw];
        const mapped = raw
          .map((tr) => {
            const images = tr.image || [];
            const img = images.find((i) => i.size === 'extralarge')?.['#text'] || images[images.length - 1]?.['#text'] || '';
            return {
              name: tr.name,
              artist: tr.artist?.['#text'] ?? '',
              image: img,
              url: tr.url ?? '',
              nowPlaying: tr['@attr']?.nowplaying === 'true'
            };
          })
          .filter((tr, i, arr) => i === 0 || tr.name !== arr[i - 1].name || tr.artist !== arr[i - 1].artist)
          .slice(0, 3);
        if (!cancelled) setTracks(mapped);
      } catch {
        if (!cancelled) setTracks([]);
      }
    })();
    return () => { cancelled = true; };
  }, [page]);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setLoc({ path: to });
    setDockSettingsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (!turnstileToken) {
      setFormState('error');
      setFormError(t.contact.errorHuman);
      turnstileRef.current?.reset();
      return;
    }

    setFormState('sending');
    setFormError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
          token: turnstileToken,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFormState('success');
      form.reset();
      turnstileRef.current?.reset();
      setTimeout(() => setFormState('idle'), 6000);
    } catch {
      setFormState('error');
      setFormError(t.contact.errorSend);
      turnstileRef.current?.reset();
    }
  };

  const navItems = [
    { key: 'home',    label: t.nav.home,    to: '/',        icon: House },
    { key: 'now',     label: t.nav.now,     to: '/now',     icon: Activity },
    { key: 'uses',    label: t.nav.uses,    to: '/uses',    icon: Wrench },
    { key: 'til',     label: t.nav.til,     to: '/til',     icon: Lightbulb },
    { key: 'contact', label: t.nav.contact, to: '/contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#fefaf3] dark:bg-[#111110] text-[#111110] dark:text-[#e8e6e1] font-sans antialiased">

      {/* ===== HEADER (Desktop & Mobile) like up2dul.dev ===== */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-40 pointer-events-none pt-4 px-4">
        <div className="max-w-2xl mx-auto">
          <div
            style={{ maxWidth: scrolled ? '512px' : '100%' }}
            className={`pointer-events-auto w-full flex items-center justify-between mx-auto
              transition-[max-width,padding,border-radius,background-color,box-shadow,border-color] duration-300 ease-in-out px-4 sm:px-5 py-2.5
              ${scrolled
                ? 'rounded-2xl backdrop-blur-xl shadow-xl border bg-white/90 border-[#e0ddd6] shadow-black/5 dark:bg-[#1c1c1a]/85 dark:border-white/10 dark:shadow-black/25'
                : 'rounded-2xl sm:rounded-none bg-white/90 sm:bg-transparent border border-[#e0ddd6] sm:border-transparent shadow-lg sm:shadow-none backdrop-blur-xl sm:backdrop-blur-none'
              }`}
          >
            {/* Nav Links */}
            <nav key={lang} className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-0.5">
              {navItems.map((item) => {
                const active = page === item.key;
                return (
                  <a
                    key={item.key}
                    href={item.to}
                    onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                    className={`relative text-sm py-0.5 transition-colors group shrink-0
                      ${active
                        ? 'text-[#111110] dark:text-white font-medium'
                        : 'text-[#888683] dark:text-white/50 hover:text-[#111110] dark:hover:text-white'
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-[#c4623a] rounded-full transition-[width] duration-300 ease-out
                        ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Controls (Theme & Lang) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Lang Toggle */}
              <div className="hidden sm:flex items-center rounded-full border border-[#d1cfc5] dark:border-white/15 overflow-hidden font-mono text-xs">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 transition-colors
                    ${lang === 'en'
                      ? 'bg-[#111110]/8 dark:bg-white/20 text-[#111110] dark:text-white'
                      : 'text-[#888683] dark:text-white/40 hover:text-[#111110] dark:hover:text-white/70'
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('id')}
                  className={`px-2.5 py-1 transition-colors
                    ${lang === 'id'
                      ? 'bg-[#111110]/8 dark:bg-white/20 text-[#111110] dark:text-white'
                      : 'text-[#888683] dark:text-white/40 hover:text-[#111110] dark:hover:text-white/70'
                    }`}
                >
                  ID
                </button>
              </div>

              {/* Theme & Settings Capsule matching up2dul style */}
              <div className="flex items-center rounded-xl border border-[#d1cfc5] dark:border-white/15 bg-white/50 dark:bg-white/5 p-1 gap-1">
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  aria-label="Toggle theme"
                  className="p-1.5 rounded-lg text-[#888683] dark:text-white/70 hover:text-[#111110] dark:hover:text-white transition-colors"
                >
                  {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                </button>
                <button
                  onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
                  aria-label="Toggle language"
                  className="sm:hidden px-2 py-0.5 font-mono text-xs font-medium rounded-lg text-[#888683] dark:text-white/70 hover:text-[#111110] dark:hover:text-white transition-colors"
                >
                  {lang.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer untuk konten agar tidak ketutup fixed navbar */}
      <div className="h-16" />

      {/* ===== MOBILE BOTTOM DOCK ===== */}
      <div className={`fixed inset-x-0 bottom-0 z-50 px-4 pb-4 lg:hidden transition-[transform,opacity] duration-300 ease-out ${dockHidden ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-[#e0ddd6] dark:border-white/10 bg-white/90 dark:bg-[#1c1c1a]/90 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/40 px-3 py-2">
          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <a
                  key={item.key}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                  aria-label={item.label}
                  className={active
                    ? 'flex h-9 w-9 items-center justify-center rounded-full bg-[#111110]/8 dark:bg-white/15 text-[#111110] dark:text-white transition-colors'
                    : 'flex h-9 w-9 items-center justify-center rounded-full text-[#888683] dark:text-white/50 hover:text-[#111110] dark:hover:text-white transition-colors'}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 relative" ref={dockRef}>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0ddd6] dark:border-white/15 text-[#888683] dark:text-white/60 hover:text-[#111110] dark:hover:text-white transition-colors"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setDockSettingsOpen(!dockSettingsOpen)}
              aria-label="Settings"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c4623a] text-white shadow-sm transition-colors hover:bg-[#a8522e]"
            >
              <SlidersHorizontal size={16} />
            </button>

            {dockSettingsOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-44 rounded-xl border border-[#e0ddd6] dark:border-white/10 bg-white/95 dark:bg-[#1c1c1a]/95 backdrop-blur-xl shadow-xl py-1.5 font-mono text-xs z-50">
                <p className="px-3 py-1 text-[10px] uppercase tracking-widest text-[#6b6b66] dark:text-[#555451]">{t.settings.language}</p>
                {['en', 'id'].map((code) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setDockSettingsOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 transition-colors ${lang === code ? 'text-[#c4623a]' : 'text-[#2a2a27] dark:text-[#999691] hover:bg-[#f5f4f1] dark:hover:bg-white/5'}`}
                  >
                    {code === 'en' ? 'English' : 'Indonesia'}
                    {lang === code && <Check size={13} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== 404 PAGE ===== */}
      {page === '404' && (
        <main className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="font-mono text-8xl font-bold text-[#111110] dark:text-[#e8e6e1] mb-6">404</h1>
          <p className="text-sm text-[#3a3a36] dark:text-[#999691] mb-8 max-w-md">
            {t.notFound.message}
          </p>
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-medium px-6 py-2.5 rounded-xl border border-[#e0ddd6] dark:border-[#2a2a27] hover:border-[#c4623a] transition-colors"
          >
            {t.notFound.button}
          </button>
          <div className="mt-16 w-full">
            <Footer t={t} tracks={tracks} navigate={navigate} />
          </div>
        </main>
      )}

      {/* ===== HOME PAGE ===== */}
      {page === 'home' && (
        <main className="max-w-2xl mx-auto px-6">

          {/* HERO */}
          <section className="pt-16 pb-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-2xl font-medium tracking-tight mb-4">
                  <span className="text-[#c4623a]">Ivan</span> Akbar Alfahrezi
                </h1>
                <p className="text-[#2a2a27] dark:text-[#999691] leading-relaxed max-w-lg">
                  {t.hero.tagline}
                </p>
                <p className="mt-4 text-sm text-[#888683] dark:text-[#666461]">
                  <span className="text-[#c4623a] mr-1.5">●</span>
                  {t.hero.availability}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <a href="https://github.com/Ivannnaff" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#2a2a27] dark:text-[#999691] hover:text-[#c4623a] dark:hover:text-[#e8e6e1] transition-colors">
                    GitHub <ArrowUpRight size={13} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#2a2a27] dark:text-[#999691] hover:text-[#c4623a] dark:hover:text-[#e8e6e1] transition-colors">
                    LinkedIn <ArrowUpRight size={13} />
                  </a>
                  <a href="mailto:ivanalfa647@gmail.com"
                    className="inline-flex items-center gap-1 text-[#2a2a27] dark:text-[#999691] hover:text-[#c4623a] dark:hover:text-[#e8e6e1] transition-colors">
                    Email <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              <div className="w-full min-w-0">
                <CodeCard />
              </div>
            </div>
          </section>

          <hr className="border-[#eeecea] dark:border-[#2a2a27]" />

          {/* PROJECTS */}
          <section id="projects" className="py-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#4a4a46] dark:text-[#555451] mb-8">
              {t.projects.title}
            </h2>
            <div className="space-y-4">
              {t.projects.items.map((project, idx) => (
                <div key={idx}
                  className="group rounded-xl border border-[#eeecea] dark:border-[#2a2a27] p-6 hover:border-[#c4623a]/40 dark:hover:border-[#c4623a]/40 hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  {/* Title + category */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-semibold text-[#111110] dark:text-[#e8e6e1]">
                      {project.title}
                    </h3>
                    <span className="shrink-0 font-mono text-[10px] text-[#4a4a46] dark:text-[#555451] border border-[#eeecea] dark:border-[#2a2a27] rounded-full px-2.5 py-0.5">
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#2a2a27] dark:text-[#999691] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono text-[11px] text-[#3a3a36] dark:text-[#888683] border border-[#eeecea] dark:border-[#2a2a27] rounded-full px-2.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a href={project.repoUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#c4623a] hover:text-[#a8522e] transition-colors font-medium">
                    {t.projects.source} <ArrowUpRight size={13} />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-[#eeecea] dark:border-[#2a2a27]" />

          {/* EXPERIENCE */}
          <section id="experience" className="py-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#4a4a46] dark:text-[#555451] mb-8">
              {t.experience.title}
            </h2>
            <div className="space-y-6">
              {t.experience.items.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-6 items-start">
                  <span className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] pt-0.5 leading-relaxed">
                    {exp.period}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#111110] dark:text-[#e8e6e1]">{exp.role}</p>
                    <p className="text-sm text-[#888683] dark:text-[#666461] mt-0.5">{exp.company}</p>
                    <p className="text-sm text-[#3a3a36] dark:text-[#888683] leading-relaxed mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Footer t={t} tracks={tracks} navigate={navigate} />
        </main>
      )}

      {/* ===== NOW PAGE ===== */}
      {page === 'now' && (
        <main className="max-w-2xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h1 className="text-2xl font-medium tracking-tight mb-3">{t.now.title}</h1>
            <p className="text-[#2a2a27] dark:text-[#999691] leading-relaxed">{t.now.intro}</p>
            <p className="mt-3 text-xs font-mono text-[#6b6b66] dark:text-[#555451]">
              <span className="text-[#c4623a] mr-1.5">●</span>
              {t.now.updatedLabel} {t.now.updated}
            </p>
          </div>

          <div className="divide-y divide-[#eeecea] dark:divide-[#2a2a27]">
            {t.now.sections.map((section, idx) => (
              <section key={idx} className="py-8 grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-6 items-start">
                <p className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] pt-1">{section.label}</p>
                <div>
                  <h2 className="font-medium text-[#111110] dark:text-[#e8e6e1] mb-2">{section.heading}</h2>
                  {section.body && (
                    <p className="text-sm text-[#3a3a36] dark:text-[#888683] leading-relaxed">{section.body}</p>
                  )}
                  {section.links && (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {section.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-[#2a2a27] dark:text-[#999691] hover:text-[#111110] dark:hover:text-[#e8e6e1] transition-colors underline underline-offset-4 decoration-[#eeecea] dark:decoration-[#2a2a27]">
                          {link.label} <ArrowUpRight size={12} />
                        </a>
                      ))}
                    </div>
                  )}
                  {section.items && (
                    <ul className="mt-3 space-y-3">
                      {section.items.map((item, iIdx) => (
                        <li key={iIdx}>
                          <span className="text-sm font-medium text-[#111110] dark:text-[#e8e6e1]">{item.name}</span>
                          {item.since && (
                            <span className="ml-2 font-mono text-xs text-[#6b6b66] dark:text-[#555451]">· since {item.since}</span>
                          )}
                          {item.note && (
                            <p className="mt-0.5 text-sm text-[#3a3a36] dark:text-[#888683] leading-relaxed">{item.note}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.list && (
                    <ul className="mt-3 space-y-1.5">
                      {section.list.map((li, liIdx) => (
                        <li key={liIdx} className="text-sm text-[#3a3a36] dark:text-[#888683]">{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {/* Listening */}
            <section className="py-8 grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-6 items-start">
              <p className="font-mono text-xs text-[#6b6b66] dark:text-[#555451] pt-1">{t.now.listening.label}</p>
              <div>
                <h2 className="font-medium text-[#111110] dark:text-[#e8e6e1] mb-3">{t.now.listening.heading}</h2>
                {tracks.length > 0 ? (
                  <ul className="space-y-3">
                    {tracks.map((tr, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-3">
                        {tr.image && (
                          <img src={tr.image} alt="" width={36} height={36} loading="lazy"
                            className="h-9 w-9 shrink-0 rounded border border-[#eeecea] dark:border-[#2a2a27] object-cover" />
                        )}
                        <span className="flex flex-col">
                          <a href={tr.url} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-[#111110] dark:text-[#e8e6e1] hover:text-[#c4623a] transition-colors">
                            {tr.name}
                            {tr.nowPlaying && <span className="text-[#c4623a]">●</span>}
                          </a>
                          <span className="text-xs text-[#888683] dark:text-[#666461]">{tr.artist}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#3a3a36] dark:text-[#888683]">{t.now.listening.empty}</p>
                )}
              </div>
            </section>
          </div>

          <p className="mt-8 text-xs font-mono text-[#6b6b66] dark:text-[#555451]">{t.now.footer}</p>
          <Footer t={t} tracks={tracks} navigate={navigate} />
        </main>
      )}

      {/* ===== USES PAGE ===== */}
      {page === 'uses' && <UsesPage t={t} tracks={tracks} navigate={navigate} />}

      {/* ===== TIL PAGE ===== */}
      {page === 'til' && <TilPage t={t} tracks={tracks} navigate={navigate} />}

      {/* ===== RESUME PAGE ===== */}
      {page === 'resume' && <ResumePage t={t} navigate={navigate} />}

      {/* ===== CONTACT PAGE (up2dul style + form) ===== */}
      {page === 'contact' && (
        <main className="max-w-2xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h1 className="text-2xl font-medium tracking-tight mb-3">{t.contact.title}</h1>
            <p className="text-[#2a2a27] dark:text-[#999691] leading-relaxed">{t.contact.subtitle}</p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              { label: "Email", href: 'mailto:ivanalfa647@gmail.com', display: 'ivanalfa647@gmail.com' },
              { label: "GitHub", href: 'https://github.com/Ivannnaff', display: 'github.com/Ivannnaff', external: true },
              { label: "LinkedIn", href: 'https://linkedin.com/in/IvanAkbarAlfahrezi', display: 'linkedin.com/in/IvanAkbarAlfahrezi', external: true },
              { label: "Instagram", href: 'https://instagram.com/ivannnaff', display: 'instagram.com/ivannnaff', external: true },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-[#eeecea] dark:border-[#2a2a27]">
                <span className="text-sm text-[#2a2a27] dark:text-[#999691]">{item.label}</span>
                <a href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="inline-flex items-center gap-1 text-sm text-[#111110] dark:text-[#e8e6e1] hover:text-[#c4623a] transition-colors font-medium">
                  {item.display} <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>

          <div className="border border-[#e0ddd6] dark:border-[#2a2a27] rounded-xl p-6 bg-white/50 dark:bg-white/[0.02]">
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <CheckCircle2 size={32} className="text-[#c4623a] mb-3" />
                <p className="text-sm font-medium mb-1">{t.contact.sendButton}</p>
                <p className="text-sm text-[#3a3a36] dark:text-[#888683]">{t.contact.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                {[
                  { label: t.contact.formName, type: 'text', name: 'name', placeholder: t.contact.formNamePlaceholder },
                  { label: t.contact.formEmail, type: 'email', name: 'email', placeholder: t.contact.formEmailPlaceholder },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#4a4a46] dark:text-[#555451] mb-2">
                      {field.label}
                    </label>
                    <input type={field.type} name={field.name} required placeholder={field.placeholder}
                      className="w-full bg-transparent border border-[#e0ddd6] dark:border-[#2a2a27] rounded-lg px-3.5 py-2.5 text-sm text-[#111110] dark:text-[#e8e6e1] placeholder-[#a09e96] dark:placeholder-[#666461] focus:outline-none focus:border-[#c4623a] dark:focus:border-[#c4623a] transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#4a4a46] dark:text-[#555451] mb-2">
                    {t.contact.formMessage}
                  </label>
                  <textarea rows={4} name="message" required placeholder={t.contact.formMessagePlaceholder}
                    className="w-full bg-transparent border border-[#e0ddd6] dark:border-[#2a2a27] rounded-lg px-3.5 py-2.5 text-sm text-[#111110] dark:text-[#e8e6e1] placeholder-[#a09e96] dark:placeholder-[#666461] focus:outline-none focus:border-[#c4623a] dark:focus:border-[#c4623a] transition-colors resize-none" />
                </div>

                <Turnstile ref={turnstileRef} onTokenChange={setTurnstileToken} />

                {formState === 'error' && formError && (
                  <p className="text-sm text-[#c4623a]">{formError}</p>
                )}

                <button type="submit" disabled={formState === 'sending'}
                  className="w-full bg-[#c4623a] hover:bg-[#a8522e] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors">
                  {formState === 'sending' ? t.contact.sending : t.contact.sendButton}
                </button>
              </form>
            )}
          </div>

          <Footer t={t} tracks={tracks} navigate={navigate} />
        </main>
      )}

    </div>
  );
}
