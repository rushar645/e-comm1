"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col order-2 md:order-1 gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px]">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative w-20 h-20 border-2 ${
              selectedImage === index + 1 ? "border-[#8B4513]" : "border-transparent"
            } rounded overflow-hidden shrink-0`}
            onClick={() => setSelectedImage(index + 1)}
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
      <div className="relative h-[500px] w-full order-1 md:order-2">
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
