// src/data/pricingMatrix.js
// This is the single source of truth for pricing math and display metadata.

export const PRICING_MATRIX = {
  annualDiscount: 0.8,
  tariffs: {
    USD: { symbol: '$', rate: 1, locale: 'en-US' },
    INR: { symbol: '₹', rate: 83.5, locale: 'en-IN' },
    EUR: { symbol: '€', rate: 0.92, locale: 'de-DE' },
  },
  baseTiers: {
    starter: { basePrice: 29 },
    professional: { basePrice: 79 },
    enterprise: { basePrice: 189 },
  },
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

export const computePrice = (tier, currency, isAnnual) => {
  const base = PRICING_MATRIX.baseTiers[tier].basePrice;
  const tariff = PRICING_MATRIX.tariffs[currency];
  const multiplier = isAnnual ? PRICING_MATRIX.annualDiscount : 1;
  const rawPrice = base * tariff.rate * multiplier;
  const rounded = Math.round(rawPrice / 10) * 10;

  return new Intl.NumberFormat(tariff.locale, { maximumFractionDigits: 0 }).format(rounded);
};

export const getCurrencySymbol = (currency) => PRICING_MATRIX.tariffs[currency].symbol;
