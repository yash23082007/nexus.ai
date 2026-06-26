// src/components/ui/PricingCard.jsx
import React, { useEffect, useRef } from 'react';
import { computePrice, getCurrencySymbol } from '../../utils/priceUtils';

/**
 * PricingCard — wrapped in React.memo so it NEVER re-renders after mount.
 * All dynamic updates (price changes, CTA loading) go through direct DOM refs.
 */
const PricingCard = React.memo(({ tier, registerPriceRef, initialCurrency, initialBilling }) => {
  const symbolRef = useRef(null);
  const amountRef = useRef(null);

  // CTA button DOM refs — zero useState, zero re-renders
  const ctaTextRef    = useRef(null);
  const ctaSpinnerRef = useRef(null);
  const ctaBusy       = useRef(false);

  useEffect(() => {
    // Register DOM price nodes with parent Pricing section on mount
    registerPriceRef(tier.id, 'symbol', symbolRef.current);
    registerPriceRef(tier.id, 'amount', amountRef.current);
  }, [tier.id, registerPriceRef]);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (ctaBusy.current) return;
    ctaBusy.current = true;

    // Show spinner + update text — pure DOM, no React re-render
    if (ctaSpinnerRef.current) ctaSpinnerRef.current.style.display = 'inline-block';
    if (ctaTextRef.current)    ctaTextRef.current.textContent = 'Processing…';

    setTimeout(() => {
      ctaBusy.current = false;
      if (ctaSpinnerRef.current) ctaSpinnerRef.current.style.display = 'none';
      if (ctaTextRef.current)    ctaTextRef.current.textContent = tier.cta;

      // Scroll to top of pricing on Enterprise; show toast for others
      if (tier.id === 'enterprise') {
        const el = document.getElementById('pricing');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Show inline notification via WAAPI on the button itself
        const btn = ctaTextRef.current?.closest('a');
        if (btn) {
          btn.animate(
            [{ boxShadow: '0 0 0 0 rgba(255,200,1,0)' }, { boxShadow: '0 0 0 8px rgba(255,200,1,0.25)' }, { boxShadow: '0 0 0 0 rgba(255,200,1,0)' }],
            { duration: 600, easing: 'ease-out' }
          );
        }
      }
    }, 1100);
  };

  // Computed once on first render — never updated by React
  const initialSymbol = getCurrencySymbol(initialCurrency);
  const initialAmount = computePrice(tier.id, initialCurrency, initialBilling);

  return (
    <article
      role="listitem"
      aria-label={`${tier.name} pricing plan`}
      className={`pricing-card relative flex flex-col justify-between rounded-2xl border transition-all duration-300 group ${
        tier.popular
          ? 'bg-gradient-to-b from-forsythia/8 to-oceanic border-forsythia/60 shadow-[0_20px_60px_rgba(255,200,1,0.08)] p-px'
          : 'bg-oceanic/50 border-white/8 shadow-xl hover:border-white/15 hover:-translate-y-1 p-8'
      }`}
    >
      {/* Popular card — gradient border wrapper */}
      {tier.popular ? (
        <div className="bg-gradient-to-b from-[#0d1e28] to-oceanic rounded-[calc(1rem-1px)] p-8 h-full flex flex-col justify-between">
          {renderCardContent(tier, symbolRef, amountRef, ctaSpinnerRef, ctaTextRef, initialSymbol, initialAmount, handleCtaClick)}
        </div>
      ) : (
        renderCardContent(tier, symbolRef, amountRef, ctaSpinnerRef, ctaTextRef, initialSymbol, initialAmount, handleCtaClick)
      )}

      {/* Most Popular badge */}
      {tier.popular && (
        <div
          aria-label="Most popular plan"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-saffron-gradient text-oceanic text-[11px] font-bold font-mono px-4 py-1 rounded-full uppercase tracking-wider shadow-[0_4px_12px_rgba(255,200,1,0.4)] whitespace-nowrap"
        >
          ★ Most Popular
        </div>
      )}
    </article>
  );
});

/** Extracted to avoid JSX duplication between popular/non-popular layout */
function renderCardContent(tier, symbolRef, amountRef, ctaSpinnerRef, ctaTextRef, initialSymbol, initialAmount, handleCtaClick) {
  return (
    <>
      <div>
        {/* Card Header */}
        <header className="mb-6">
          <h3 className="text-xl font-bold font-mono text-white mb-1">{tier.name}</h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">{tier.description}</p>
        </header>

        {/* Price Display — DOM-updated nodes, never re-rendered by React */}
        <div
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Price for ${tier.name}`}
          className="flex items-baseline text-white font-mono mb-2"
        >
          <span
            ref={symbolRef}
            data-price-ref={`${tier.id}-symbol`}
            aria-hidden="true"
            className="text-2xl font-bold mr-0.5 text-slate-300"
          >
            {initialSymbol}
          </span>

          <span
            ref={amountRef}
            data-price-ref={`${tier.id}-amount`}
            className="font-mono text-5xl font-extrabold tracking-tight"
          >
            {initialAmount}
          </span>

          <span aria-hidden="true" className="text-sm text-slate-400 ml-1.5 self-end mb-1">/mo</span>
        </div>

        <p
          className="text-[11px] text-slate-500 font-sans mb-6"
          data-billing-hint={tier.id}
        >
          Billed monthly. Switch to annual to save 20%.
        </p>

        <div className="h-px bg-white/5 mb-6" />

        {/* Feature list */}
        <ul aria-label={`Features included in ${tier.name}`} className="space-y-3.5 mb-8">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-sans text-slate-200">
              <svg
                className="w-4 h-4 text-forsythia mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        <a
          href={tier.id === 'enterprise' ? '#contact' : '#signup'}
          role="button"
          id={`cta-${tier.id}`}
          onClick={handleCtaClick}
          aria-label={`${tier.cta} — ${tier.name} plan`}
          className={`btn w-full py-3.5 font-semibold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            tier.popular
              ? 'bg-saffron-gradient text-oceanic font-bold hover:shadow-[0_0_24px_rgba(255,200,1,0.5)] hover:-translate-y-0.5'
              : 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 hover:-translate-y-0.5'
          }`}
        >
          {/* Spinner — hidden by default, shown via ref */}
          <svg
            ref={ctaSpinnerRef}
            style={{ display: 'none' }}
            className={`animate-spin h-4 w-4 flex-shrink-0 ${tier.popular ? 'text-oceanic' : 'text-forsythia'}`}
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span ref={ctaTextRef}>{tier.cta}</span>
        </a>
      </div>
    </>
  );
}

PricingCard.displayName = 'PricingCard';
export default PricingCard;
