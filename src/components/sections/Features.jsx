// src/components/sections/Features.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FEATURES_DATA } from '../../data/featuresData';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import BentoCard from '../ui/BentoCard';
import AccordionItem from '../ui/AccordionItem';

function BentoGrid({ features, onHover, onLeave, ...props }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Feature cards" {...props}>
      {features.map((feature) => (
        <BentoCard
          key={feature.id}
          feature={feature}
          onHover={() => onHover(feature.id)}
          onLeave={onLeave}
          className={
            feature.id === 0
              ? 'md:col-span-2'
              : feature.id === 1
                ? 'md:col-span-1'
                : feature.id === 2
                  ? 'md:col-span-1'
                  : 'md:col-span-2'
          }
        />
      ))}
    </div>
  );
}

function AccordionList({ features, openIndex, onToggle, ...props }) {
  return (
    <div className="accordion-list" role="list" aria-label="Feature list" {...props}>
      {features.map((feature) => (
        <AccordionItem
          key={feature.id}
          feature={feature}
          isOpen={openIndex === feature.id}
          onToggle={() => onToggle(feature.id)}
        />
      ))}
    </div>
  );
}

const Features = () => {
  // Mobile accordion: which panel is open
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  // Using useRef and direct DOM mutation keeps hover context out of React state.
  // React.memo prevents child updates while we preserve the last hovered panel.
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

        {/* Using a ref-backed hover lock keeps the desktop grid responsive without standard state churn. */}
        <BentoGrid
          features={FEATURES_DATA}
          onHover={handleBentoHover}
          onLeave={handleBentoLeave}
          aria-hidden={isMobile}
        />

        {/* The accordion stays mounted on desktop so the context-lock transfer can open the last hovered panel on mobile. */}
        <AccordionList
          features={FEATURES_DATA}
          openIndex={openAccordionIndex}
          onToggle={handleAccordionToggle}
          aria-hidden={!isMobile}
        />

      </div>
    </section>
  );
};

export default Features;
