'use client';

import { useMemo } from 'react';
import { Toaster as ReactHotToast } from 'react-hot-toast';

export function Toaster() {
  const toastOptions = useMemo(() => ({
    duration: 4000,
    position: 'top-center',

    // Styling
    style: {},
    className: '',

    // Change colors of success/error/loading icon
    // iconTheme: {
    //   primary: '#000',
    //   secondary: '#fff',
    // },

    // Aria
    ariaProps: {
      'role': 'status',
      'aria-live': 'polite',
    },

    // Additional Configuration
    removeDelay: 1000,
  } as const), []);
  return (
    <ReactHotToast toastOptions={toastOptions} />
  );
}
