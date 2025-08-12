"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col order-2 lg:order-1 gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px]">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative w-20 h-20 border-2 ${
              selectedImage === index ? "border-[#8B4513]" : "border-transparent"
            } rounded overflow-hidden shrink-0`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              fill
              alt={`Product thumbnail ${index + 1}`}
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative h-158 lg:h-210 w-full order-1 lg:order-2">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          fill
          alt="Product main image"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  )
}
