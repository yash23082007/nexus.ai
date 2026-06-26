/* ==========================================================================
   NEXUS.AI - Interactive Scripting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }


  // --------------------------------------------------------------------------
  // 2. Bento Grid Mouse Tracking Glow Effect
  // --------------------------------------------------------------------------
  const bentoTiles = document.querySelectorAll('.bento-tile');
  bentoTiles.forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tile.style.setProperty('--mouse-x', `${x}px`);
      tile.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  // --------------------------------------------------------------------------
  // 3. Mobile Accordion Logic
  // --------------------------------------------------------------------------
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    // Set initial heights for active accordion
    const item = header.parentElement;
    const content = item.querySelector('.accordion-content');
    if (item.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    header.addEventListener('click', () => {
      const currentActive = document.querySelector('.accordion-item.active');
      
      // If clicked item is already active, close it
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        // Close previous active item
        if (currentActive) {
          currentActive.classList.remove('active');
          currentActive.querySelector('.accordion-content').style.maxHeight = null;
          currentActive.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }

        // Open current item
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Handle window resizing to adjust open accordion content heights
  window.addEventListener('resize', () => {
    const activeAccordionItem = document.querySelector('.accordion-item.active');
    if (activeAccordionItem) {
      const content = activeAccordionItem.querySelector('.accordion-content');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });


  // --------------------------------------------------------------------------
  // 4. Metrics Scroll Count-Up Animation
  // --------------------------------------------------------------------------
  const metricsSection = document.getElementById('metrics');
  const metricNumbers = document.querySelectorAll('.metric-number');
  let animationTriggered = false;

  const countUp = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const decimals = parseInt(element.getAttribute('data-decimals')) || 0;
    const duration = 2000; // 2 seconds
    const start = 0;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: cubic-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + easeProgress * (target - start);
      
      // Format number display
      let formattedVal = currentValue.toFixed(decimals);
      
      // Add commas for thousands (excluding decimals)
      if (target >= 1000 && decimals === 0) {
        formattedVal = Math.floor(currentValue).toLocaleString();
      } else if (target >= 1000) {
        // Handle database float rounding/commas
        const parts = currentValue.toFixed(decimals).split('.');
        parts[0] = parseInt(parts[0]).toLocaleString();
        formattedVal = parts.join('.');
      }

      element.textContent = `${prefix}${formattedVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure exact target is set at completion
        let finalVal = target.toFixed(decimals);
        if (target >= 1000) {
          const parts = target.toFixed(decimals).split('.');
          parts[0] = parseInt(parts[0]).toLocaleString();
          finalVal = parts.join('.');
        }
        element.textContent = `${prefix}${finalVal}${suffix}`;
      }
    };

    requestAnimationFrame(animate);
  };

  if ('IntersectionObserver' in window && metricsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationTriggered) {
          animationTriggered = true;
          metricNumbers.forEach(num => countUp(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(metricsSection);
  } else {
    // Fallback if IntersectionObserver is not supported
    metricNumbers.forEach(num => countUp(num));
  }


  // --------------------------------------------------------------------------
  // 5. Interactive Pricing Switch & Currency Dropdown
  // --------------------------------------------------------------------------
  // Data structure for pricing
  const pricingData = {
    INR: {
      symbol: '₹',
      starter: { monthly: 2499, annual: 1999 },
      prof: { monthly: 6249, annual: 4999 },
      ent: { monthly: 14999, annual: 11999 },
      flag: '🇮🇳',
      text: '₹ INR'
    },
    USD: {
      symbol: '$',
      starter: { monthly: 29, annual: 23 },
      prof: { monthly: 75, annual: 60 },
      ent: { monthly: 180, annual: 144 },
      flag: '🇺🇸',
      text: '$ USD'
    },
    EUR: {
      symbol: '€',
      starter: { monthly: 27, annual: 21 },
      prof: { monthly: 69, annual: 55 },
      ent: { monthly: 165, annual: 132 },
      flag: '🇪🇺',
      text: '€ EUR'
    },
    GBP: {
      symbol: '£',
      starter: { monthly: 24, annual: 19 },
      prof: { monthly: 59, annual: 47 },
      ent: { monthly: 140, annual: 112 },
      flag: '🇬🇧',
      text: '£ GBP'
    }
  };

  let currentCurrency = 'INR';
  let isAnnual = false;

  // Elements
  const billingSwitch = document.getElementById('billing-switch');
  const monthlyLabel = document.getElementById('monthly-label');
  const annualLabel = document.getElementById('annual-label');
  
  const currencyBtn = document.getElementById('currency-btn');
  const currencyList = document.getElementById('currency-list');
  const currencySelectedText = document.getElementById('currency-selected-text');
  const currencyFlagPlaceholder = document.querySelector('.currency-flag-placeholder');
  const currencyOptions = document.querySelectorAll('.currency-option');

  // Price targets
  const starterSymbol = document.getElementById('starter-symbol');
  const starterPrice = document.getElementById('starter-price');
  const starterSubtext = document.getElementById('starter-subtext');

  const profSymbol = document.getElementById('prof-symbol');
  const profPrice = document.getElementById('prof-price');
  const profSubtext = document.getElementById('prof-subtext');

  const entSymbol = document.getElementById('ent-symbol');
  const entPrice = document.getElementById('ent-price');
  const entSubtext = document.getElementById('ent-subtext');

  // Open/Close Dropdown
  if (currencyBtn && currencyList) {
    currencyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = currencyList.classList.toggle('open');
      currencyBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on click outside
    document.addEventListener('click', () => {
      currencyList.classList.remove('open');
      currencyBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Update Prices with Fade effect
  const updatePrices = () => {
    const data = pricingData[currentCurrency];
    const cycleKey = isAnnual ? 'annual' : 'monthly';
    const subtextString = isAnnual ? 'Billed annually' : 'Billed monthly';

    const cardPrices = [
      { symbolEl: starterSymbol, priceEl: starterPrice, subEl: starterSubtext, val: data.starter[cycleKey] },
      { symbolEl: profSymbol, priceEl: profPrice, subEl: profSubtext, val: data.prof[cycleKey] },
      { symbolEl: entSymbol, priceEl: entPrice, subEl: entSubtext, val: data.ent[cycleKey] }
    ];

    cardPrices.forEach(item => {
      // 1. Add fade class
      item.priceEl.parentElement.style.opacity = '0.3';
      item.priceEl.parentElement.style.transform = 'translateY(3px)';
      item.priceEl.parentElement.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

      setTimeout(() => {
        // 2. Perform switch
        item.symbolEl.textContent = data.symbol;
        item.priceEl.textContent = item.val.toLocaleString();
        item.subEl.textContent = subtextString;

        // 3. Fade back in
        item.priceEl.parentElement.style.opacity = '1';
        item.priceEl.parentElement.style.transform = 'translateY(0)';
      }, 150);
    });
  };

  // Currency option click
  currencyOptions.forEach(option => {
    option.addEventListener('click', () => {
      currencyOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      currentCurrency = option.getAttribute('data-value');
      const data = pricingData[currentCurrency];
      
      // Update selector text/flag
      currencySelectedText.textContent = data.text;
      currencyFlagPlaceholder.textContent = data.flag;

      updatePrices();
    });
  });

  // Billing switch toggle click
  const toggleBilling = () => {
    isAnnual = !isAnnual;
    if (isAnnual) {
      billingSwitch.classList.add('active');
      annualLabel.classList.add('active');
      monthlyLabel.classList.remove('active');
    } else {
      billingSwitch.classList.remove('active');
      annualLabel.classList.remove('active');
      monthlyLabel.classList.add('active');
    }
    updatePrices();
  };

  if (billingSwitch) {
    billingSwitch.addEventListener('click', toggleBilling);
    monthlyLabel.addEventListener('click', () => { if (isAnnual) toggleBilling(); });
    annualLabel.addEventListener('click', () => { if (!isAnnual) toggleBilling(); });
  }


  // --------------------------------------------------------------------------
  // 6. Interactive Mockup Demo Events
  // --------------------------------------------------------------------------
  const interactiveNodes = document.querySelectorAll('.interactive-node');
  const alertCard = document.getElementById('mockup-alert');
  const latencyVal = document.getElementById('latency-val');
  const pipeFlows = document.querySelectorAll('.pipe-flow');
  let alertTimeout = null;

  interactiveNodes.forEach(node => {
    // Define parallax offsets on hover
    const type = node.getAttribute('data-node');
    let moveX = 0, moveY = 0;
    if (type === 'webhook') { moveX = -3; moveY = -3; }
    else if (type === 'db') { moveX = -4; }
    else if (type === 'ai') { moveX = -3; moveY = 3; }
    else if (type === 'action-slack') { moveX = 3; moveY = -3; }
    else if (type === 'action-bi') { moveX = 3; moveY = 3; }

    node.style.setProperty('--node-x', `${moveX}px`);
    node.style.setProperty('--node-y', `${moveY}px`);

    node.addEventListener('click', () => {
      // Trigger temporary flow speed boost
      pipeFlows.forEach(flow => {
        flow.style.animation = 'flow-dash 2.5s linear infinite';
      });

      // Central node pulse
      const nexusCore = document.getElementById('nexus-core');
      if (nexusCore) {
        nexusCore.style.transform = 'translate(250px, 175px) scale(1.15)';
        setTimeout(() => {
          nexusCore.style.transform = 'translate(250px, 175px) scale(1)';
        }, 300);
      }

      // Generate a realistic latency
      const latencies = {
        'webhook': '12ms',
        'db': '34ms',
        'ai': '28ms',
        'action-slack': '8ms',
        'action-bi': '16ms'
      };
      
      const selectedLatency = latencies[type] || '15ms';
      latencyVal.textContent = selectedLatency;

      // Show alert card
      if (alertTimeout) clearTimeout(alertTimeout);
      alertCard.classList.add('show');

      // Revert speeds and hide alert card after delay
      alertTimeout = setTimeout(() => {
        alertCard.classList.remove('show');
        pipeFlows.forEach(flow => {
          flow.style.animation = ''; // restore to CSS default (15s)
        });
      }, 3500);
    });
  });

  // Automatically trigger a minor demo run after 2 seconds to showcase life/action
  setTimeout(() => {
    const webhookNode = document.querySelector('[data-node="webhook"]');
    if (webhookNode) {
      webhookNode.dispatchEvent(new Event('click'));
    }
  }, 2200);

});
