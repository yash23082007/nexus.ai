import React from 'react';

export function TrustBar() {
  const teams = [
    { name: 'NovaTech', icon: '✦' },
    { name: 'Vercel.io', icon: '▲' },
    { name: 'Octane', icon: '❖' },
    { name: 'StackCorp', icon: '■' },
    { name: 'Zenith.ai', icon: '●' },
    { name: 'HyperFlow', icon: '◆' },
    { name: 'Aether', icon: '▲' },
    { name: 'QuantCo', icon: '✦' }
  ];

  return (
    <section className="bg-mint border-y border-nocturnal/10 py-8 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <h3 className="font-mono text-xs font-bold text-nocturnal uppercase tracking-widest text-center">
          Trusted by 2,000+ teams at
        </h3>
        
        {/* Scrolling marquee using infinite marquee class */}
        <div className="w-full relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {/* Double content list to support loop */}
          <div className="animate-marquee flex gap-20 py-2">
            {teams.map((team, index) => (
              <div key={index} className="flex items-center gap-2 text-nocturnal/80 font-mono text-lg font-bold">
                <span className="text-saffron text-base">{team.icon}</span>
                <span>{team.name}</span>
              </div>
            ))}
          </div>

          <div className="animate-marquee flex gap-20 py-2" aria-hidden="true">
            {teams.map((team, index) => (
              <div key={`dup-${index}`} className="flex items-center gap-2 text-nocturnal/80 font-mono text-lg font-bold">
                <span className="text-saffron text-base">{team.icon}</span>
                <span>{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
