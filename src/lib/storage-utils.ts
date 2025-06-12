/**
 * Gets an item from localStorage with expiration support
 * @param key - The key to get
 * @returns The stored value or null if expired/not found
 */
export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    if (!item) return null

    const { value, expiry } = JSON.parse(item)

    // Check if the item has expired
    if (expiry && new Date().getTime() > expiry) {
      localStorage.removeItem(key)
      return null
    }

    return value as T
  } catch (error) {
    console.error("Error getting item from localStorage:", error)
    return null
  }
}

/**
 * Sets an item in localStorage with optional expiration
 * @param key - The key to set
 * @param value - The value to store
 * @param expiryInMinutes - Optional expiration time in minutes
 */
export function setLocalStorageItem<T>(key: string, value: T, expiryInMinutes?: number): void {
  try {
    const item = {
      value,
      expiry: expiryInMinutes ? new Date().getTime() + expiryInMinutes * 60 * 1000 : null,
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.error("Error setting item in localStorage:", error)
  }
}

/**
 * Removes an item from localStorage
 * @param key - The key to remove
 */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error("Error removing item from localStorage:", error)
  }
}

/**
 * Gets an item from sessionStorage
 * @param key - The key to get
 * @returns The stored value or null if not found
 */
export function getSessionStorageItem<T>(key: string): T | null {
  try {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error("Error getting item from sessionStorage:", error)
    return null
  }
}

/**
 * Sets an item in sessionStorage
 * @param key - The key to set
 * @param value - The value to store
 */
export function setSessionStorageItem<T>(key: string, value: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error setting item in sessionStorage:", error)
  }
}

/**
 * Removes an item from sessionStorage
 * @param key - The key to remove
 */
export function removeSessionStorageItem(key: string): void {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error("Error removing item from sessionStorage:", error)
  }
}

/**
 * Clears all items from localStorage and sessionStorage
 */
export function clearAllStorage(): void {
  try {
    localStorage.clear()
    sessionStorage.clear()
  } catch (error) {
    console.error("Error clearing storage:", error)
  }
}
