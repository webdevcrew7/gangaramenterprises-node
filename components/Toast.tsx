'use client';

import { useToastContext } from './ToastProvider';

export default function Toast() {
  const { message, visible } = useToastContext();

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-md shadow-lg z-[80] flex items-center gap-3 w-max max-w-[90%] border border-gold-500/50 transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
    >
      <i className="fa-solid fa-circle-check text-gold-500"></i>
      <span className="text-sm">{message}</span>
    </div>
  );
}
