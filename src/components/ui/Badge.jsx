import React from 'react';

export function Badge({ children, className = '', ...props }) {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-sans tracking-wide bg-forsythia-10 text-forsythia border border-forsythia/20 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
