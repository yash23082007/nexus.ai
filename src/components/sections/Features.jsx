// src/components/sections/Features.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FEATURES_DATA } from '../../data/featuresData';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import BentoCard from '../ui/BentoCard';
import AccordionItem from '../ui/AccordionItem';

const Features = () => {
  // Mobile accordion: which panel is open
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  // Desktop bento: which card is being hovered
  // useRef = no re-render on hover change (critical for performance)
  const hoveredBentoIndex = useRef(null);

  const isMobile = useBreakpoint();
  const prevIsMobile = useRef(isMobile);

  // THE CONTEXT LOCK — transfers hover state to accordion on breakpoint cross
  useEffect(() => {
    const crossedToMobile = !prevIsMobile.current && isMobile;

    if (crossedToMobile) {
      // Transfer the active bento index to the accordion
      const activeIndex = hoveredBentoIndex.current;
      if (activeIndex !== null) {
        setOpenAccordionIndex(activeIndex);
      }
    }

    prevIsMobile.current = isMobile;
  }, [isMobile]);

  const handleBentoHover = useCallback((index) => {
    hoveredBentoIndex.current = index;
  }, []);

  const handleBentoLeave = useCallback(() => {
    // Don't reset — keep last hovered for context lock transfer
  }, []);

  const handleAccordionToggle = useCallback((index) => {
    setOpenAccordionIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section 
      id="features" 
      aria-labelledby="features-heading"
      className="bg-oceanic/20 py-28 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <header className="text-center mb-20">
          <span className="inline-block text-xs font-bold font-mono text-forsythia uppercase tracking-widest bg-forsythia/10 border border-forsythia/20 rounded-full px-4 py-1.5 mb-4">
            Platform Features
          </span>
          <h2 id="features-heading" className="font-mono text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Everything you need to automate at scale
          </h2>
          <p className="text-slate-400 font-sans text-base max-w-xl mx-auto leading-relaxed">
            Four pillars. Infinite possibilities.
          </p>
        </header>

        {/* DESKTOP: Bento Grid */}
        {/* Hidden on mobile via CSS — keeps DOM for context lock */}
        <div
          className="bento-grid hidden md:grid"
          role="list"
          aria-label="Feature cards"
          aria-hidden={isMobile}
        >
          {FEATURES_DATA.map((feature) => (
            <BentoCard
              key={feature.id}
              feature={feature}
              onHover={() => handleBentoHover(feature.id)}
              onLeave={handleBentoLeave}
            />
          ))}
        </div>

        {/* MOBILE: Accordion */}
        {/* Hidden on desktop via CSS */}
        <div
          className="accordion-list flex flex-col gap-3 md:hidden bg-oceanic/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl"
          role="list"
          aria-label="Feature list"
          aria-hidden={!isMobile}
        >
          {FEATURES_DATA.map((feature) => (
            <AccordionItem
              key={feature.id}
              feature={feature}
              isOpen={openAccordionIndex === feature.id}
              onToggle={() => handleAccordionToggle(feature.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
