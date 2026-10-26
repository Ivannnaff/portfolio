import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border pb-32">
      <div className="max-w-2xl mx-auto px-6 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-sm text-fg">@ivannnaff</p>
            <p className="font-mono text-xs text-muted mt-1">
              © {new Date().getFullYear()} {siteData.name}
            </p>
          </div>
          
          {/* Spotify Widget Placeholder */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-border bg-surface/50 max-w-xs">
            <div className="w-12 h-12 rounded-xl bg-border flex-shrink-0 flex items-center justify-center font-mono text-xs text-muted">♪</div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase text-muted tracking-wider">Last played</p>
              <p className="text-xs font-medium text-fg truncate">Song Title</p>
              <p className="text-[11px] text-muted truncate">Artist Name</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 font-mono text-xs">
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">This Site</p>
            <ul className="space-y-2">
              {siteData.links.thisSite.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted hover:text-accent transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">Resources</p>
            <ul className="space-y-2">
              {siteData.links.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-1 text-muted hover:text-accent transition-colors">
                    {link.label} {link.external && <ArrowUpRight size={11} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">Connect</p>
            <ul className="space-y-2">
              {siteData.links.connect.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-1 text-muted hover:text-accent transition-colors">
                    {link.label} {link.external && <ArrowUpRight size={11} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
