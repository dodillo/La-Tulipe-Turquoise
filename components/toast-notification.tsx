"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  const addToast = (props: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])

    if (props.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, props.duration || 3000)
    }
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}

export function Toast({ message, type = "info", onRemove }: ToastProps & { onRemove: () => void }) {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-destructive",
    info: "bg-primary",
  }[type]

  return (
    <motion.div
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3`}
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {type === "success" && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      )}
      <span>{message}</span>
    </motion.div>
  )
}
