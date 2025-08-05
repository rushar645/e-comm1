"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, User, X, ShoppingCart, Menu, LogIn, UserPlus, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'
import logo from "@/images/logo.png"

import { useUser } from "@/contexts/user-contexts"

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { getItemCount} = useCart()
  const [cartItemCount, setCartItemCount] = useState(0)
  const { itemCount: wishlistItemCount } = useWishlist()
  const pathname = usePathname();

  const isAdminPage = pathname === '/admin';
  const isLoginPage = pathname ==='/login'
  const isSignupPage = pathname ==='/singup'
  const {user, setUser} = useUser();

  useEffect(()=>{
    const items = getItemCount;
    setCartItemCount(items)
  },[])


  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  const categories = [
    { name: "Lehenga", href: "/category/lehenga" },
    { name: "Suit", href: "/category/suit" },
    { name: "Jumpsuit", href: "/category/jumpsuit" },
    { name: "Long Dress", href: "/category/long-dress" },
    { name: "Short Dress", href: "/category/short-dress" },
  ]

  if (isAdminPage || isLoginPage || isSignupPage) {
    return <></>
  }
  else
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-background shadow-sm">
      <div className="container mx-auto py-3 px-4">
        {showSearch ? (
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search for products..."
              className="flex-1"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {/* <Profile/> */}
            <button
              onClick={handleSearch}
              className="ml-2 p-2 text-[#3A3A3A] hover:text-[#D35400]"
              aria-label="Submit search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setShowSearch(false)
                setSearchQuery("")
              }}
              className="ml-2 p-2"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-[#3A3A3A]" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-between space-x-4 md:space-x-8">
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src={logo}
                    width={100}
                    height={90}
                    alt="Dress Dexterity Logo"
                    priority
                    className="h-16 w-auto pl-6"
                  />
                </Link>
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex space-x-12">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="text-[#3A3A3A] hover:text-[#8B4513] text-md transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              

              <div className="flex items-center space-x-3 md:space-x-6">
                <button
                  aria-label="Search"
                  onClick={() => setShowSearch(true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search className="h-5 w-5 text-[#3A3A3A]" />
                </button>

                {/* User Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label="Account"
                      className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <User className="h-5 w-5 text-[#3A3A3A]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={"bg-white"}>
                    <DropdownMenuItem asChild>
                      {user && <Link href="/account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      {!user && <Link href="/login" className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      {!user && <Link href="/signup" className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Link>}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {user && <button className='flex items-center cursor-pointer text-red-600' onClick={()=>setUser(null)}>
                        <LogOut className="mr-4 h-4 w-4"/>
                        Log out
                      </button>}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart className="h-5 w-5 text-[#3A3A3A]" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#D35400] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 text-[#3A3A3A]" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#D35400] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5 text-[#3A3A3A]" />
                </button>

              </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
                <nav className="flex flex-col space-y-3 pt-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="text-[#3A3A3A] hover:text-[#8B4513] text-sm py-2 px-2 rounded transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/account"
                    className="sm:hidden text-[#3A3A3A] hover:text-[#8B4513] text-sm py-2 px-2 rounded transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/auth/login"
                    className="sm:hidden text-[#3A3A3A] hover:text-[#8B4513] text-sm py-2 px-2 rounded transition-colors flex items-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="sm:hidden text-[#3A3A3A] hover:text-[#8B4513] text-sm py-2 px-2 rounded transition-colors flex items-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                  <div className="sm:hidden pt-2">
                    <ThemeToggle />
                  </div>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}
