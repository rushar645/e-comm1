"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { playfairDisplay } from "@/app/layout"

interface HeroBanner {
  title: string
  subtitle: string
  buttonText: string
  imageSrc: string
}

interface HeroCarouselProps {
  banners: HeroBanner[]
  autoSlideInterval?: number
}

export function HeroCarousel({ banners, autoSlideInterval = 5000 }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }, [banners.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }, [banners.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [nextSlide, autoSlideInterval])

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md mx-4">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="w-full shrink-0 bg-[#FFF2E6] h-[80vh]">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 space-y-6 z-10">
                <h1 className={`text-3xl md:text-6xl lg:text-7xl font-playfair-display text-[#3A3A3A]`}>{banner.title}</h1>
                <p className="text-[#5A5A5A] text-lg">{banner.subtitle}</p>
                <Button className="bg-[#3A2723] hover:bg-[#5A3A33] text-white rounded px-6 py-2">
                  {banner.buttonText}
                </Button>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <Image
                  src={banner.imageSrc || "/placeholder.svg"}
                  width={441.5}
                  height={450}
                  alt="Hero banner"
                  className="w-full h-auto"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-[#3A3A3A]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-[#3A3A3A]" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full ${currentSlide === index ? "bg-[#8B4513]" : "bg-[#D0B090]"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
