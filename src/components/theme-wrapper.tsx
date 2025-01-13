'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function ThemeWrapper({ children, ...props }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main data-theme={resolvedTheme} {...props}>
      {children}
    </main>
  );
}

export default ThemeWrapper;
