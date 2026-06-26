<div align="center">

# ⚡ NEXUS.AI

### Automate Everything. Intelligently.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-nexus--ai--dun--three.vercel.app-FFC801?style=for-the-badge&logo=vercel&logoColor=black)](https://nexus-ai-dun-three.vercel.app/)
[![GitHub](https://img.shields.io/badge/Source-yash23082007%2Fnexus.ai-172B36?style=for-the-badge&logo=github)](https://github.com/yash23082007/nexus.ai)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A premium, high-converting SaaS landing page for an AI-driven data automation platform — built as a direct test of **architectural integrity**, **engineering speed**, **motion choreography**, and **SEO hygiene** under strict performance and correctness constraints.

</div>

---

## 🌐 Live

**Production URL:** [https://nexus-ai-dun-three.vercel.app/](https://nexus-ai-dun-three.vercel.app/)

---

## 🎨 Design System

The interface is built on a tailored, high-contrast dark visual system using custom design tokens:

| Token | Hex | Usage |
|---|---|---|
| `Forsythia` | `#FFC801` | Primary CTAs, highlights, active states |
| `Deep Saffron` | `#FF9932` | Gradient partner, secondary accents |
| `Oceanic Noir` | `#172B36` | Deepest dark, navbar, footer background |
| `Nocturnal` | `#114C5A` | Section dividers, dark fills |
| `Arctic Powder` | `#F1F6F4` | Page background (light areas) |
| `Mystic Mint` | `#D9E8E2` | Subtle borders, secondary fills |

**Typography:** `JetBrains Mono` for code, pricing figures & stats · `Inter` for body copy and UI

---

## 🚀 Engineering Highlights

### Feature 1 — Zero Re-render Pricing Engine

> **Constraint:** Toggle billing/currency → PricingCard components must never flash in React DevTools.

- `billingRef` / `currencyRef` store state as `useRef` — never triggers React's render cycle
- `PricingCard` is wrapped in `React.memo` with no prop changes after mount
- `updateAllPrices()` directly mutates `refs.amount.textContent` and `refs.symbol.textContent` — bypassing the virtual DOM entirely
- Price flip uses a single-node WAAPI keyframe (`priceFlip 0.18s`) replayed via forced reflow (`void el.offsetHeight`) — isolated to the text node only
- CTA loading states (spinner + text swap) also use `useRef` + `style.display` / `textContent` — **zero `useState` in PricingCard**

### Feature 2 — Bento-to-Accordion with Context Lock

> **Constraint:** Hovering bento tile #2 on desktop, then resizing to mobile, must auto-open accordion item #2.

- `hoveredBentoIndex` stored in `useRef` so hover events never cause re-renders
- `useBreakpoint()` hook uses `ResizeObserver` to track the `768px` breakpoint crossing
- On crossing to mobile, `useEffect` reads `hoveredBentoIndex.current` and calls `setOpenAccordionIndex()` — transferring context with a single state write
- Hover state is **never reset** on mouse leave, preserving the last active index for the lock transfer
- Desktop bento / mobile accordion toggled via CSS class (`.bento-grid` / `.accordion-list`) — no JS layout switching

### Feature 3 — Motion Choreography

- **WAAPI orchestrated hero entrance:** `.hero-stagger` elements animate in sequence with `delay: index * 100ms`
- **Hero mockup entrance:** CSS `fadeUp` keyframe with `animation-fill-mode: both`
- **SVG pipeline visualization:** Custom `flow-dash` `stroke-dashoffset` keyframe drives the animated data-flow paths; interactive nodes trigger WAAPI scale pulses on the central core
- **Accordion panels:** `max-height` transition computed from `scrollHeight` — no static values
- **Scroll-triggered metrics counters:** `IntersectionObserver` fires `requestAnimationFrame` counter loops

### Feature 4 — Navbar Zero Re-render Loading States

- Login / Start Free button loading is handled via `useRef` booleans + direct DOM `textContent` + `style.display` toggling
- `React.forwardRef` `<Spinner>` component renders hidden (`display: none`) and is shown/hidden without any React state
- Navbar scroll background uses `useState` (layout concern, not price data) — acceptable

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 (ESNext) |
| Styling | Tailwind CSS v3 + CSS Custom Properties |
| Animations | Pure CSS `@keyframes`, WAAPI, `transition` |
| Observers | `ResizeObserver` · `IntersectionObserver` |
| Fonts | JetBrains Mono · Inter (Google Fonts) |
| Deployment | Vercel (auto-deploy from `main`) |

> **No banned libraries.** Zero usage of `framer-motion`, `@radix-ui/*`, `headlessui`, or Shadcn UI components for animation or layout transitions.

---

## 📦 Project Structure

```
src/
├── assets/
│   └── svgs/               # 14 inline SVG React components (aria-hidden)
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx      # Sticky frosted-glass nav, zero-rerender CTA loading
│   │   └── Footer.jsx      # Full-column footer with social links
│   ├── sections/
│   │   ├── Hero.jsx        # Interactive SVG pipeline mockup + WAAPI entrance
│   │   ├── TrustBar.jsx    # CSS marquee logo trust bar
│   │   ├── Features.jsx    # Bento/Accordion context-lock switcher
│   │   ├── Metrics.jsx     # IntersectionObserver animated counters
│   │   ├── Pricing.jsx     # Zero-rerender pricing engine orchestrator
│   │   ├── Testimonials.jsx# Social proof quote grid
│   │   └── CTA.jsx         # Final lead-gen call to action
│   └── ui/
│       ├── PricingCard.jsx  # React.memo card, zero useState, all DOM refs
│       ├── BentoCard.jsx    # Desktop feature tile with hover effects
│       ├── AccordionItem.jsx# Mobile feature accordion with scrollHeight animation
│       ├── BillingToggle.jsx# Monthly/Annual switch
│       ├── CurrencySelector.jsx # INR/USD/EUR dropdown
│       └── Badge.jsx        # Pill badge component
├── data/
│   ├── featuresData.js      # Feature card content and icons
│   └── pricingMatrix.js     # Pricing tiers, currency tariffs, computePrice()
├── hooks/
│   ├── useBreakpoint.js     # ResizeObserver 768px breakpoint hook
│   └── useIntersection.js   # IntersectionObserver scroll trigger hook
├── styles/
│   └── globals.css          # Design tokens, keyframes, bento/accordion CSS
└── utils/
    └── priceUtils.js        # Re-exports from pricingMatrix for clean imports
```

---

## 💻 Local Setup

Requires [Node.js](https://nodejs.org/) v18+.

```bash
# 1. Clone
git clone https://github.com/yash23082007/nexus.ai.git
cd nexus.ai

# 2. Install
npm install

# 3. Dev server (http://localhost:5173)
npm run dev

# 4. Production build
npm run build
```

---

## ✅ Constraint Checklist

| Constraint | Status |
|---|---|
| No `framer-motion` / `@radix-ui` / `headlessui` / Shadcn in animations | ✅ |
| PricingCard never re-renders on billing/currency toggle | ✅ |
| Bento hover context locks to accordion on resize | ✅ |
| All motion via pure CSS or WAAPI | ✅ |
| Semantic HTML (`header`, `main`, `section`, `article`, `footer`) | ✅ |
| 14 inline SVG icons with `aria-hidden="true"` | ✅ |
| `useRef` for price state, zero `useState` in PricingCard | ✅ |
| Navbar CTA loading via DOM refs (no `useState`) | ✅ |

---

## 📄 License

MIT — built by [Yash](https://github.com/yash23082007)
