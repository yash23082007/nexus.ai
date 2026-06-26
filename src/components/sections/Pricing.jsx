// src/components/sections/Pricing.jsx
import React, { useRef, useCallback, useEffect } from 'react';
import { PRICING_CONFIG, computePrice, getCurrencySymbol } from '../../data/pricingMatrix';
import BillingToggle from '../ui/BillingToggle';
import CurrencySelector from '../ui/CurrencySelector';
import PricingCard from '../ui/PricingCard';

const Pricing = () => {
  // Using useRef and direct DOM mutation to pass the zero-re-render constraint.
  // React.memo keeps the pricing cards from updating when controls change.
  const billingRef = useRef('monthly');
  const currencyRef = useRef('INR');

  // Direct DOM refs to price amount and symbol text nodes
  const priceRefs = useRef({});

  const registerPriceRef = useCallback((tierId, type, node) => {
    if (!priceRefs.current[tierId]) priceRefs.current[tierId] = {};
    priceRefs.current[tierId][type] = node;
  }, []);

  // Direct DOM updates for prices - zero React re-render of card components
  const updateAllPrices = useCallback(() => {
    const billing = billingRef.current;
    const currency = currencyRef.current;
    const symbol = getCurrencySymbol(currency);

    PRICING_CONFIG.tiers.forEach(tier => {
      const refs = priceRefs.current[tier.id];
      if (!refs) return;

      // Update symbol node directly
      if (refs.symbol) {
        refs.symbol.textContent = symbol;
      }

      // Update amount node directly and trigger custom keyframe animation
      if (refs.amount) {
        refs.amount.style.animation = 'none';
        // Force reflow ONLY on this node
        void refs.amount.offsetHeight;
        refs.amount.style.animation = 'priceFlip 0.18s ease-out forwards';
        refs.amount.textContent = computePrice(tier.id, currency, billing);
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

  // Initial pricing fill on mount
  useEffect(() => {
    updateAllPrices();
  }, [updateAllPrices]);

  return (
    <section 
      id="pricing" 
      aria-labelledby="pricing-heading"
      className="bg-oceanic border-t border-white/5 py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-forsythia/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold font-mono text-forsythia uppercase tracking-widest bg-forsythia/10 border border-forsythia/20 rounded-full px-4 py-1.5 mb-4">
            Pricing Plans
          </span>
          <h2 id="pricing-heading" className="font-mono text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 font-sans text-base max-w-xl mx-auto leading-relaxed">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </div>

        {/* Controls — completely isolated components */}
        <div 
          role="group" 
          aria-label="Pricing options"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <BillingToggle onToggle={handleBillingChange} />
          <CurrencySelector onSelect={handleCurrencyChange} />
        </div>

        {/* Cards — React.memo prevents re-render on ANY state change */}
        <div 
          role="list" 
          aria-label="Pricing tiers"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {PRICING_CONFIG.tiers.map(tier => (
            <PricingCard
              key={tier.id}
              tier={tier}
              registerPriceRef={registerPriceRef}
              initialCurrency="INR"
              initialBilling="monthly"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Pricing);
