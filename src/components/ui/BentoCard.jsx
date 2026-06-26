import React, { useRef } from 'react';
import * as Icons from '../../assets/svgs';

const BentoCard = React.memo(({ feature, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseEnter = () => {
    // Visual hover state via CSS class — no state change
    cardRef.current?.classList.add('bento-card--active');
    onHover(feature.id);
  };

  const handleMouseLeave = () => {
    cardRef.current?.classList.remove('bento-card--active');
    onLeave();
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    glowRef.current.style.setProperty('--mouse-x', `${x}px`);
    glowRef.current.style.setProperty('--mouse-y', `${y}px`);
    glowRef.current.style.opacity = '1';
  };

  // Dynamically resolve Icon component from bundle
  const IconComponent = Icons[feature.icon] || (() => null);

  return (
    <article
      ref={cardRef}
      role="listitem"
      aria-label={feature.title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`bento-card bento-card--${feature.size} relative group bg-oceanic/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-forsythia/20`}
    >
      {/* Radial Hover Glow overlay */}
      <div 
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-0"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 200, 1, 0.08) 0%, transparent 65%)'
        }}
      />

      <div className="relative p-8 h-full flex flex-col justify-between z-10">
        <div>
          {/* Icon frame with custom background */}
          <div className="bento-card__icon inline-flex items-center justify-center p-3.5 rounded-xl bg-white/5 border border-white/5 text-forsythia mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="bento-card__metric flex items-baseline gap-1.5 font-mono text-white text-3xl font-extrabold tracking-tight mb-4" aria-label={`${feature.metric} ${feature.metricLabel}`}>
            <span className="font-mono text-forsythia">{feature.metric}</span>
            <span className="text-xs text-slate-400 font-sans font-medium uppercase tracking-wider">{feature.metricLabel}</span>
          </div>

          <h3 className="text-xl font-bold font-mono text-white mb-2">{feature.title}</h3>
          <p className="bento-card__subtitle text-xs text-slate-400 font-sans uppercase font-bold tracking-widest mb-4">
            {feature.subtitle}
          </p>
          <p className="bento-card__description text-sm text-slate-400 font-sans leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Dynamic decorative elements inside Bento cards */}
        {feature.id === 1 && (
          <a href="#pricing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forsythia hover:underline mt-6">
            Explore Integration Library &rarr;
          </a>
        )}

        {feature.id === 3 && (
          <div className="flex items-end gap-1.5 h-10 mt-6">
            <div className="w-1.5 bg-white/5 rounded-full h-[40%] group-hover:bg-forsythia/20 transition-all duration-500" />
            <div className="w-1.5 bg-white/5 rounded-full h-[65%] group-hover:bg-forsythia/20 transition-all duration-500" />
            <div className="w-1.5 bg-forsythia rounded-full h-[85%] shadow-[0_0_10px_rgba(255,200,1,0.5)] transition-all duration-500" />
            <div className="w-1.5 bg-white/5 rounded-full h-[50%] group-hover:bg-forsythia/20 transition-all duration-500" />
            <div className="w-1.5 bg-white/5 rounded-full h-[95%] group-hover:bg-forsythia/20 transition-all duration-500" />
          </div>
        )}

        {feature.id === 0 && (
          <div className="relative w-full h-10 mt-6 flex items-center justify-center overflow-hidden">
            <div className="absolute w-20 h-20 border border-dashed border-forsythia/10 rounded-full animate-spin [animation-duration:15s]" />
            <div className="absolute w-12 h-12 border border-dashed border-saffron/20 rounded-full animate-spin [animation-duration:8s] [animation-direction:reverse]" />
            <div className="absolute w-2 h-2 bg-forsythia rounded-full shadow-[0_0_12px_rgba(255,200,1,0.8)] animate-pulse" />
          </div>
        )}
      </div>
    </article>
  );
});

BentoCard.displayName = 'BentoCard';
export default BentoCard;
