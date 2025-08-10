import Link from "next/link"
import Image from "next/image"

export function CategoryShowcase(category:{category:string}) {
  const categories = [
    {
      name: "Lehenga",
      slug: "lehenga",
      imageSrc: "/placeholder.svg?height=300&width=240",
      href: "/category/lehenga",
    },
    {
      name: "Suit",
      slug: "suit",
      imageSrc: "/placeholder.svg?height=300&width=240",
      href: "/category/suit",
    },
    {
      name: "Jumpsuit",
      slug:"jumpsuit",
      imageSrc: "/placeholder.svg?height=300&width=240",
      href: "/category/jumpsuit",
    },
    {
      name: "Short Dress",
      slug: "short-dress",
      imageSrc: "/placeholder.svg?height=300&width=240",
      href: "/category/short-dress",
    },
    {
      name: "Long Dress",
      slug: "long-dress",
      imageSrc: "/placeholder.svg?height=300&width=240",
      href: "/category/long-dress",
    },
  ]
  
  const filteredCategorires = categories.filter((cat) => cat.slug !==category.category)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      
      {filteredCategorires.map((category) => (
        <Link key={category.name} href={category.href} className="group">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative h-80 overflow-hidden">
              <Image
                src={category.imageSrc || "/placeholder.svg"}
                fill
                alt={category.name}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium text-[#3A3A3A]">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
