'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface WhatsAppContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
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
    <WhatsAppContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsAppContext() {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error('useWhatsAppContext must be used within WhatsAppProvider');
  }
  return context;
}

