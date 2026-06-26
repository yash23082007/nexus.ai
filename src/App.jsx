import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import TrustBar from './components/sections/TrustBar';
import Features from './components/sections/Features';
import Metrics from './components/sections/Metrics';
import Pricing from './components/sections/Pricing';
import Testimonials from './components/sections/Testimonials';
import CTA from './components/sections/CTA';

export function App() {
  return (
    <div className="min-h-screen bg-arctic text-nocturnal flex flex-col font-sans select-none antialiased">
      {/* Skip to main content accessibility link */}
      <a 
        href="#main" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-forsythia focus:text-oceanic focus:px-4 focus:py-2 focus:rounded-md focus:font-bold focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      {/* Sticky header */}
      <Navbar />

      {/* Semantic main content wrapper */}
      <main id="main" className="flex-grow">
        
        {/* Hero Section */}
        <Hero />

        {/* Logo marquee trust bar */}
        <TrustBar />

        {/* Bento Grid Features / Mobile Accordion list */}
        <Features />

        {/* Stat metrics animated counters */}
        <Metrics />

        {/* Pricing models matrix with zero re-render DOM refs */}
        <Pricing />

        {/* Customer test quotes card grid */}
        <Testimonials />

        {/* Final lead gen CTA section */}
        <CTA />

      </main>

      {/* Corporate footer info */}
      <Footer />
    </div>
  );
}

export default App;
