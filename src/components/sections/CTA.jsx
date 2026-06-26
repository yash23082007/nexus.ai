import React from 'react';

export function CTA() {
  return (
    <section className="bg-saffron-gradient py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-white/20 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-mono text-4xl sm:text-5xl font-extrabold text-oceanic tracking-tight mb-4">
          Ready to automate your future?
        </h2>
        <p className="text-oceanic/80 text-lg font-sans font-medium max-w-xl mx-auto mb-10 leading-relaxed">
          Join 2,000+ teams connecting their operations with NEXUS.AI. No credit card required.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a 
            href="#pricing" 
            className="btn bg-oceanic text-white font-bold text-base px-8 py-3.5 rounded-xl hover:bg-oceanic/90 hover:shadow-[0_12px_24px_rgba(23,43,54,0.3)] hover:-translate-y-0.5"
          >
            Start Free Trial
          </a>
          <a 
            href="#pricing" 
            className="btn border border-oceanic/30 text-oceanic font-bold text-base px-8 py-3.5 rounded-xl hover:bg-oceanic/5 hover:-translate-y-0.5"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
