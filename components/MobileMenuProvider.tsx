'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface MobileMenuContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <MobileMenuContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenuContext() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenuContext must be used within MobileMenuProvider');
  }
  return context;
}

