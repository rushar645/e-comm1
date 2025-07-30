import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price)
}

export function formatDate(date: Date | string, locale = "en-US") {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function truncateString(str: string, length = 50) {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

export function generateId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay = 300) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

export function isEmptyObject(obj: Record<string, unknown>) {
  return Object.keys(obj).length === 0
}

export function getNestedValue<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T,
): T | undefined {
  const keys = path.split(".")
  let result: unknown = obj

  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue
    }
    result = (result as Record<string, unknown>)[key]
  }

  return result === undefined ? defaultValue : (result as T)
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ")
}

export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage errors silently
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // Handle storage errors silently
    }
  },
}

export class TypedEventEmitter<T extends Record<string, unknown[]>> {
  private listeners: Partial<{
    [K in keyof T]: Array<(...args: T[K]) => void>
  }> = {}

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(listener)
  }

  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this.listeners[event]) return
    const index = this.listeners[event]!.indexOf(listener)
    if (index > -1) {
      this.listeners[event]!.splice(index, 1)
    }
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    if (!this.listeners[event]) return
    this.listeners[event]!.forEach((listener) => listener(...args))
  }
}

export function lightenHexColor(hex: string, percent: number): string {
  const cleanHex = hex.replace("#", "");

  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) + Math.round(255 * percent);
  const g = ((num >> 8) & 0x00ff) + Math.round(255 * percent);
  const b = (num & 0x0000ff) + Math.round(255 * percent);

  const newR = Math.min(255, r);
  const newG = Math.min(255, g);
  const newB = Math.min(255, b);

  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB)
    .toString(16)
    .slice(1)}`;
}
