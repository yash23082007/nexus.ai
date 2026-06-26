import React, { useState } from 'react';

export function BillingToggle({ onToggle }) {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    onToggle(newValue ? 'annual' : 'monthly');
  };

  return (
    <div 
      role="group" 
      aria-label="Billing cycle"
      className="flex items-center gap-3 bg-oceanic/40 border border-white/5 px-4 py-2 rounded-full font-sans text-sm font-semibold"
    >
      <span 
        aria-hidden={isAnnual}
        onClick={() => isAnnual && handleToggle()}
        className={`cursor-pointer transition-colors ${!isAnnual ? 'text-white' : 'text-slate-400 hover:text-white'}`}
      >
        Monthly
      </span>

      <button
        role="switch"
        aria-checked={isAnnual}
        aria-label={`Switch to ${isAnnual ? 'monthly' : 'annual'} billing`}
        onClick={handleToggle}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none ${
          isAnnual ? 'bg-forsythia' : 'bg-slate-700'
        }`}
      >
        <span 
          className={`block w-5 h-5 rounded-full bg-oceanic shadow-md transform transition-transform ${
            isAnnual ? 'translate-x-5' : 'translate-x-0'
          }`} 
        />
      </button>

      <span 
        aria-hidden={!isAnnual}
        onClick={() => !isAnnual && handleToggle()}
        className={`cursor-pointer transition-colors flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-slate-400 hover:text-white'}`}
      >
        Annual
        <mark 
          aria-label="Save 20 percent"
          className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
        >
          Save 20%
        </mark>
      </span>
    </div>
  );
}

export default BillingToggle;
