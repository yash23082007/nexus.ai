import React, { useState, useEffect } from 'react';
import useIntersection from '../../hooks/useIntersection';

// Helper component for count-up numbers on scroll trigger
const MetricCounter = ({ target, decimals = 0, suffix = '', prefix = '', trigger }) => {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      setCurrentVal(easeProgress * target);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentVal(target);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, target]);

  // Handle local string representations
  const displayVal = currentVal.toFixed(decimals);
  const formatted = target >= 1000 && decimals === 0
    ? Math.floor(currentVal).toLocaleString()
    : parseFloat(displayVal).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

  return (
    <span className="font-mono text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
      {prefix}{formatted}{suffix}
    </span>
  );
};

export function Metrics() {
  const [hasIntersected, setHasIntersected] = useState(false);
  
  // Connect to custom scroll observer hook using callback registration
  const sectionRef = useIntersection(() => {
    setHasIntersected(true);
  }, { threshold: 0.15 });

  return (
    <section 
      ref={sectionRef}
      id="metrics" 
      aria-labelledby="metrics-heading"
      className="bg-oceanic border-y border-white/5 py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-forsythia/5 blur-[120px] pointer-events-none" />

      <h2 id="metrics-heading" className="sr-only">Platform metrics</h2>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <dl aria-label="Performance statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          
          {/* Stat card 1 */}
          <div className="flex flex-col items-center">
            <dd className="h-20 flex items-center justify-center">
              <MetricCounter 
                target={10000000} 
                suffix="M+" 
                trigger={hasIntersected} 
              />
            </dd>
            <dt className="font-mono text-sm font-bold text-forsythia uppercase tracking-wider mb-2 mt-4">
              Tasks/day
            </dt>
            <p className="text-slate-400 text-xs font-sans max-w-[220px]">
              Over 10 Million workflows connected globally without a single failure.
            </p>
          </div>

          {/* Stat card 2 */}
          <div className="flex flex-col items-center">
            <dd className="h-20 flex items-center justify-center">
              <MetricCounter 
                target={99.9} 
                decimals={1} 
                suffix="%" 
                trigger={hasIntersected} 
              />
            </dd>
            <dt className="font-mono text-sm font-bold text-forsythia uppercase tracking-wider mb-2 mt-4">
              Uptime SLA
            </dt>
            <p className="text-slate-400 text-xs font-sans max-w-[220px]">
              Enterprise cloud architecture spread across multi-region edge networks.
            </p>
          </div>

          {/* Stat card 3 */}
          <div className="flex flex-col items-center">
            <dd className="h-20 flex items-center justify-center">
              <MetricCounter 
                target={50} 
                prefix="<" 
                suffix="ms" 
                trigger={hasIntersected} 
              />
            </dd>
            <dt className="font-mono text-sm font-bold text-forsythia uppercase tracking-wider mb-2 mt-4">
              Execution Latency
            </dt>
            <p className="text-slate-400 text-xs font-sans max-w-[220px]">
              Sub-50 millisecond data propagation and action execution times.
            </p>
          </div>

          {/* Stat card 4 */}
          <div className="flex flex-col items-center">
            <dd className="h-20 flex items-center justify-center">
              <MetricCounter 
                target={2400} 
                suffix="+" 
                trigger={hasIntersected} 
              />
            </dd>
            <dt className="font-mono text-sm font-bold text-forsythia uppercase tracking-wider mb-2 mt-4">
              Integrations
            </dt>
            <p className="text-slate-400 text-xs font-sans max-w-[220px]">
              Connect with every API ecosystem natively from Slack to Snowflake.
            </p>
          </div>

        </dl>
      </div>
    </section>
  );
}

export default Metrics;
