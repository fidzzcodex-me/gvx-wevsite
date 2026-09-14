"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: "8px",
          fontSize: "14px",
          fontFamily: "var(--font-jakarta)",
        },
      }}
    />
  )
}
