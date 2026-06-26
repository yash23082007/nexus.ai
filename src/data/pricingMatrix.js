// src/data/pricingMatrix.js
// THIS IS THE ONLY SOURCE OF TRUTH FOR PRICES — NEVER HARDCODE IN JSX

export const PRICING_CONFIG = {
  // Base monthly rates in USD
  basePrices: {
    starter:      29,
    professional: 79,
    enterprise:   189,
  },

  // Annual multiplier (20% discount)
  annualMultiplier: 0.80,

  // Regional tariff variables (multiplied against USD base)
  currencyTariffs: {
    USD: { symbol: '$',  multiplier: 1,    locale: 'en-US' },
    INR: { symbol: '₹',  multiplier: 83.5, locale: 'en-IN' },
    EUR: { symbol: '€',  multiplier: 0.92, locale: 'de-DE' },
  },

  // Tier metadata (display info — NOT prices)
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams and solo builders.',
      cta: 'Start Free',
      popular: false,
      features: [
        '5,000 automation tasks/mo',
        '3 active workflows',
        'Core integrations (10)',
        'Email support',
        '99.5% uptime SLA',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing teams who need power and scale.',
      cta: 'Start Trial',
      popular: true,
      features: [
        '100,000 automation tasks/mo',
        'Unlimited active workflows',
        'All integrations (2,400+)',
        'Priority support + Slack',
        '99.9% uptime SLA',
        'Advanced analytics',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom scale, compliance, and dedicated support.',
      cta: 'Contact Sales',
      popular: false,
      features: [
        'Unlimited automation tasks',
        'Unlimited workflows + teams',
        'Custom integrations + API',
        'Dedicated success manager',
        '99.99% uptime SLA',
        'SOC 2 + HIPAA compliance',
      ],
    },
  ],
};

// Pure price calculation function
// Returns formatted price string — no state involved
export function computePrice(tierId, currency, billingCycle) {
  const config = PRICING_CONFIG;
  const base = config.basePrices[tierId];
  const tariff = config.currencyTariffs[currency];
  const cycleMultiplier = billingCycle === 'annual' ? config.annualMultiplier : 1;

  const rawPrice = base * tariff.multiplier * cycleMultiplier;

  // Round to nearest sensible value (rounded to nearest 10)
  const rounded = Math.round(rawPrice / 10) * 10;

  return new Intl.NumberFormat(tariff.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function getCurrencySymbol(currency) {
  return PRICING_CONFIG.currencyTariffs[currency].symbol;
}
