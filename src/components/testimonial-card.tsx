// import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  _imageSrc: string
  testimonial: string
}

export function TestimonialCard({ name, _imageSrc, testimonial }: TestimonialCardProps) {
  return (
    <div className="text-center sm:min-w-[25vw] min-w-[40vw]">
      <div className="flex justify-center mb-2">
        {/* <div className="w-12 h-12 bg-[#F0D0B5] rounded-full flex items-center justify-center">
          <Image src={imageSrc || "/placeholder.svg"} width={40} height={40} alt={name} className="rounded-full" />
        </div> */}
      </div>
      <h3 className="font-medium text-[#3A3A3A]">{name}</h3>
      <div className="flex justify-center my-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="h-4 w-4 fill-current text-orange-400" />
        ))}
      </div>
      <p className="text-sm text-[#5A5A5A]">&quot;{testimonial}&quot;</p>
    </div>
  )
}
