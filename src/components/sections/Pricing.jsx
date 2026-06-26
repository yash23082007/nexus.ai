// src/components/sections/Pricing.jsx
import React, { useRef, useCallback, useEffect } from 'react';
import { PRICING_MATRIX, computePrice, getCurrencySymbol } from '../../data/pricingMatrix';
import BillingToggle from '../ui/BillingToggle';
import CurrencySelector from '../ui/CurrencySelector';
import PricingCard from '../ui/PricingCard';

/**
 * Pricing Section — Zero-Re-Render Architecture
 *
 * - billingRef / currencyRef store state as refs (no useState → no re-renders)
 * - priceRefs holds direct DOM node references registered by each PricingCard
 * - updateAllPrices() mutates textContent directly → PricingCards never re-render
 * - React.memo on this component and PricingCard enforces the constraint
 */
const Pricing = () => {
  const billingRef  = useRef('monthly');
  const currencyRef = useRef('INR');
  const priceRefs   = useRef({});

  // Called once per card on mount — gives us direct DOM access to price nodes
  const registerPriceRef = useCallback((tierId, type, node) => {
    if (!priceRefs.current[tierId]) priceRefs.current[tierId] = {};
    priceRefs.current[tierId][type] = node;
  }, []);

  // Pure DOM mutation — zero React re-renders on any PricingCard
  const updateAllPrices = useCallback(() => {
    const billing  = billingRef.current;
    const currency = currencyRef.current;
    const symbol   = getCurrencySymbol(currency);

    PRICING_MATRIX.tiers.forEach(tier => {
      const refs = priceRefs.current[tier.id];
      if (!refs) return;

      if (refs.symbol) {
        refs.symbol.textContent = symbol;
      }

      if (refs.amount) {
        // Reset → reflow → replay keyframe — isolated to this single text node
        refs.amount.style.animation = 'none';
        void refs.amount.offsetHeight; // force reflow on THIS node only
        refs.amount.style.animation = 'priceFlip 0.18s cubic-bezier(0.16,1,0.3,1) forwards';
        refs.amount.textContent = computePrice(tier.id, currency, billing);
      }
    });

    // Also update billing period hint spans
    PRICING_MATRIX.tiers.forEach(tier => {
      const hint = document.querySelector(`[data-billing-hint="${tier.id}"]`);
      if (hint) {
        hint.textContent = billing === 'annual'
          ? 'Billed annually. You save 20%!'
          : 'Billed monthly. Switch to annual to save 20%.';
      }
    });
  }, []);

  const handleBillingChange = useCallback((newBilling) => {
    billingRef.current = newBilling;
    updateAllPrices();
  }, [updateAllPrices]);

  const handleCurrencyChange = useCallback((newCurrency) => {
    currencyRef.current = newCurrency;
    updateAllPrices();
  }, [updateAllPrices]);

  // Populate prices on first paint (refs are registered in PricingCard useEffect)
  useEffect(() => {
    // Small RAF to ensure all registerPriceRef calls have completed
    const id = requestAnimationFrame(() => updateAllPrices());
    return () => cancelAnimationFrame(id);
  }, [updateAllPrices]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative bg-oceanic border-t border-white/5 py-28 overflow-hidden"
    >
      {/* Decorative ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-forsythia/20 to-transparent pointer-events-none" />
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] rounded-full bg-nocturnal/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-forsythia/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold font-mono text-forsythia uppercase tracking-widest bg-forsythia/10 border border-forsythia/20 rounded-full px-4 py-1.5 mb-5">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Pricing Plans
          </span>
          <h2
            id="pricing-heading"
            className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 font-sans text-base max-w-lg mx-auto leading-relaxed">
            Start free. Scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* ── Controls Row ── */}
        <div
          role="group"
          aria-label="Pricing options"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <BillingToggle onToggle={handleBillingChange} />
          <div className="hidden sm:block w-px h-6 bg-white/10" aria-hidden="true" />
          <CurrencySelector onSelect={handleCurrencyChange} />
        </div>

        {/* ── Pricing Cards Grid ── */}
        <div
          role="list"
          aria-label="Pricing tiers"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {PRICING_MATRIX.tiers.map(tier => (
            <PricingCard
              key={tier.id}
              tier={tier}
              registerPriceRef={registerPriceRef}
              initialCurrency="INR"
              initialBilling="monthly"
            />
          ))}
        </div>

        {/* ── Trust Footer Row ── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-sans">
          {[
            { icon: '🔒', text: 'SOC 2 Type II Certified' },
            { icon: '💳', text: 'No credit card required to start' },
            { icon: '↩️', text: '30-day money-back guarantee' },
            { icon: '🌍', text: 'Cancel anytime, no lock-in' },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <span aria-hidden="true">{icon}</span>
              {text}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default React.memo(Pricing);
