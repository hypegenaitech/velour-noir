'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <div
      className="transition-opacity duration-400"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 350ms ease' }}
    >
      {children}
    </div>
  );
}
