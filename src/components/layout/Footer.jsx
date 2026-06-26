import React from 'react';
import IconCube from '../../assets/svgs/IconCube';

export function Footer() {
  return (
    <footer 
      role="contentinfo"
      className="bg-oceanic border-t border-white/5 pt-20 pb-10 text-slate-400 font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
        
        {/* Branding Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <a href="/" aria-label="Nexus AI home" className="flex items-center gap-2 group">
            <IconCube className="w-8 h-8 text-forsythia group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-mono text-xl font-bold tracking-tight text-white uppercase">
              NEXUS<span className="text-forsythia">.AI</span>
            </span>
          </a>
          <p className="text-sm leading-relaxed max-w-sm text-slate-400">
            Automating decisions and pipelines globally at sub-50ms latency. The next-generation AI orchestration ecosystem for enterprise workflows.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 hover:border-forsythia/30 hover:text-forsythia flex items-center justify-center transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" aria-label="Github" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 hover:border-forsythia/30 hover:text-forsythia flex items-center justify-center transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 hover:border-forsythia/30 hover:text-forsythia flex items-center justify-center transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Links Column 1: Product */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Product</h4>
          <nav aria-label="Footer Product links">
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#metrics" className="hover:text-white transition-colors">Uptime SLA</a></li>
            </ul>
          </nav>
        </div>

        {/* Links Column 2: Resources */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
          <nav aria-label="Footer Resources links">
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides & Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developer Forum</a></li>
            </ul>
          </nav>
        </div>

        {/* Links Column 3: Company */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Company</h4>
          <nav aria-label="Footer Company links">
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </nav>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        <span className="font-medium text-slate-500">
          &copy; 2026 NEXUS.AI Inc. All rights reserved.
        </span>
        <div className="flex gap-6 font-medium text-slate-500">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Trust & Safety</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
