import React from 'react';

export function IconChevronUpSolid({ className = 'w-6 h-6', ...props }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className} 
      {...props}
    >
      <path d="M12 8.293l-6 6a1 1 0 001.414 1.414L12 11.121l4.586 4.586a1 1 0 001.414-1.414l-6-6a1 1 0 00-1.414 0z"/>
    </svg>
  );
}

export default IconChevronUpSolid;
