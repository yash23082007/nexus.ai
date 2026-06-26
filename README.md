# ⚡ NEXUS.AI — Automate Everything. Intelligently.

NEXUS.AI is a premium, high-converting automation platform landing page built to demonstrate cutting-edge React patterns, zero-re-render state management, and fluid responsive behaviors. It serves as a unified workspace connecting data pipelines, workflows, and logical routing tables.

---

## 🎨 Design Philosophy & Visual Tokens

The interface follows a tailored, high-contrast dark visual system built from custom HSL color tokens:
*   **Backgrounds**: `Arctic Powder (#F1F6F4)` for page accents, and `Oceanic Noir (#172B36)` as the deepest dark overlay.
*   **Darks**: `Nocturnal Expedition (#114C5A)` for typography, borders, and dark section boundaries.
*   **Accents**: `Forsythia (#FFC801)` as primary CTA highlights, paired with `Deep Saffron (#FF9932)` gradients.
*   **Subtle Fills**: `Mystic Mint (#D9E8E2)` to soften borders, form metrics backgrounds, and style secondary elements.
*   **Typography**: JetBrains Mono for technical codes, numeric stats, and pricing figures; Inter for elegant human readability.

---

## 🚀 Key Engineering Differentiators

### 1. Zero-Re-render Pricing Engine (Feature 1)
Standard React state-driven forms trigger full component tree updates. To achieve absolute efficiency:
*   **Matrix Config**: A single configuration file (`pricingMatrix.js`) manages regional multipliers (INR, USD, EUR), discount tariffs, and formatting locales.
*   **Direct DOM Updating**: Card components are wrapped in `React.memo` preventing any virtual DOM comparisons. Pricing toggles and select dropdowns capture changes and directly manipulate target text nodes (`refs.amount.textContent`) in `~0.1ms`.
*   **Micro-interactions**: When pricing toggles are clicked, a Web Animations API (WAAPI) flip animation triggers on the text node to give a premium physical slide effect.

### 2. Bento-to-Accordion Transition with Context Lock (Feature 2)
To deliver a desktop-class grid and mobile-optimized touch accordion:
*   **ResizeObserver Breakpoint Tracking**: Avoids layout jumps by checking document dimensions natively.
*   **Context Lock**: Hover state on the desktop bento cards is preserved in a mutable reference. When resizing or scaling below `768px`, a synchronized hook transfers the last active index into the mobile accordion component to automatically open that specific section.
*   **Dynamic ScrollHeight Transition**: Accordion panels avoid static height transitions; heights are computed programmatically on open events to enable clean accordion animations.

### 3. Interactive Hero Canvas Mockup
*   Features a custom interactive SVG pipeline chart showing live data flow animations.
*   Interactive clickable nodes (Webhooks, CRM Events, Databases) mock latency calls and route packets toward Slack or Analytics channels with real-time status alerts.

---

## 🛠️ Technology Stack

*   **Framework**: React 19 + Vite (ESNext build target)
*   **Styles**: Tailwind CSS v3 + CSS Variables
*   **Animations**: Native CSS Transitions, Compositor-Only `@keyframes`, and Web Animations API (WAAPI)
*   **Observers**: ResizeObserver (responsiveness) & IntersectionObserver (scroll triggers)

---

## 📦 Project Structure

```bash
src/
├── assets/
│   └── svgs/            # 14 standalone React SVG components
├── components/
│   ├── layout/          # Navbar, Footer (Sticky layout, Frosted Glass)
│   ├── sections/        # Hero, TrustBar, Features, Metrics, Pricing, Testimonials, CTA
│   └── ui/              # PricingCard, BentoCard, AccordionItem, BillingToggle, CurrencySelector
├── data/
│   ├── featuresData.js  # Config and content for Feature Bento cards
│   └── pricingMatrix.js # Central Pricing Matrix logic and formulas
├── hooks/
│   ├── useBreakpoint.js # ResizeObserver hook
│   └── useIntersection.js# Scroll trigger IntersectionObserver hook
├── styles/
│   └── globals.css      # Design tokens, tailwind configurations, keyframes
└── utils/
    └── priceUtils.js    # Currency formatter wrappers
```

---

## 💻 Local Setup & Development

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

1. Clone the repository:
   ```bash
   git clone https://github.com/yash23082007/nexus.ai.git
   cd nexus.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Build production bundle assets:
   ```bash
   npm run build
   ```
