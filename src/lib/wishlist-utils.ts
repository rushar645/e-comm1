import { getLocalStorageItem, setLocalStorageItem } from "@/lib/storage-utils"

export interface WishlistItem {
  id: string | number
  name: string
  price: number
  imageSrc: string
  category?: string
}

const WISHLIST_STORAGE_KEY = "dress-dexterity-wishlist"

/**
 * Gets the current wishlist from localStorage
 * @returns The current wishlist
 */
export function getWishlist(): WishlistItem[] {
  return getLocalStorageItem<WishlistItem[]>(WISHLIST_STORAGE_KEY) || []
}

/**
 * Saves the wishlist to localStorage
 * @param wishlist - The wishlist to save
 */
export function saveWishlist(wishlist: WishlistItem[]): void {
  setLocalStorageItem(WISHLIST_STORAGE_KEY, wishlist)
}

/**
 * Adds an item to the wishlist
 * @param item - The item to add
 * @returns The updated wishlist
 */
export function addToWishlist(item: WishlistItem): WishlistItem[] {
  const wishlist = getWishlist()
  const existingItem = wishlist.find((i) => i.id === item.id)

  if (!existingItem) {
    const updatedWishlist = [...wishlist, item]
    saveWishlist(updatedWishlist)
    return updatedWishlist
  }

  return wishlist
}

/**
 * Removes an item from the wishlist
 * @param itemId - The ID of the item to remove
 * @returns The updated wishlist
 */
export function removeFromWishlist(itemId: string | number): WishlistItem[] {
  const wishlist = getWishlist()
  const updatedWishlist = wishlist.filter((item) => item.id !== itemId)

  saveWishlist(updatedWishlist)
  return updatedWishlist
}

/**
 * Checks if an item is in the wishlist
 * @param itemId - The ID of the item to check
 * @returns Boolean indicating if the item is in the wishlist
 */
export function isInWishlist(itemId: string | number): boolean {
  const wishlist = getWishlist()
  return wishlist.some((item) => item.id === itemId)
}

/**
 * Clears the entire wishlist
 * @returns Empty wishlist
 */
export function clearWishlist(): WishlistItem[] {
  const emptyWishlist: WishlistItem[] = []
  saveWishlist(emptyWishlist)
  return emptyWishlist
}

/**
 * Gets the total number of items in the wishlist
 * @returns Total item count
 */
export function getWishlistItemCount(): number {
  const wishlist = getWishlist()
  return wishlist.length
}
