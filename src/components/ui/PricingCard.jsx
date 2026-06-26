// src/components/ui/PricingCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { computePrice, getCurrencySymbol } from '../../utils/priceUtils';

// React.memo = this component NEVER re-renders after mount
const PricingCard = React.memo(({ tier, registerPriceRef, initialCurrency, initialBilling }) => {
  const symbolRef = useRef(null);
  const amountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Register DOM refs with parent on mount
    registerPriceRef(tier.id, 'symbol', symbolRef.current);
    registerPriceRef(tier.id, 'amount', amountRef.current);
  }, [tier.id, registerPriceRef]);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Provisioning your ${tier.name} workspace on NEXUS.AI. Check your email to configure your credentials!`);
    }, 1200);
  };

  // Initial values — computed once on render, never again via React
  const initialSymbol = getCurrencySymbol(initialCurrency);
  const initialAmount = computePrice(tier.id, initialCurrency, initialBilling);

  return (
    <article
      role="listitem"
      aria-label={`${tier.name} pricing plan`}
      aria-featured={tier.popular ? 'true' : undefined}
      className={`pricing-card relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 ${
        tier.popular 
          ? 'bg-gradient-to-b from-forsythia/5 to-oceanic/50 border-forsythia shadow-[0_15px_35px_rgba(255,200,1,0.05)]' 
          : 'bg-oceanic/40 border-white/5 shadow-xl hover:border-white/10 hover:-translate-y-1'
      }`}
    >
      {tier.popular && (
        <div 
          aria-label="Most popular plan" 
          role="img"
          className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-saffron-gradient text-oceanic text-xs font-bold font-mono px-4 py-1 rounded-full uppercase tracking-wider"
        >
          ★ Most Popular
        </div>
      )}

      <div>
        <header className="mb-6">
          <h3 className="text-xl font-bold font-mono text-white mb-1">{tier.name}</h3>
          <p className="text-xs text-slate-400 font-sans">{tier.description}</p>
        </header>

        {/* PRICE DISPLAY — two separate text nodes for isolated updates */}
        <div 
          aria-live="polite" 
          aria-atomic="true" 
          aria-label={`Price for ${tier.name}`}
          className="flex items-baseline text-white font-mono mb-6"
        >
          {/* Symbol node — updated directly by textContent */}
          <span
            ref={symbolRef}
            data-price-ref={`${tier.id}-symbol`}
            aria-hidden="true"
            className="text-2xl font-bold mr-1"
          >
            {initialSymbol}
          </span>

          {/* Amount node — updated directly by textContent */}
          <span
            ref={amountRef}
            data-price-ref={`${tier.id}-amount`}
            className="font-mono text-5xl font-extrabold tracking-tight price-amount"
          >
            {initialAmount}
          </span>

          <span aria-hidden="true" className="text-sm text-slate-400 ml-1">/mo</span>
        </div>

        <div className="h-px bg-white/5 my-6" />

        <ul 
          aria-label={`Features included in ${tier.name}`}
          className="space-y-4 mb-8"
        >
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-sans text-slate-200">
              <svg className="w-4 h-4 text-forsythia mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <a
          href={tier.id === 'enterprise' ? '#contact' : '#signup'}
          role="button"
          onClick={handleCtaClick}
          aria-label={`${tier.cta} - ${tier.name} plan`}
          className={`btn w-full py-3 font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            tier.popular 
              ? 'bg-saffron-gradient text-oceanic hover:shadow-[0_0_20px_rgba(255,200,1,0.4)] hover:-translate-y-0.5' 
              : 'bg-white/5 text-slate-200 border border-white/5 hover:bg-white/10 hover:text-white hover:-translate-y-0.5'
          }`}
        >
          {isLoading && (
            <svg className={`animate-spin h-4 w-4 ${tier.popular ? 'text-oceanic' : 'text-forsythia'}`} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          <span>{isLoading ? 'Processing...' : tier.cta}</span>
        </a>
      </div>
    </article>
  );
});

PricingCard.displayName = 'PricingCard';
export default PricingCard;
