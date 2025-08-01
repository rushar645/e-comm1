import Image from "next/image"
import { HeroCarousel } from "@/components/hero-carousel"
import { Carousel3D } from "@/components/carousel-3d"
import { ScrollableProductSection } from "@/components/scrollable-product-section"
import { TestimonialCard } from "@/components/testimonial-card"
import { ContactForm } from "@/components/contact-form"


import img1 from "@/images/homepage/1.png"
import img2 from "@/images/homepage/2.png"
import img3 from "@/images/homepage/3.png"
import img4 from "@/images/homepage/4.png"
import HomePageProducts from "@/components/homepage-products"

export const dynamic = "force-dynamic" // Using the new dynamic directive for fresh data

// Sample new arrivals data
const newArrivals = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: "$89.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    price: "$129.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "long-dress",
  },
  {
    id: 3,
    name: "Casual Denim Jumpsuit",
    price: "$79.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "jumpsuit",
  },
  {
    id: 4,
    name: "Bohemian Maxi Dress",
    price: "$99.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "long-dress",
  },
  {
    id: 5,
    name: "Classic Black Dress",
    price: "$69.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
  },
  {
    id: 6,
    name: "Printed Wrap Dress",
    price: "$59.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
  },
  {
    id: 7,
    name: "Linen Summer Suit",
    price: "$149.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "suit",
  },
]

// Sample category products data
const lehengaProducts = [1, 2, 3, 4, 5, 6].map((id) => ({
  id,
  name: "Lehenga Product",
  price: "$199.99",
  imageSrc: "/placeholder.svg?height=300&width=240",
  category: "lehenga",
}))

const suitProducts = [1, 2, 3, 4, 5, 6].map((id) => ({
  id,
  name: "Suit Product",
  price: "$149.99",
  imageSrc: "/placeholder.svg?height=300&width=240",
  category: "suit",
}))

const jumpsuitProducts = [1, 2, 3, 4, 5, 6].map((id) => ({
  id,
  name: "Jumpsuit Product",
  price: "$89.99",
  imageSrc: "/placeholder.svg?height=300&width=240",
  category: "jumpsuit",
}))

const longDressProducts = [1, 2, 3, 4, 5, 6].map((id) => ({
  id,
  name: "Long Dress Product",
  price: "$119.99",
  imageSrc: "/placeholder.svg?height=300&width=240",
  category: "long-dress",
}))

const shortDressProducts = [1, 2, 3, 4, 5, 6].map((id) => ({
  id,
  name: "Short Dress Product",
  price: "$79.99",
  imageSrc: "/placeholder.svg?height=300&width=240",
  category: "short-dress",
}))

export default function Home() {

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* Hero Carousel Section */}
        <section className="py-8">
          <HeroCarousel autoSlideInterval={6000} />
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 bg-[#FFF2E6] rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={img1}
                  width={48}
                  height={48}
                  alt="Women of New Look"
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-[#3A3A3A]">Women & Men Led</h3>
                <p className="text-xs text-[#5A5A5A]">Fashion crafted by leaders, driven by creativity</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Image src={img2} width={48} height={48} alt="Icon" />
              </div>
              <div>
                <h3 className="font-medium text-[#3A3A3A]">Customizable Sizes</h3>
                <p className="text-xs text-[#5A5A5A]">Perfect fit, tailored just for you</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Image src={img3} width={48} height={48} alt="Icon" />
              </div>
              <div>
                <h3 className="font-medium text-[#3A3A3A]">Handcrafted Elegance</h3>
                <p className="text-xs text-[#5A5A5A]">Uniquely made with care and precision</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Image src={img4} width={48} height={48} alt="Icon" />
              </div>
              <div>
                <h3 className="font-medium text-[#3A3A3A]">Premium Quality</h3>
                <p className="text-xs text-[#5A5A5A]">Excellence in every stich</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <HomePageProducts/>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif text-[#3A3A3A]">Grace Woven in Words</h2>
            <p className="text-[#5A5A5A]">Style, comfort, and confidence—loved by our customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Rohan Malhotra"
              imageSrc="/placeholder.svg?height=40&width=40"
              testimonial="Love this sustainable approach to fashion. The quality is amazing and the designs are timeless."
            />
            <TestimonialCard
              name="Aisha Verma"
              imageSrc="/placeholder.svg?height=40&width=40"
              testimonial="Absolutely love the sustainable designs! The fabric quality is amazing and the styles are so versatile."
            />
            <TestimonialCard
              name="Meera Iyer"
              imageSrc="/placeholder.svg?height=40&width=40"
              testimonial="The dresses are stunning! Perfect for special occasions and everyday wear. Will definitely shop again."
            />
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[1, 2, 3].map((dot) => (
                <div key={dot} className={`w-2 h-2 rounded-full ${dot === 1 ? "bg-[#8B4513]" : "bg-[#D0B090]"}`}></div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif text-[#3A3A3A]">Let&apos;s Connect & Create Magic!</h2>
            <p className="text-[#5A5A5A]">Drop us a message, and we&apos;ll weave the perfect solution for you!</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-center mb-4 text-[#5A5A5A]">From more enquire please connect to us ?</p>
            <ContactForm />
          </div>
        </section>
      </main>

    </div>
  )
}
