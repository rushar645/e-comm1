"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Product } from "@/types"


interface Carousel3DProps {
  products: Product[]
  autoRotate?: boolean
  autoRotateInterval?: number
}

export function Carousel3D({ products, autoRotate = true, autoRotateInterval = 3000 }: Carousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) setScreenSize("mobile")
      else if (window.innerWidth < 1024) setScreenSize("tablet")
      else setScreenSize("desktop")
    }
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])


  const totalItems = products.length

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalItems)
  }, [totalItems])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }, [totalItems])

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      goToNext()
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotate, autoRotateInterval, goToNext])

  // Calculate position and styles for each item
  const getItemStyles = (index: number) => {
    if (screenSize === "mobile") {
      return {
        zIndex: index === activeIndex ? 10 : 5,
        opacity: index === activeIndex ? 1 : 0.7,
        transform: `translateX(${(index - activeIndex) * 100}%)`,
      }
    }

    // Tweak values for tablet vs desktop
    const spacing = screenSize === "tablet" ? 180 : 250
    const depth = screenSize === "tablet" ? 100 : 150
    const angle = screenSize === "tablet" ? 30 : 45
    const scaleFactor = screenSize === "tablet" ? 0.15 : 0.2

    const totalVisible = Math.min(5, totalItems)
    const middleIndex = Math.floor(totalVisible / 2)

    let position = index - activeIndex
    if (position < -middleIndex) position += totalItems
    if (position > middleIndex) position -= totalItems

    if (Math.abs(position) > middleIndex) {
      return { display: "none" }
    }

    const translateZ = -Math.abs(position) * depth
    const translateX = position * spacing
    const rotateY = position * angle
    const scale = 1 - Math.abs(position) * scaleFactor
    const opacity = 1 - Math.abs(position) * 0.3
    const zIndex = middleIndex - Math.abs(position)

    return {
      zIndex,
      opacity,
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    }
  }


  return (
    <div className="relative pt-16">
      {/* 3D Carousel Container */}
      <div
        className="carousel-3d-container"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center",
          height: screenSize=="mobile" ? "400px" : "500px",
        }}
      >
        <div
          className="carousel-3d-wrapper"
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="transition-all duration-500 ease-in-out absolute"
              style={{
                width: "240px",
                padding: screenSize == "mobile" ? "15px" : "0px",
                cursor: index !== activeIndex ? "pointer" : "default",
                ...getItemStyles(index),
              }}
              onClick={() => index !== activeIndex && goToSlide(index)}
              role={index !== activeIndex ? "button" : undefined}
              aria-label={index !== activeIndex ? `View ${product.name}` : undefined}
            >
              <div
                className={`${index === activeIndex ? "shadow-xl ring-2 ring-[#D0B090]" : "shadow-md"} rounded-lg overflow-hidden`}
              >
                <ProductCard
                  id={product.id}
                  imageSrc={product.images[0]}
                  name={product.name}
                  price={product.price}
                  numericPrice={product.price}
                  highlighted={index === activeIndex}
                  showRating={index === activeIndex}
                  category={product.category || getCategoryFromName(product.name)}
                  sku={product.sku}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
        aria-label="Previous product"
      >
        <ChevronLeft className="h-6 w-6 text-[#3f3e3e]" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
        aria-label="Next product"
      >
        <ChevronRight className="h-6 w-6 text-[#3A3A3A]" />
      </button>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? "bg-[#9B7A6A]" : "bg-[#D0B090]"
              }`}
            aria-label={`Go to product ${index + 1}`}
            aria-current={index === activeIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}

// Helper function to determine category from product name
function getCategoryFromName(name: string): string {
  const nameLower = name.toLowerCase()
  if (nameLower.includes("lehenga")) return "lehenga"
  if (nameLower.includes("suit")) return "suit"
  if (nameLower.includes("jumpsuit")) return "jumpsuit"
  if (nameLower.includes("long dress")) return "long-dress"
  if (nameLower.includes("short dress")) return "short-dress"
  return "all"
}
