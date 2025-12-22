'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface ToastContextType {
    message: string;
    visible: boolean;
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({
        message: '',
        visible: false,
    });

    const showToast = useCallback((message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ ...toast, showToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToastContext() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within ToastProvider');
    }
    return context;
}
