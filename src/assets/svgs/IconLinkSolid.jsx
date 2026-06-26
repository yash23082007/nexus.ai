import React from 'react';

export function IconLinkSolid({ className = 'w-6 h-6', ...props }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className} 
      {...props}
    >
      <path d="M19.9 5.8a4.5 4.5 0 0 0-6.3 0L12 7.3a1 1 0 1 0 1.4 1.4l1.6-1.5a2.5 2.5 0 1 1 3.5 3.5l-2.9 2.9a2.5 2.5 0 0 1-3.5 0 1 1 0 0 0-1.4 1.4 4.5 4.5 0 0 0 6.3 0l2.9-2.9a4.5 4.5 0 0 0 0-6.3z"/>
      <path d="M8.5 13.9l-1.6 1.6a2.5 2.5 0 1 1-3.5-3.5l2.9-2.9a2.5 2.5 0 0 1 3.5 0 1 1 0 0 0 1.4-1.4 4.5 4.5 0 0 0-6.3 0l-2.9 2.9a4.5 4.5 0 0 0 0 6.3 4.5 4.5 0 0 0 6.3 0l1.6-1.6a1 1 0 1 0-1.4-1.4z"/>
    </svg>
  );
}

export default IconLinkSolid;
