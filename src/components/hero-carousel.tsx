"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { playfairDisplay } from "@/app/layout"
import { lightenHexColor } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import Image from "next/image"
import Link from 'next/link';
import api from "@/lib/axios"


interface HeroBanner {
  title: string
  subtitle: string
  button_text: string
  image_url: string
}

interface Banner {
  id: string,
  title: string,
  subtitle: string,
  button_text: string,
  button_link: string,
  position: number,
  is_active: boolean,
  background_color: string,
  text_color: string,
  button_color: string,
  alignment: 'left' | 'center' | 'right',
  created_at: string,
  updated_at: string,
  image_public_id: string,
  image_url: string,
}

interface HeroCarouselProps {
  autoSlideInterval?: number
}

export function HeroCarousel({ autoSlideInterval = 5000 }: HeroCarouselProps) {
  
  const [banners, setBanners] = useState<Banner[]>([{}])
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }, [banners.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }, [banners.length])


  //Fetch Call
  useEffect(()=> {
    const fetchBanners = async () =>{
      try{
        const res = await api.get('api/admin/banners')

        if (res.status != 200){
          alert("Something went wrong!!")
        }

        setBanners(
          res.data.data
            .filter((banner: any) => banner.is_active)            // ✅ Only active banners
            .sort((a: any, b: any) => a.position - b.position)    // ✅ Sort by position (duplicates allowed)
        );
        
        console.log("Banners:",res)
      }
      catch(e){
        console.log("Errors fetching banners in client side home page::", e)
      }
    } 

    fetchBanners()
  },[])


  //Slide Call
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [nextSlide, autoSlideInterval])



  return (
    <div className="relative overflow-hidden rounded-lg shadow-md mx-4">
      <div
        className="flex transition-transform duration-800 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className={`w-full shrink-0 h-[80vh]`} style={{backgroundColor:banner.background_color}}>
            <div className={`container mx-auto px-4 flex flex-col ${banner.alignment == "left"?"md:flex-row":"md:flex-row-reverse"} items-center`}>
              <div className={`md:w-1/2 space-y-6 z-10 ${banner.alignment == "left"?"":"md:pl-28"}`}>
                <h1 className={`text-3xl md:text-6xl lg:text-7xl font-playfair-display`} style={{color:banner.text_color}}>{banner.title}</h1>
                <p className="text-lg" style={{color:banner.text_color}}>{banner.subtitle}</p>

                <Link href={`${banner.button_link}`}>
                  <Button
                    className="rounded px-6 py-2 text-white transition-colors duration-300"
                    style={{
                      backgroundColor: banner.button_color,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = lightenHexColor(banner.button_color, 0.15);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = banner.button_color;
                    }}
                  >
                    {banner.button_text}
                  </Button>
                </Link>

              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <Image
                  src={banner.image_url || "/placeholder.svg"}
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
