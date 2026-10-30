import React from 'react';
import { siteData } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-12 pb-24 font-mono text-xs">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <div>
            <p className="text-fg font-medium">@{siteData.github.split('/').pop()}</p>
            <p className="text-muted mt-1">
              © {new Date().getFullYear()} {siteData.name}
            </p>
          </div>
          
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-surface/30 max-w-xs">
            <div className="w-10 h-10 rounded-lg bg-border flex-shrink-0 flex items-center justify-center text-muted text-xs">♫</div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase text-muted tracking-wider">Last played</p>
              <p className="text-xs font-medium text-fg truncate">Kontrasmu Bisu</p>
              <p className="text-[11px] text-muted truncate">Iwan Fals</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">This Site</p>
            <ul className="space-y-2">
              {siteData.links.thisSite.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted hover:text-fg transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">Resources</p>
            <ul className="space-y-2">
              {siteData.links.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-1 text-muted hover:text-fg transition-colors">
                    {link.label} {link.external && <span>↗</span>}
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
                  <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-1 text-muted hover:text-fg transition-colors">
                    {link.label} {link.external && <span>↗</span>}
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
