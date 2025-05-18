
"use client";

import { useEffect } from 'react';

export default function ClientLayoutEffects() {
  useEffect(() => {
    // BFCache Debugging
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log('This page was restored from the bfcache.');
      } else {
        console.log('This page was not restored from the bfcache.');
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return null; // This component does not render anything visible
}
