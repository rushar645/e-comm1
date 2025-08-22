import Link from "next/link"
import Image from "next/image"

import jumpsuit from "@/images/category/Jumpsuit.png"
import lehenga from "@/images/category/Lehenga.jpeg"
import longdress from "@/images/category/Longdress.jpeg"
import shortdress from "@/images/category/Shortdress.jpeg"
import suit from "@/images/category/Suit.png"

export function CategoryShowcase(category:{category:string}) {
  const categories = [
    {
      name: "Lehenga",
      slug: "lehenga",
      imageSrc: lehenga,
      href: "/category/lehenga",
    },
    {
      name: "Suit",
      slug: "suit",
      imageSrc: suit,
      href: "/category/suit",
    },
    {
      name: "Jumpsuit",
      slug:"jumpsuit",
      imageSrc: jumpsuit,
      href: "/category/jumpsuit",
    },
    {
      name: "Short Dress",
      slug: "short-dress",
      imageSrc: shortdress,
      href: "/category/short-dress",
    },
    {
      name: "Long Dress",
      slug: "long-dress",
      imageSrc: longdress,
      href: "/category/long-dress",
    },
  ]
  
  const filteredCategorires = categories.filter((cat) => cat.slug !==category.category)
  return (
    <div className="flex overflow-x-scroll gap-6 py-5 px-5 scrollbar-hide">
      
      {filteredCategorires.map((category) => (
        <Link key={category.name} href={category.href} className="group">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="z-1 relative aspect-[4/5] h-[22vw] min-h-[300px] overflow-hidden transition-transform duration-100 group-hover:scale-110 ">
              <Image
                src={category.imageSrc || "/placeholder.svg"}
                // width={280}
                // height={20}
                fill
                alt={category.name}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>
            <div className="p-4 text-center z-20">
              <h3 className="text-lg font-medium text-[#3A3A3A]">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
