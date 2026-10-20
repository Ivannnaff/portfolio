import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Sparkles, 
  Maximize2, 
  Moon, 
  Sun, 
  Settings, 
  Code, 
  Mail, 
  ArrowUpRight,
  CheckCircle2, 
  Check,
  User,
  House,
  Activity,
  Link
} from 'lucide-react';
import { translations } from './translations';

function SettingsMenu({ position, t, lang, setLang, animation, setAnimation, layoutWidth, setLayoutWidth }) {
  const posClass = position === 'up'
    ? 'bottom-full mb-2 origin-bottom-right'
    : 'top-full mt-2 origin-top-right';

  return (
    <div className={`absolute right-0 ${posClass} w-60 bg-[#e8e2d5] dark:bg-[#1e1e1d] border border-[#d1cfc5] dark:border-[#333330] rounded-2xl shadow-xl py-2 z-50 text-xs font-sans`}>
      {/* Language Section */}
      <div className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5]">
        {t.settings.language}
      </div>
      <button
        onClick={() => setLang('en')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Globe size={13} /> English</span>
        {lang === 'en' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>
      <button
        onClick={() => setLang('id')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Globe size={13} /> Indonesia</span>
        {lang === 'id' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>

      <div className="my-1.5 border-t border-[#d1cfc5] dark:border-[#333330]" />

      {/* Animation Section */}
      <div className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5]">
        {t.settings.animation}
      </div>
      <button
        onClick={() => setAnimation('system')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Sparkles size={13} /> {t.settings.animSystem}</span>
        {animation === 'system' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>
      <button
        onClick={() => setAnimation('on')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Sparkles size={13} /> {t.settings.animOn}</span>
        {animation === 'on' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>
      <button
        onClick={() => setAnimation('off')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Sparkles size={13} /> {t.settings.animOff}</span>
        {animation === 'off' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>

      <div className="my-1.5 border-t border-[#d1cfc5] dark:border-[#333330]" />

      {/* Layout Width Section */}
      <div className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5]">
        {t.settings.layout}
      </div>
      <button
        onClick={() => setLayoutWidth('default')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Maximize2 size={13} /> {t.settings.layoutDefault}</span>
        {layoutWidth === 'default' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>
      <button
        onClick={() => setLayoutWidth('wide')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Maximize2 size={13} /> {t.settings.layoutWide}</span>
        {layoutWidth === 'wide' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>
      <button
        onClick={() => setLayoutWidth('wider')}
        className="w-full px-4 py-1.5 text-left flex items-center justify-between hover:bg-[#ddd4c2] dark:hover:bg-[#333330] transition-colors"
      >
        <span className="flex items-center gap-2"><Maximize2 size={13} /> {t.settings.layoutWider}</span>
        {layoutWidth === 'wider' && <Check size={14} className="text-[#141413] dark:text-[#faf9f5]" />}
      </button>
    </div>
  );
}

const getLoc = () => ({
  path: window.location.pathname || '/',
  hash: window.location.hash || ''
});

const LASTFM_USER = "ivannaff_";
const LASTFM_API_KEY = "2d80059669d53a16fda4ee530bf363c2";
const lastfmConfigured = !LASTFM_USER.startsWith("YOUR_") && !LASTFM_API_KEY.startsWith("YOUR_");

const TURNSTILE_SITE_KEY = "YOUR_TURNSTILE_SITE_KEY";
const turnstileConfigured = !TURNSTILE_SITE_KEY.startsWith("YOUR_");

export default function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [animation, setAnimation] = useState('system');
  const [layoutWidth, setLayoutWidth] = useState('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loc, setLoc] = useState(getLoc);

  const turnstileRef = useRef(null);

  const dropdownRef = useRef(null);
  const dockRef = useRef(null);
  const t = translations[lang];

  const page = loc.path === '/now' ? 'now' : loc.path === '/contact' ? 'contact' : 'home';

  useEffect(() => {
    const onPop = () => setLoc(getLoc());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      const inHeader = dropdownRef.current && dropdownRef.current.contains(event.target);
      const inDock = dockRef.current && dockRef.current.contains(event.target);
      if (!inHeader && !inDock) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y <= 64) {
          setNavHidden(false);
        } else if (y > lastY + 20) {
          setNavHidden(true);
        } else if (y < lastY - 8) {
          setNavHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!turnstileConfigured || page !== 'contact') return;
    let interval;
    const render = () => {
      if (window.turnstile && turnstileRef.current) {
        turnstileRef.current.innerHTML = "";
        window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "auto",
          callback: (token) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken("")
        });
      }
    };
    if (window.turnstile) {
      render();
    } else {
      interval = setInterval(() => {
        if (window.turnstile) {
          render();
          clearInterval(interval);
        }
      }, 300);
    }
    return () => clearInterval(interval);
  }, [page]);

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setLoc({ path: to, hash: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const animClass = animation === 'off' ? '' : 'transition-all duration-300';

  const widthClass = 
    layoutWidth === 'wider' ? 'max-w-4xl' : 
    layoutWidth === 'wide' ? 'max-w-3xl' : 'max-w-2xl';

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (turnstileConfigured && !turnstileToken) return;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const navItems = [
    { key: 'home', label: t.nav.home, to: '/', icon: House },
    { key: 'now', label: t.nav.now, to: '/now', icon: Activity },
    { key: 'contact', label: t.nav.contact, to: '/contact', icon: Mail },
  ];

  const activeKey = page;

  return (
    <div className={`min-h-screen bg-[#f1ece1] dark:bg-[#121211] text-[#141413] dark:text-[#faf9f5] ${animClass} relative font-serif`}>
      
      {/* TOP NAVIGATION (desktop only) */}
      <header className="hidden md:block sticky top-0 z-40 bg-[#f1ece1]/90 dark:bg-[#121211]/90 backdrop-blur-md border-b border-[#d1cfc5] dark:border-[#333330]">
        <div className={`mx-auto px-6 h-16 flex items-center justify-between ${widthClass} ${animClass}`}>
          
          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-8 font-serif text-sm">
            {navItems.map((item) => {
              const active = activeKey === item.key;
              return (
                <a
                  key={item.key}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                  className={`relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-[#d97757] after:transition-transform after:duration-300 ${active ? 'text-[#d97757] font-medium after:scale-x-100' : 'text-[#5e5d59] dark:text-[#b0aea5] hover:text-[#d97757] after:scale-x-0 hover:after:scale-x-100'}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg border border-[#d1cfc5] dark:border-[#333330] hover:border-[#141413] dark:hover:border-[#faf9f5] transition-colors bg-[#e8e2d5] dark:bg-[#1a1a19]"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Open Settings"
                className="p-2 rounded-lg border border-[#d1cfc5] dark:border-[#333330] hover:border-[#141413] dark:hover:border-[#faf9f5] transition-colors bg-[#e8e2d5] dark:bg-[#1a1a19] flex items-center gap-2"
              >
                <Settings size={16} />
              </button>

              {isDropdownOpen && (
                <SettingsMenu
                  position="down"
                  t={t}
                  lang={lang}
                  setLang={setLang}
                  animation={animation}
                  setAnimation={setAnimation}
                  layoutWidth={layoutWidth}
                  setLayoutWidth={setLayoutWidth}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM DOCK NAVIGATION */}
      <div className={`fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:hidden transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${navHidden ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="mx-auto flex max-w-md items-center justify-between rounded-[2rem] border border-[#d1cfc5] dark:border-[#333330] bg-[#f1ece1]/85 dark:bg-[#121211]/85 px-3 py-2 shadow-lg backdrop-blur-xl">
          {/* Nav Icons */}
          <div className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeKey === item.key;
              return (
                <a
                  key={item.key}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                  aria-label={item.label}
                  className={active
                    ? 'flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e2d5] dark:bg-[#1a1a19] text-[#d97757] transition-colors'
                    : 'flex h-10 w-10 items-center justify-center rounded-full text-[#5e5d59] dark:text-[#b0aea5] hover:bg-[#e8e2d5] dark:hover:bg-[#1a1a19] hover:text-[#d97757] transition-colors'}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Controls */}
          <div className="relative flex items-center gap-1" ref={dockRef}>
            {/* Language toggle EN/ID */}
            <div className="flex items-center rounded-full border border-[#d1cfc5] dark:border-[#333330] p-0.5" role="group" aria-label="Language">
              <button
                onClick={() => setLang('en')}
                aria-label="English"
                className={`flex h-6 min-w-8 items-center justify-center rounded-full px-1.5 text-[10px] font-medium transition-colors ${lang === 'en' ? 'bg-[#e8e2d5] dark:bg-[#333330] text-[#141413] dark:text-[#faf9f5]' : 'text-[#5e5d59] dark:text-[#b0aea5]'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('id')}
                aria-label="Bahasa Indonesia"
                className={`flex h-6 min-w-8 items-center justify-center rounded-full px-1.5 text-[10px] font-medium transition-colors ${lang === 'id' ? 'bg-[#e8e2d5] dark:bg-[#333330] text-[#141413] dark:text-[#faf9f5]' : 'text-[#5e5d59] dark:text-[#b0aea5]'}`}
              >
                ID
              </button>
            </div>

            <button 
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#141413] dark:text-[#faf9f5] hover:bg-[#e8e2d5] dark:hover:bg-[#1a1a19] transition-colors"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Open Settings"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#141413] dark:text-[#faf9f5] hover:bg-[#e8e2d5] dark:hover:bg-[#1a1a19] transition-colors"
            >
              <Settings size={18} />
            </button>

            {isDropdownOpen && (
              <SettingsMenu
                position="up"
                t={t}
                lang={lang}
                setLang={setLang}
                animation={animation}
                setAnimation={setAnimation}
                layoutWidth={layoutWidth}
                setLayoutWidth={setLayoutWidth}
              />
            )}
          </div>
        </div>
      </div>

      {/* ===== HOME PAGE ===== */}
      {page === 'home' && (
        <>
          <main className={`mx-auto px-6 pt-10 pb-6 ${widthClass} ${animClass}`}>
            {/* HERO SECTION — photo left, text right */}
            <section className="py-4 md:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

                {/* Profile Photo */}
                <div className="lg:col-span-3 flex justify-center lg:justify-start order-1 lg:order-1 mb-6 lg:mb-0 lg:mt-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-28 lg:h-28 rounded-full overflow-hidden border border-[#d1cfc5] dark:border-[#333330] group shadow-sm">
                    <div className="absolute inset-0 flex items-center justify-center bg-[#e8e2d5] dark:bg-[#262624]">
                      <User size={32} className="text-[#5e5d59] dark:text-[#b0aea5] opacity-60" />
                    </div>
                    <img 
                      src="/photo-1.jpg" 
                      alt="Ivan Akbar Alfahrezi"
                      className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                    />
                    <img 
                      src="/photo-2.jpg" 
                      alt="Ivan Akbar Alfahrezi"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </div>

                {/* Headline & Tagline */}
                <div className="lg:col-span-9 order-2 lg:order-2 text-center lg:text-left">
                  <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mb-2 leading-snug">
                    {t.hero.title}
                  </h1>

                  <p className="font-serif text-base sm:text-lg text-[#3d3d3a] dark:text-[#e0ded6] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-3">
                    {t.hero.tagline}
                  </p>

                  {/* Availability */}
                  <p className="font-mono text-xs text-[#5e5d59] dark:text-[#b0aea5] italic mb-5">
                    <span className="text-[#d97757] not-italic mr-1.5">●</span>
                    {t.hero.availability}
                  </p>

                  {/* Social links */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 font-sans text-xs">
                    <a
                      href="https://github.com/IvanAkbarAlfahrezi/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8e2d5] dark:bg-[#1a1a19] border border-[#d1cfc5] dark:border-[#333330] text-[#141413] dark:text-[#faf9f5] hover:border-[#141413] dark:hover:border-[#faf9f5] transition-colors font-medium"
                    >
                      <Code size={14} /> GitHub
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8e2d5] dark:bg-[#1a1a19] border border-[#d1cfc5] dark:border-[#333330] text-[#141413] dark:text-[#faf9f5] hover:border-[#141413] dark:hover:border-[#faf9f5] transition-colors font-medium"
                    >
                      <Link size={14} /> LinkedIn
                    </a>
                    <a
                      href="mailto:ivanalfa647@gmail.com"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8e2d5] dark:bg-[#1a1a19] border border-[#d1cfc5] dark:border-[#333330] text-[#141413] dark:text-[#faf9f5] hover:border-[#141413] dark:hover:border-[#faf9f5] transition-colors font-medium"
                    >
                      <Mail size={14} /> Email
                    </a>
                  </div>
                </div>

              </div>
            </section>
          </main>

          {/* PROJECTS SECTION */}
          <section id="projects" className="bg-[#e3dacc] dark:bg-[#000000] text-[#141413] dark:text-[#faf9f5] pt-12 pb-14 scroll-mt-24 transition-colors">
            <div className={`mx-auto px-6 ${widthClass}`}>
              <h2 className="font-serif text-2xl md:text-3xl font-normal tracking-tight mb-8">
                {t.projects.title}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {t.projects.items.map((project, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#f5f1e8] dark:bg-white/[0.03] border border-[#d1cfc5] dark:border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#141413] dark:hover:border-white/30 transition-colors group shadow-sm"
                  >
                    <div>
                      <span className="inline-block font-mono text-[10px] text-[#d97757] mb-3 uppercase tracking-[0.15em]">
                        {project.category}
                      </span>
                      <h3 className="font-sans text-lg font-semibold mb-3 text-[#141413] dark:text-[#faf9f5] group-hover:text-[#d97757] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-serif text-[#5e5d59] dark:text-[#b0aea5] text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="font-mono text-[10px] bg-[#e8e2d5] dark:bg-white/10 text-[#5e5d59] dark:text-[#b0aea5] px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-5 pt-4 border-t border-[#d1cfc5] dark:border-white/10 font-sans text-xs font-medium">
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#5e5d59] dark:text-[#b0aea5] hover:text-[#141413] dark:hover:text-[#faf9f5] transition-colors">
                          {t.projects.source} <Code size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <main className={`mx-auto px-6 pt-12 pb-28 md:pb-16 ${widthClass}`}>
            <section id="experience" className="py-12 scroll-mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-normal tracking-tight mb-3">
                {t.experience.title}
              </h2>
              <p className="text-[#5e5d59] dark:text-[#b0aea5] text-base font-serif mb-14">
                {t.experience.subtitle}
              </p>

              <div className="space-y-6">
                {t.experience.items.map((exp, idx) => (
                  <div 
                    key={idx}
                    className="p-7 rounded-2xl bg-[#e8e2d5] dark:bg-[#1a1a19] border border-[#d1cfc5] dark:border-[#333330] grid grid-cols-1 md:grid-cols-4 gap-5 items-start"
                  >
                    <div className="font-mono text-[10px] uppercase text-[#5e5d59] dark:text-[#b0aea5] tracking-wider md:pt-1">
                      {exp.period}
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="font-sans text-base font-semibold mb-1">
                        {exp.role} <span className="text-[#5e5d59] dark:text-[#b0aea5] font-normal">at {exp.company}</span>
                      </h3>
                      <p className="font-serif text-[#3d3d3a] dark:text-[#e0ded6] text-sm leading-relaxed mt-3">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </>
      )}

      {/* ===== NOW PAGE ===== */}
      {page === 'now' && (
        <main className={`mx-auto px-6 py-16 pb-28 md:pb-16 ${widthClass} ${animClass}`}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 shrink-0 bg-[#d1cfc5] dark:bg-[#333330]" aria-hidden="true" />
            <h1 className="font-mono text-xs font-medium uppercase tracking-[0.35em] text-[#5e5d59] dark:text-[#b0aea5]">
              {t.now.title}
            </h1>
          </div>

          <p className="max-w-2xl font-serif text-lg leading-relaxed text-[#3d3d3a] dark:text-[#e0ded6]">
            {t.now.intro}
          </p>

          <p className="mt-6 font-mono text-sm text-[#5e5d59] dark:text-[#b0aea5]">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d97757]" aria-hidden="true" />
            {t.now.updatedLabel} {t.now.updated}
          </p>

          <hr className="my-12 border-[#d1cfc5] dark:border-[#333330]" />

          <div className="divide-y divide-[#d1cfc5] dark:divide-[#333330]">
            {t.now.sections.map((section, idx) => (
              <section key={idx} className="grid gap-3 py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
                <p className="pt-1 font-mono text-sm text-[#5e5d59] dark:text-[#b0aea5]">
                  {section.label}
                </p>
                <div>
                  <h2 className="font-serif text-2xl font-normal tracking-tight">
                    {section.heading}
                  </h2>

                  {section.body && (
                    <p className="mt-3 max-w-2xl font-serif leading-relaxed text-[#5e5d59] dark:text-[#b0aea5]">
                      {section.body}
                    </p>
                  )}

                  {section.links && (
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {section.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-sans text-sm underline decoration-[#d97757]/50 underline-offset-4 hover:text-[#d97757] transition-colors"
                        >
                          {link.label} <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </div>
                  )}

                  {section.items && (
                    <ul className="mt-4 space-y-5">
                      {section.items.map((item, iIdx) => (
                        <li key={iIdx}>
                          <span className="font-sans font-medium text-[#141413] dark:text-[#faf9f5]">
                            {item.name}
                          </span>
                          {item.since && (
                            <span className="ml-2 font-mono text-sm text-[#5e5d59] dark:text-[#b0aea5]">
                              · since {item.since}
                            </span>
                          )}
                          {item.note && (
                            <p className="mt-1 max-w-2xl font-serif leading-relaxed text-[#5e5d59] dark:text-[#b0aea5]">
                              {item.note}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.list && (
                    <ul className="mt-4 space-y-2 font-serif text-[#5e5d59] dark:text-[#b0aea5]">
                      {section.list.map((li, liIdx) => (
                        <li key={liIdx}>{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {/* Listening — Last.fm */}
            <section className="grid gap-3 py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
              <p className="pt-1 font-mono text-sm text-[#5e5d59] dark:text-[#b0aea5]">
                {t.now.listening.label}
              </p>
              <div>
                <h2 className="font-serif text-2xl font-normal tracking-tight">
                  {t.now.listening.heading}
                </h2>
                {tracks.length > 0 ? (
                  <ul className="mt-4 space-y-5">
                    {tracks.map((tr, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-3">
                        {tr.image ? (
                          <img
                            src={tr.image}
                            alt=""
                            width={40}
                            height={40}
                            loading="lazy"
                            className="h-10 w-10 shrink-0 rounded-md border border-[#d1cfc5] dark:border-[#333330] object-cover"
                          />
                        ) : null}
                        <span className="flex flex-col">
                          <a
                            href={tr.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-sans font-medium text-[#141413] dark:text-[#faf9f5] hover:text-[#d97757] transition-colors"
                          >
                            {tr.name}
                            {tr.nowPlaying && (
                              <span className="text-[#d97757]" title="Now playing">●</span>
                            )}
                          </a>
                          <span className="font-serif text-sm text-[#5e5d59] dark:text-[#b0aea5]">
                            {tr.artist}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 max-w-2xl font-serif leading-relaxed text-[#5e5d59] dark:text-[#b0aea5]">
                    {t.now.listening.empty}
                  </p>
                )}
              </div>
            </section>
          </div>

          <p className="mt-12 font-serif text-sm text-[#5e5d59] dark:text-[#b0aea5]">
            {t.now.footer}
          </p>
        </main>
      )}

      {/* ===== CONTACT PAGE ===== */}
      {page === 'contact' && (
        <main className={`mx-auto px-6 py-16 pb-28 md:pb-16 ${widthClass} ${animClass}`}>
          <div className="max-w-xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight mb-5">
              {t.contact.title}
            </h1>
            <p className="font-serif text-base text-[#3d3d3a] dark:text-[#e0ded6] mb-10 leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="bg-[#e8e2d5] dark:bg-[#1a1a19] border border-[#d1cfc5] dark:border-[#333330] rounded-2xl p-8 text-left">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <CheckCircle2 size={40} className="text-[#d97757] mb-4" />
                  <h3 className="font-sans font-semibold text-base mb-2">Message Sent</h3>
                  <p className="font-serif text-[#5e5d59] dark:text-[#b0aea5] text-sm">{t.contact.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5] mb-2">{t.contact.formName}</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-[#f1ece1] dark:bg-[#121211] border border-[#d1cfc5] dark:border-[#333330] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#141413] dark:focus:border-[#faf9f5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5] mb-2">{t.contact.formEmail}</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full bg-[#f1ece1] dark:bg-[#121211] border border-[#d1cfc5] dark:border-[#333330] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#141413] dark:focus:border-[#faf9f5] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5] mb-2">{t.contact.formMessage}</label>
                    <textarea 
                      rows={4} 
                      required 
                      className="w-full bg-[#f1ece1] dark:bg-[#121211] border border-[#d1cfc5] dark:border-[#333330] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#141413] dark:focus:border-[#faf9f5] transition-colors resize-none"
                    ></textarea>
                  </div>
                  {turnstileConfigured && (
                    <div ref={turnstileRef} className="flex justify-center" />
                  )}
                  <button 
                    type="submit" 
                    disabled={turnstileConfigured && !turnstileToken}
                    className="w-full bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#121211] font-medium text-sm py-3 px-6 rounded-lg hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t.contact.sendButton}
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-[#e8e2d5] dark:bg-[#000000] text-[#141413] dark:text-[#faf9f5] mt-20 border-t border-[#d1cfc5] dark:border-white/10 py-12">
        <div className={`mx-auto px-6 ${widthClass}`}>
          {/* Top: handle + copyright (left) | last played (right) */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="font-mono text-sm text-[#141413] dark:text-[#faf9f5]">@ivannaff_</p>
              <p className="mt-1 font-mono text-xs text-[#5e5d59] dark:text-[#b0aea5]">
                © {new Date().getFullYear()} Ivan Akbar Alfahrezi
              </p>
            </div>

            {tracks.length > 0 && (
              <a
                href={tracks[0].url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col text-left sm:items-end sm:text-right"
              >
                <span className="text-xs text-[#5e5d59] dark:text-[#b0aea5]">
                  {tracks[0].nowPlaying ? t.footer.nowPlaying : t.footer.lastPlayed}
                </span>
                <span className="mt-2 flex items-center gap-3">
                  {tracks[0].image && (
                    <img
                      src={tracks[0].image}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      className="h-10 w-10 shrink-0 rounded-md border border-[#d1cfc5] dark:border-white/10 object-cover"
                    />
                  )}
                  <span className="flex flex-col sm:items-end">
                    <span className="inline-flex items-center gap-1 text-sm text-[#141413] dark:text-[#faf9f5] transition-colors group-hover:text-[#d97757]">
                      {tracks[0].name} <ArrowUpRight size={13} />
                    </span>
                    <span className="text-xs text-[#5e5d59] dark:text-[#b0aea5]">{tracks[0].artist}</span>
                  </span>
                </span>
              </a>
            )}
          </div>

          {/* Columns */}
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div>
              <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5]">
                {t.footer.site}
              </h2>
              <ul className="mt-4 space-y-3">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.to}
                      onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                      className="text-sm text-[#141413] dark:text-[#faf9f5] transition-colors hover:text-[#d97757]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5]">
                {t.footer.resources}
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://github.com/IvanAkbarAlfahrezi/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#141413] dark:text-[#faf9f5] transition-colors hover:text-[#d97757]"
                  >
                    {t.footer.source} <ArrowUpRight size={13} className="text-[#5e5d59] dark:text-[#b0aea5]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/IvanAkbarAlfahrezi/task-manager"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#141413] dark:text-[#faf9f5] transition-colors hover:text-[#d97757]"
                  >
                    Task Manager AI <ArrowUpRight size={13} className="text-[#5e5d59] dark:text-[#b0aea5]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/IvanAkbarAlfahrezi/nusantara-hub"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#141413] dark:text-[#faf9f5] transition-colors hover:text-[#d97757]"
                  >
                    Nusantara Hub <ArrowUpRight size={13} className="text-[#5e5d59] dark:text-[#b0aea5]" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-[#5e5d59] dark:text-[#b0aea5]">
                {t.footer.connect}
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://github.com/IvanAkbarAlfahrezi/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#141413] dark:text-[#faf9f5] transition-colors hover:text-[#d97757]"
                  >
                    GitHub <ArrowUpRight size={13} className="text-[#5e5d59] dark:text-[#b0aea5]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#141413] dark:text-[#faf9f5] transition-colors hover:text-[#d97757]"
                  >
                    LinkedIn <ArrowUpRight size={13} className="text-[#5e5d59] dark:text-[#b0aea5]" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ivanalfa647@gmail.com"
                    className="inline-flex items-center gap-1 text-sm text-[#141413] dark:text-[#faf9f5] transition-colors hover:text-[#d97757]"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
