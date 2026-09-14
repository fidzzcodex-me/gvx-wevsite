import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function relativeTime(input: string | number) {
  const date = typeof input === "number" ? new Date(input) : new Date(input)
  return formatDistanceToNow(date, { addSuffix: true })
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + "\u2026"
}

export function base64Encode(content: string) {
  if (typeof window === "undefined") return Buffer.from(content).toString("base64")
  return window.btoa(unescape(encodeURIComponent(content)))
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(",")[1]
      resolve(base64)
    }
    reader.onerror = () => reject(new Error("Gagal membaca file"))
    reader.readAsDataURL(file)
  })
}
