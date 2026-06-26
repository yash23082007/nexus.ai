import React from 'react';

export function Testimonials() {
  const testimonials = [
    {
      stars: 5,
      quote: "Before NEXUS.AI, our pipeline failures were a massive bottleneck. The automated self-healing triggers saved our engineering team 30+ hours every single week. We're fully automated now.",
      author: "Arjun Mehta",
      role: "Director of Platform, NovaTech",
      initials: "AM",
      bgClass: "bg-blue-500"
    },
    {
      stars: 5,
      quote: "We process over 4M API events every single day. NEXUS's sub-50ms processing speed is second to none, and our alerts route instantaneously into Slack. Absolutely flawless product.",
      author: "Sarah Wilson",
      role: "Head of Infrastructure, Octane",
      initials: "SW",
      bgClass: "bg-emerald-500"
    },
    {
      stars: 4,
      quote: "The currency-native pricing fits perfectly with our regional teams. Launching the SDK on our cloud took less than ten minutes. Highly recommend to any modern engineering team.",
      author: "Kabir Dev",
      role: "Technical Lead, Zenith.ai",
      initials: "KD",
      bgClass: "bg-purple-500"
    }
  ];

  return (
    <section id="testimonials" className="bg-arctic py-28 text-nocturnal relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold font-mono text-nocturnal uppercase tracking-widest bg-nocturnal/5 border border-nocturnal/10 rounded-full px-4 py-1.5 mb-4">
            Success Stories
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-[#0f172a] mb-4 tracking-tight">
            Loved by operations & engineering teams
          </h2>
          <p className="text-slate-600 font-sans text-base max-w-xl mx-auto leading-relaxed">
            See how companies use NEXUS.AI to power their day-to-day work.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {testimonials.map((test, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars rating */}
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4.5 h-4.5 ${i < test.stars ? 'fill-current' : 'stroke-current fill-none'}`} 
                      viewBox="0 0 24 24" 
                      strokeWidth="1.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                <blockquote className="font-sans text-sm font-medium italic text-slate-700 leading-relaxed mb-8">
                  "{test.quote}"
                </blockquote>
              </div>

              {/* Author meta row */}
              <div className="flex items-center gap-3 mt-auto">
                <div className={`w-10 h-10 rounded-full text-white font-mono text-sm font-bold flex items-center justify-center ${test.bgClass}`}>
                  {test.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0f172a]">{test.author}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{test.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <img src="/chevron-left.svg" alt="" aria-hidden="true" className="w-5 h-5 opacity-60" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
            Testimonials
          </span>
          <img src="/chevron-right.svg" alt="" aria-hidden="true" className="w-5 h-5 opacity-60" />
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
