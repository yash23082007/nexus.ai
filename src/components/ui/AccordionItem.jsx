// src/components/ui/AccordionItem.jsx
import React, { useRef, useEffect } from 'react';
import * as Icons from '../../assets/svgs';
import IconChevronDown from '../../assets/svgs/IconChevronDown';

export function AccordionItem({ feature, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    if (isOpen) {
      // Set explicit height for smooth transition (not max-height hack)
      content.style.height = `${inner.scrollHeight}px`;
      content.style.opacity = '1';
    } else {
      content.style.height = '0px';
      content.style.opacity = '0';
    }
  }, [isOpen]);

  const IconComponent = Icons[feature.icon] || (() => null);

  return (
    <article
      className="accordion-item border-b border-white/5 last:border-b-0"
      role="listitem"
    >
      <button
        className="accordion-item__trigger w-full flex items-center justify-between py-5 px-6 bg-transparent text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${feature.id}`}
        id={`accordion-header-${feature.id}`}
        aria-label={`${feature.title}: ${isOpen ? 'collapse' : 'expand'}`}
      >
        <div className="accordion-item__header-left flex items-center gap-3 text-lg font-bold font-mono text-white">
          <div className="p-2.5 rounded bg-white/5 border border-white/5 text-forsythia flex-shrink-0" aria-hidden="true">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-mono text-white">{feature.title}</h3>
            <p className="text-[10px] text-slate-500 font-sans uppercase font-bold tracking-widest leading-none mt-0.5">{feature.subtitle}</p>
          </div>
        </div>

        {/* Chevron rotates via CSS — no JS */}
        <IconChevronDown
          className={`accordion-chevron w-5 h-5 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-forsythia' : 'rotate-0'}`}
          aria-hidden="true"
        />
      </button>

      {/* Content — height transition via useEffect above */}
      <div
        ref={contentRef}
        id={`accordion-content-${feature.id}`}
        role="region"
        aria-labelledby={`accordion-header-${feature.id}`}
        className="accordion-item__content"
        style={{ 
          height: 0, 
          opacity: 0, 
          overflow: 'hidden',
          transition: 'height 350ms ease-in-out, opacity 300ms ease-in-out' 
        }}
      >
        <div ref={innerRef} className="accordion-item__inner px-6 pb-6 pt-1 text-slate-400 text-sm font-sans leading-relaxed flex flex-col gap-4">
          <p>{feature.description}</p>
          
          <div 
            aria-label={`${feature.metricLabel}: ${feature.metric}`}
            className="flex items-baseline gap-1.5 font-mono mt-2"
          >
            <span className="font-mono text-forsythia text-xl font-bold">{feature.metric}</span>
            <span className="text-[10px] text-slate-500 font-sans font-bold uppercase tracking-wider">{feature.metricLabel}</span>
          </div>

          {feature.id === 1 && (
            <a href="#pricing" className="inline-flex items-center gap-1.5 text-xs font-semibold text-forsythia hover:underline">
              Explore Integration Library &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default AccordionItem;
