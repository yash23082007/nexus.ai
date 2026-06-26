import React, { useState, useEffect, useRef } from 'react';
import IconChevronDown from '../../assets/svgs/IconChevronDown';

const CURRENCIES = [
  { code: 'INR', label: '₹ INR — Indian Rupee', flag: '🇮🇳' },
  { code: 'USD', label: '$ USD — US Dollar',    flag: '🇺🇸' },
  { code: 'EUR', label: '€ EUR — Euro',          flag: '🇪🇺' },
];

export function CurrencySelector({ onSelect }) {
  const [selected, setSelected] = useState('INR');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (code) => {
    setSelected(code);
    setOpen(false);
    onSelect(code); // Triggers parent's updateAllPrices — no re-render
  };

  // Close selector list on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label="Select currency"
      className="relative"
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Current currency: ${selected}. Click to change.`}
        className="flex items-center gap-2 bg-oceanic/40 border border-white/5 px-4 py-2 rounded-full text-white font-semibold text-sm hover:border-white/10 transition-colors"
      >
        <span>{CURRENCIES.find(c => c.code === selected)?.flag}</span>
        <span>{selected}</span>
        <IconChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
      </button>

      {open && (
        <ul 
          role="listbox" 
          aria-label="Available currencies"
          className="absolute right-0 mt-2 bg-oceanic border border-white/5 rounded-xl w-56 shadow-2xl py-1 z-50 animate-fade-in"
        >
          {CURRENCIES.map(c => (
            <li
              key={c.code}
              role="option"
              aria-selected={c.code === selected}
              onClick={() => handleSelect(c.code)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                c.code === selected 
                  ? 'bg-forsythia/10 text-forsythia' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-base">{c.flag}</span>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrencySelector;
