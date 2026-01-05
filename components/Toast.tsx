'use client'

import { useState, useEffect } from 'react'

export default function Toast() {
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleShowToast = (e: CustomEvent<string>) => {
      setMessage(e.detail)
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    }

    window.addEventListener('showToast', handleShowToast as EventListener)
    return () => {
      window.removeEventListener('showToast', handleShowToast as EventListener)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      id="toast"
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-royal-700 text-white px-6 py-3 rounded-md shadow-lg z-[80] flex items-center gap-3 w-max max-w-[90%] border border-gold-500/50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <i className="fa-solid fa-circle-check text-gold-500"></i>
      <span id="toast-message" className="text-sm">{message}</span>
    </div>
  )
}

// Helper function to show toast from anywhere
export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent('showToast', { detail: message }))
}

