import React, { useEffect, useState, useRef } from 'react';
import Badge from '../ui/Badge';

export function Hero() {
  const [latencyText, setLatencyText] = useState('12ms');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [flowSpeed, setFlowSpeed] = useState('15s');
  const [isGetStartedLoading, setIsGetStartedLoading] = useState(false);
  
  const alertTimeoutRef = useRef(null);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    if (isGetStartedLoading) return;
    setIsGetStartedLoading(true);
    setTimeout(() => {
      setIsGetStartedLoading(false);
      const target = document.getElementById('pricing');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  // WAAPI orchestrated entry sequence animations
  useEffect(() => {
    const elements = document.querySelectorAll('.hero-stagger');
    elements.forEach((el, index) => {
      el.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 200,
        delay: index * 100,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      });
    });
  }, []);

  // Trigger demo route logic
  const handleNodeClick = (nodeType) => {
    // Increase pipeline speed (visual indicator)
    setFlowSpeed('3s');

    // Central pulsing core scaling
    const core = document.getElementById('nexus-core-react');
    if (core) {
      core.animate([
        { transform: 'translate(250px, 175px) scale(1)' },
        { transform: 'translate(250px, 175px) scale(1.18)' },
        { transform: 'translate(250px, 175px) scale(1)' }
      ], {
        duration: 350,
        easing: 'ease-in-out'
      });
    }

    // Determine latency values
    const latencies = {
      webhook: '12ms',
      db: '34ms',
      ai: '28ms',
      slack: '8ms',
      bi: '16ms'
    };

    setLatencyText(latencies[nodeType] || '15ms');
    setIsAlertOpen(true);

    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }

    alertTimeoutRef.current = setTimeout(() => {
      setIsAlertOpen(false);
      setFlowSpeed('15s');
    }, 3500);
  };

  // Auto trigger visual demo on load
  useEffect(() => {
    const t = setTimeout(() => {
      handleNodeClick('webhook');
    }, 2500);
    return () => {
      clearTimeout(t);
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-oceanic to-nocturnal/20 pt-36 pb-20 flex items-center overflow-hidden">
      {/* Decorative overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-nocturnal/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-forsythia/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-16 relative z-10">
        
        {/* Content Box */}
        <div className="lg:col-span-6 text-left flex flex-col justify-center">
          <div className="mb-6 opacity-0 hero-stagger">
            <Badge>
              <span className="w-1.5 h-1.5 rounded-full bg-forsythia animate-pulse mr-2" />
              Now in Public Beta <span className="mx-1.5 text-slate-400">→</span> <span className="text-white font-bold">Live</span>
            </Badge>
          </div>

          <h1 className="opacity-0 hero-stagger font-mono text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.1] mb-6">
            Automate Everything.<br />
            <span className="bg-saffron-gradient bg-clip-text text-transparent">Intelligently.</span>
          </h1>

          <p className="opacity-0 hero-stagger text-lg text-slate-300 font-sans leading-relaxed max-w-xl mb-8">
            The AI automation platform that connects your data pipelines, workflows, and decisions. Instantly triggers events and routes payloads with enterprise-grade reliability.
          </p>

          <div className="opacity-0 hero-stagger flex flex-wrap items-center gap-4 mb-12">
            <a 
              href="#pricing" 
              onClick={handleGetStartedClick}
              className="btn bg-saffron-gradient text-oceanic text-base font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(255,200,1,0.5)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 min-w-[190px]"
            >
              {isGetStartedLoading && (
                <svg className="animate-spin h-5 w-5 text-oceanic" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              <span>{isGetStartedLoading ? 'Loading...' : 'Get Started Free'}</span>
            </a>
            <button 
              onClick={() => handleNodeClick('ai')}
              className="btn bg-white/5 border border-white/5 hover:bg-white/10 text-white text-base font-bold px-8 py-3.5 rounded-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5V19L19 12L8 5Z" /></svg>
              Watch Demo
            </button>
          </div>

          {/* Stats Bar */}
          <div className="opacity-0 hero-stagger flex items-center gap-8 border-t border-white/5 pt-8 max-w-md">
            <div>
              <div className="font-mono text-2xl font-bold text-white leading-none">99.9%</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">uptime SLA</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="font-mono text-2xl font-bold text-white leading-none">10M+</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">tasks / day</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="font-mono text-2xl font-bold text-white leading-none">&lt;50ms</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">latency</div>
            </div>
          </div>
        </div>

        {/* Visual Mockup Box */}
        <div className="lg:col-span-6 w-full flex items-center justify-center">
          <div className="hero-mockup w-full max-w-[580px] bg-[#040914] border border-white/5 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
            
            {/* Mockup Top Window Chrome */}
            <div className="bg-[#030712]/50 border-b border-white/5 px-4 py-3.5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="bg-white/5 px-8 py-0.5 rounded border border-white/5 text-[10px] font-mono text-slate-500 select-none">
                api.nexus.ai/v1/pipelines
              </div>
              <span className="bg-emerald-500/15 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live
              </span>
            </div>

            {/* Mockup Canvas Screen */}
            <div className="p-6 relative">
              <svg className="w-full h-auto max-h-[300px]" viewBox="0 0 600 350" fill="none">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid-react" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                  </pattern>
                  <linearGradient id="flow-grad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFC801" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#FF9932" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FFC801" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <rect width="600" height="350" fill="url(#grid-react)" />

                {/* Connections Path Coordinates */}
                <path d="M 100 100 L 250 175" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M 100 175 L 250 175" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M 100 250 L 250 175" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M 250 175 L 450 100" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M 250 175 L 450 250" stroke="#1e293b" strokeWidth="2.5" />

                {/* Animated Pipeline Data Flow */}
                <path 
                  d="M 100 100 L 250 175 M 100 175 L 250 175 M 100 250 L 250 175 M 250 175 L 450 100 M 250 175 L 450 250" 
                  stroke="url(#flow-grad)" 
                  strokeWidth="2.5" 
                  strokeDasharray="8 12"
                  style={{
                    animation: `flow-dash ${flowSpeed} linear infinite`
                  }}
                />

                {/* Interactive Node 1: Webhook */}
                <g 
                  onClick={() => handleNodeClick('webhook')}
                  className="cursor-pointer group/node"
                  transform="translate(100, 100)"
                >
                  <circle r="20" fill="#040914" stroke="#FFC801" strokeWidth="2" />
                  <circle className="animate-ping" r="20" fill="none" stroke="#FFC801" strokeWidth="1" opacity="0.15" style={{ animationDuration: '3s' }} />
                  <path d="M-6 -4 h12 M-6 0 h12 M-6 4 h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <text y="34" textAnchor="middle" fill="#64748b" className="text-[10px] font-sans font-medium pointer-events-none select-none">Webhooks</text>
                </g>

                {/* Interactive Node 2: Database */}
                <g 
                  onClick={() => handleNodeClick('db')}
                  className="cursor-pointer group/node"
                  transform="translate(100, 175)"
                >
                  <circle r="20" fill="#040914" stroke="#FFC801" strokeWidth="2" />
                  <circle className="animate-ping" r="20" fill="none" stroke="#FFC801" strokeWidth="1" opacity="0.15" style={{ animationDuration: '3s' }} />
                  <ellipse cx="0" cy="-5" rx="6" ry="2.5" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M-6 -5 V0 C-6 2 6 2 6 0 V-5 M-6 0 V5 C-6 7 6 7 6 5 V0" stroke="white" strokeWidth="2" fill="none" />
                  <text y="34" textAnchor="middle" fill="#64748b" className="text-[10px] font-sans font-medium pointer-events-none select-none">Data Lakes</text>
                </g>

                {/* Interactive Node 3: AI parser */}
                <g 
                  onClick={() => handleNodeClick('ai')}
                  className="cursor-pointer group/node"
                  transform="translate(100, 250)"
                >
                  <circle r="20" fill="#040914" stroke="#FFC801" strokeWidth="2" />
                  <circle className="animate-ping" r="20" fill="none" stroke="#FFC801" strokeWidth="1" opacity="0.15" style={{ animationDuration: '3s' }} />
                  <path d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z" fill="white" />
                  <text y="34" textAnchor="middle" fill="#64748b" className="text-[10px] font-sans font-medium pointer-events-none select-none">CRM Events</text>
                </g>

                {/* Orchestrator Center Core */}
                <g id="nexus-core-react" transform="translate(250, 175)" className="transition-transform duration-300">
                  <circle r="32" fill="url(#core-gradient-react)" className="filter drop-shadow-[0_0_12px_rgba(255,200,1,0.4)]" />
                  <circle className="animate-spin" r="40" fill="none" stroke="#FFC801" strokeWidth="1.5" strokeDasharray="4 6" style={{ animationDuration: '40s' }} />
                  <path d="M-8 -5 L0 -9 L8 -5 L8 5 L0 9 L-8 5 Z" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M-8 -5 L0 0 L8 -5 M0 0 V9" stroke="white" strokeWidth="2" />
                  <text y="52" textAnchor="middle" fill="#FFC801" className="text-[9px] font-mono font-bold tracking-widest pointer-events-none select-none">NEXUS</text>
                  <defs>
                    <radialGradient id="core-gradient-react" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFC801" />
                      <stop offset="70%" stopColor="#FF9932" />
                      <stop offset="100%" stopColor="#040914" />
                    </radialGradient>
                  </defs>
                </g>

                {/* Destination Node 1: Slack */}
                <g 
                  onClick={() => handleNodeClick('slack')}
                  className="cursor-pointer group/node"
                  transform="translate(450, 100)"
                >
                  <circle r="20" fill="#040914" stroke="#FF9932" strokeWidth="2" />
                  <circle className="animate-ping" r="20" fill="none" stroke="#FF9932" stroke-width="1" opacity="0.15" style={{ animationDuration: '3s' }} />
                  <rect x="-7" y="-5" width="14" height="10" rx="1.5" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M-3 -1 h6 M-3 1 h3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <text y="34" textAnchor="middle" fill="#64748b" className="text-[10px] font-sans font-medium pointer-events-none select-none">Slack/Teams</text>
                </g>

                {/* Destination Node 2: Analytics API */}
                <g 
                  onClick={() => handleNodeClick('bi')}
                  className="cursor-pointer group/node"
                  transform="translate(450, 250)"
                >
                  <circle r="20" fill="#040914" stroke="#FF9932" strokeWidth="2" />
                  <circle className="animate-ping" r="20" fill="none" stroke="#FF9932" stroke-width="1" opacity="0.15" style={{ animationDuration: '3s' }} />
                  <path d="M-7 5 V-5 h3.5 V5 H-7 Z M-1.5 5 V-1.5 h3.5 V5 H-1.5 Z M4 5 V-3.5 h3.5 V5 H4 Z" fill="white" />
                  <text y="34" textAnchor="middle" fill="#64748b" className="text-[10px] font-sans font-medium pointer-events-none select-none">Analytics API</text>
                </g>
              </svg>

              {/* Status Alert Popup */}
              <div 
                className={`absolute bottom-6 right-6 flex items-center gap-3 bg-oceanic/95 border border-forsythia/30 rounded-xl px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.4)] max-w-[280px] pointer-events-none transition-all duration-500 ${
                  isAlertOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold font-mono">Trigger Success</span>
                  <span className="text-slate-400 text-[10px]">Payload routed in <strong className="text-forsythia">{latencyText}</strong></span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
