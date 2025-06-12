import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 * @param inputs - Class names to combine
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price value to a currency string
 * @param price - The price value to format
 * @param currency - The currency code (default: USD)
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency = "INR", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price)
}

/**
 * Formats a date to a localized string
 * @param date - The date to format
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = "en-US") {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str - The string to truncate
 * @param length - Maximum length before truncation (default: 50)
 * @returns Truncated string
 */
export function truncateString(str: string, length = 50) {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

/**
 * Generates a random ID
 * @param length - Length of the ID (default: 8)
 * @returns Random ID string
 */
export function generateId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

/**
 * Debounces a function call
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay = 300) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * Checks if an object is empty
 * @param obj - The object to check
 * @returns Boolean indicating if the object is empty
 */
export function isEmptyObject(obj: Record<string, unknown>) {
  return Object.keys(obj).length === 0
}

/**
 * Gets a nested value from an object using a path string
 * @param obj - The object to get the value from
 * @param path - The path to the value (e.g., "user.address.city")
 * @param defaultValue - Default value if the path doesn't exist
 * @returns The value at the path or the default value
 */
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

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export function capitalizeFirstLetter(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formats a slug to a readable title
 * @param slug - The slug to format (e.g., "product-name")
 * @returns Formatted title (e.g., "Product Name")
 */
export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ")
}

/**
 * Type-safe localStorage wrapper
 */
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

/**
 * Type-safe event emitter
 */
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
