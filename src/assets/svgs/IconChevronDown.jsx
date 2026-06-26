import React from 'react';

export function IconChevronDown({ className = 'w-6 h-6', ...props }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

export default IconChevronDown;
