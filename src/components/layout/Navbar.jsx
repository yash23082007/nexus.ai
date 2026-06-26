import React, { useState, useEffect, useRef } from 'react';
import IconCube from '../../assets/svgs/IconCube';
import IconXMark from '../../assets/svgs/IconXMark';

/* Inline spinner — hidden by default, shown via direct DOM ref */
const Spinner = React.forwardRef(({ className = '' }, ref) => (
  <svg
    ref={ref}
    style={{ display: 'none' }}
    className={`animate-spin ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
));
Spinner.displayName = 'Spinner';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // === DOM refs for button loading states — zero re-renders ===
  const loginTextRef        = useRef(null);
  const loginSpinnerRef     = useRef(null);
  const startFreeTextRef    = useRef(null);
  const startFreeSpinnerRef = useRef(null);

  const mLoginTextRef        = useRef(null);
  const mLoginSpinnerRef     = useRef(null);
  const mStartFreeTextRef    = useRef(null);
  const mStartFreeSpinnerRef = useRef(null);

  const loginBusy     = useRef(false);
  const startFreeBusy = useRef(false);

  const showSpinner = (spinnerRef, textRef, loadText) => {
    if (spinnerRef.current) spinnerRef.current.style.display = 'inline-block';
    if (textRef.current) textRef.current.textContent = loadText;
  };

  const hideSpinner = (spinnerRef, textRef, idleText) => {
    if (spinnerRef.current) spinnerRef.current.style.display = 'none';
    if (textRef.current) textRef.current.textContent = idleText;
  };

  const scrollToPricing = () => {
    setIsMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (loginBusy.current) return;
    loginBusy.current = true;
    showSpinner(loginSpinnerRef, loginTextRef, 'Entering…');
    showSpinner(mLoginSpinnerRef, mLoginTextRef, 'Entering…');
    setTimeout(() => {
      loginBusy.current = false;
      hideSpinner(loginSpinnerRef, loginTextRef, 'Login');
      hideSpinner(mLoginSpinnerRef, mLoginTextRef, 'Login');
      scrollToPricing();
    }, 900);
  };

  const handleStartFreeClick = (e) => {
    e.preventDefault();
    if (startFreeBusy.current) return;
    startFreeBusy.current = true;
    showSpinner(startFreeSpinnerRef, startFreeTextRef, 'Loading…');
    showSpinner(mStartFreeSpinnerRef, mStartFreeTextRef, 'Loading…');
    setTimeout(() => {
      startFreeBusy.current = false;
      hideSpinner(startFreeSpinnerRef, startFreeTextRef, 'Start Free');
      hideSpinner(mStartFreeSpinnerRef, mStartFreeTextRef, 'Start Free');
      scrollToPricing();
    }, 900);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const menu = document.getElementById('mobile-menu-overlay');
    if (isMenuOpen && menu) {
      menu.animate(
        [{ opacity: 0, transform: 'translateY(-20px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 300, easing: 'ease-out', fill: 'forwards' }
      );
    }
  }, [isMenuOpen]);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-oceanic/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-oceanic/70 backdrop-blur-sm py-6'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
      >
        {/* Logo */}
        <a href="/" aria-label="Nexus AI home" className="flex items-center gap-2 group">
          <IconCube className="w-8 h-8 text-forsythia group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-mono text-xl font-bold tracking-tight text-white uppercase">
            NEXUS<span className="text-forsythia">.AI</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul role="list" className="hidden md:flex items-center gap-8 text-sm font-sans font-medium">
          {['features', 'metrics', 'pricing', 'testimonials'].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-slate-200 hover:text-forsythia transition-colors duration-200 capitalize"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Login */}
          <a
            href="#pricing"
            id="nav-login-btn"
            onClick={handleLoginClick}
            className="text-sm font-semibold text-white hover:text-forsythia transition-colors duration-200 flex items-center gap-1.5"
            aria-label="Login to Nexus AI"
          >
            <Spinner ref={loginSpinnerRef} className="h-3.5 w-3.5 text-forsythia" />
            <span ref={loginTextRef}>Login</span>
          </a>

          {/* Start Free */}
          <a
            href="#pricing"
            id="nav-start-free-btn"
            role="button"
            onClick={handleStartFreeClick}
            className="btn bg-saffron-gradient text-oceanic text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(255,200,1,0.4)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            aria-label="Start Free with Nexus AI"
          >
            <Spinner ref={startFreeSpinnerRef} className="h-3.5 w-3.5 text-oceanic" />
            <span ref={startFreeTextRef}>Start Free</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="md:hidden p-2 text-white hover:text-forsythia focus:outline-none transition-colors duration-200"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu-overlay"
        >
          {isMenuOpen ? (
            <IconXMark className="w-6 h-6" />
          ) : (
            <div className="space-y-1.5 w-6" aria-hidden="true">
              <span className="block h-0.5 bg-current rounded" />
              <span className="block h-0.5 bg-current rounded" />
              <span className="block h-0.5 bg-current rounded" />
            </div>
          )}
        </button>
      </nav>

      {/* ===== Mobile Menu ===== */}
      {isMenuOpen && (
        <div
          id="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-oceanic/98 backdrop-blur-xl z-40 flex flex-col justify-between p-8"
        >
          <nav className="flex flex-col gap-6 text-2xl font-mono font-bold" aria-label="Mobile navigation links">
            {['features', 'metrics', 'pricing', 'testimonials'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-forsythia transition-colors duration-200 capitalize"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-auto">
            {/* Mobile Login */}
            <a
              href="#pricing"
              id="mobile-login-btn"
              onClick={handleLoginClick}
              className="btn w-full py-3.5 bg-white/10 border border-white/20 text-white rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2"
              aria-label="Login to Nexus AI"
            >
              <Spinner ref={mLoginSpinnerRef} className="h-4 w-4 text-forsythia" />
              <span ref={mLoginTextRef}>Login</span>
            </a>

            {/* Mobile Start Free */}
            <a
              href="#pricing"
              id="mobile-start-free-btn"
              onClick={handleStartFreeClick}
              className="btn w-full py-3.5 bg-saffron-gradient text-oceanic rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2"
              aria-label="Start Free with Nexus AI"
            >
              <Spinner ref={mStartFreeSpinnerRef} className="h-4 w-4 text-oceanic" />
              <span ref={mStartFreeTextRef}>Start Free</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
