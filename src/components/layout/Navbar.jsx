import React, { useState, useEffect } from 'react';
import IconCube from '../../assets/svgs/IconCube';
import IconXMark from '../../assets/svgs/IconXMark';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isStartFreeLoading, setIsStartFreeLoading] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (isLoginLoading) return;
    setIsLoginLoading(true);
    setTimeout(() => {
      setIsLoginLoading(false);
      setIsMenuOpen(false);
      const target = document.getElementById('pricing');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  const handleStartFreeClick = (e) => {
    e.preventDefault();
    if (isStartFreeLoading) return;
    setIsStartFreeLoading(true);
    setTimeout(() => {
      setIsStartFreeLoading(false);
      setIsMenuOpen(false);
      const target = document.getElementById('pricing');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  // Monitor scroll height to add darker background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WAAPI animation trigger for mobile menu mounting
  useEffect(() => {
    const menu = document.getElementById('mobile-menu-overlay');
    if (isMenuOpen && menu) {
      menu.animate([
        { opacity: 0, transform: 'translateY(-20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards'
      });
    }
  }, [isMenuOpen]);

  return (
    <header 
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-oceanic/90 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav 
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
      >
        {/* Nav Logo */}
        <a href="/" aria-label="Nexus AI home" className="flex items-center gap-2 group">
          <IconCube className="w-8 h-8 text-forsythia group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-mono text-xl font-bold tracking-tight text-white uppercase">
            NEXUS<span className="text-forsythia">.AI</span>
          </span>
        </a>

        {/* Desktop Navigation links */}
        <ul 
          role="list"
          className="hidden md:flex items-center gap-8 text-sm font-sans font-medium"
        >
          <li>
            <a href="#features" className="text-slate-300 hover:text-forsythia transition-colors duration-200">Features</a>
          </li>
          <li>
            <a href="#metrics" className="text-slate-300 hover:text-forsythia transition-colors duration-200">Metrics</a>
          </li>
          <li>
            <a href="#pricing" className="text-slate-300 hover:text-forsythia transition-colors duration-200">Pricing</a>
          </li>
          <li>
            <a href="#testimonials" className="text-slate-300 hover:text-forsythia transition-colors duration-200">Testimonials</a>
          </li>
        </ul>
 
        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#pricing" 
            onClick={handleLoginClick}
            className="text-sm font-semibold text-slate-300 hover:text-forsythia transition-colors duration-200 flex items-center gap-1.5 min-w-[55px]"
          >
            {isLoginLoading && (
              <svg className="animate-spin h-3.5 w-3.5 text-forsythia" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            <span>{isLoginLoading ? 'Entering...' : 'Login'}</span>
          </a>
          <a 
            href="#pricing" 
            role="button"
            onClick={handleStartFreeClick}
            className="btn bg-saffron-gradient text-oceanic text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(255,200,1,0.3)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 min-w-[110px]"
          >
            {isStartFreeLoading && (
              <svg className="animate-spin h-3.5 w-3.5 text-oceanic" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            <span>{isStartFreeLoading ? 'Loading...' : 'Start Free'}</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <IconXMark className="w-6 h-6" />
          ) : (
            <div className="space-y-1.5 w-6">
              <span className="block h-0.5 bg-current rounded transition-all duration-300" />
              <span className="block h-0.5 bg-current rounded transition-all duration-300" />
              <span className="block h-0.5 bg-current rounded transition-all duration-300" />
            </div>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          id="mobile-menu-overlay"
          className="md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-oceanic/95 backdrop-blur-xl z-40 flex flex-col justify-between p-8"
        >
          <nav className="flex flex-col gap-6 text-2xl font-mono font-bold">
            <a 
              href="#features" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-forsythia transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#metrics" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-forsythia transition-colors duration-200"
            >
              Metrics
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-forsythia transition-colors duration-200"
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-200 hover:text-forsythia transition-colors duration-200"
            >
              Testimonials
            </a>
          </nav>
          
          <div className="flex flex-col gap-4 mt-auto">
            <a 
              href="#pricing" 
              onClick={handleLoginClick}
              className="btn w-full py-3 bg-white/5 border border-white/5 text-slate-300 rounded-xl text-center font-bold flex items-center justify-center gap-2"
            >
              {isLoginLoading && (
                <svg className="animate-spin h-4 w-4 text-forsythia" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              <span>{isLoginLoading ? 'Entering...' : 'Login'}</span>
            </a>
            <a 
              href="#pricing" 
              onClick={handleStartFreeClick}
              className="btn w-full py-3 bg-saffron-gradient text-oceanic rounded-xl text-center font-bold flex items-center justify-center gap-2"
            >
              {isStartFreeLoading && (
                <svg className="animate-spin h-4 w-4 text-oceanic" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              <span>{isStartFreeLoading ? 'Loading...' : 'Start Free'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
