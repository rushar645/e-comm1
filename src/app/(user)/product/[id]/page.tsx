"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Share2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ProductGallery } from "@/components/product-gallery"
import { SizeSelector } from "@/components/size-selector"
import { SimilarProducts } from "@/components/similar-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { PaymentMethods } from "@/components/payment-methods"
import { SocialLinks } from "@/components/social-links"
import { Button } from "@/components/ui/button"
import { getProductById, getSimilarProducts } from "@/app/data/products"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Rating } from "@/components/ui/rating"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TypographyH1, TypographyP, TypographySmall, TypographyH2 } from "@/components/ui/typography"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "@/components/ui/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  // Get product data safely
  const product = getProductById(params.id)

  // If product not found, provide default values
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4">The product you &apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="mt-6 inline-block text-[#8B4513] hover:underline">
            Return to home page
          </Link>
        </div>
      </div>
    )
  }

  const similarProducts = getSimilarProducts(product.category, params.id)

  // Create breadcrumb segments
  const breadcrumbSegments = [
    { name: "Home", href: "/" },
    { name: product.category.replace(/-/g, " "), href: `/category?category=${product.category}` },
    { name: product.name },
  ]

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
        duration: 2000,
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      numericPrice: Number.parseFloat(product.price.replace(/[^0-9.]/g, "")),
      imageSrc: product.images[0],
      color: selectedColor || product.colors?.[0] || "",
      size: selectedSize,
      category: product.category,
    })
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before proceeding to checkout",
        variant: "destructive",
        duration: 2000,
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      numericPrice: Number.parseFloat(product.price.replace(/[^0-9.]/g, "")),
      imageSrc: product.images[0],
      color: selectedColor || product.colors?.[0] || "",
      size: selectedSize,
      category: product.category,
    })

    // Navigate to checkout page
    window.location.href = "/checkout"
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        numericPrice: Number.parseFloat(product.price.replace(/[^0-9.]/g, "")),
        imageSrc: product.images[0],
        category: product.category,
      })
    }
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb segments={breadcrumbSegments} className="mb-8" />

        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Gallery */}
          <div className="w-full md:w-1/2">
            <ProductGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-start">
              <TypographyH1 className="mb-2">{product.name}</TypographyH1>
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded-full hover:bg-gray-100 ${isInWishlist(product.id) ? "text-red-500" : ""}`}
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={handleWishlist}
                >
                  <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Share product">
                  <Share2 className="h-6 w-6 text-[#3A3A3A]" />
                </button>
              </div>
            </div>

            <TypographyP className="mb-2">Cloth type: {product.clothType}</TypographyP>

            {/* Rating */}
            <Rating value={product.rating} className="mb-4" />

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="text-[#5A5A5A] mr-2">{product.mrp}</span>
                <span className="text-2xl font-medium text-[#D35400]">{product.price}</span>
              </div>
              <TypographySmall>Inclusive of all taxes</TypographySmall>
            </div>

            {/* Delivery */}
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 mr-2 flex items-center justify-center">
                <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Delivery" />
              </div>
              <TypographySmall>{product.estimatedDelivery}</TypographySmall>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[#3A3A3A]">Select Size</span>
                <Link href="#" className="text-sm text-[#8B4513] hover:underline">
                  Size Guide
                </Link>
              </div>
              <SizeSelector
                sizes={["XS", "S", "M", "L", "XL"]}
                selectedSize={selectedSize}
                onChange={handleSizeSelect}
              />
              {!selectedSize && <p className="text-xs text-red-500 mt-1">Please select a size</p>}
            </div>

            {/* Add to Cart and Buy Now */}
            <div className="flex space-x-4 mb-6">
              <Button
                className="flex-1 bg-white border border-[#3A2723] text-[#3A2723] hover:bg-gray-100"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
              <Button
                className="flex-1 bg-[#3A2723] hover:bg-[#5A3A33] text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                onClick={handleBuyNow}
              >
                Buy now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.features &&
                product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                      <Image src="/placeholder.svg?height=20&width=20" width={20} height={20} alt={feature} />
                    </div>
                    <TypographySmall>{feature}</TypographySmall>
                  </div>
                ))}
            </div>

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                  This beautiful dress features a floral pattern on a black background. Made from high-quality fabric,
                  it offers both comfort and style. The sleeveless design and flowy silhouette make it perfect for
                  various occasions. The dress has a round neckline and falls to mid-calf length.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reviews">
                <AccordionTrigger>Review</AccordionTrigger>
                <AccordionContent>
                  Customer reviews will be displayed here. Be the first to review this product!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Return</AccordionTrigger>
                <AccordionContent>
                  Free shipping on all orders. Returns accepted within 7 days of delivery. Items must be unworn,
                  unwashed, and with original tags attached. Please contact our customer service team to initiate a
                  return.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faqs">
                <AccordionTrigger>FAQs</AccordionTrigger>
                <AccordionContent>
                  <p>Q: Is this dress true to size?</p>
                  <p>A: Yes, this dress fits true to size. Please refer to our size guide for detailed measurements.</p>
                  <br />
                  <p>Q: Is the material stretchy?</p>
                  <p>A: The material has a slight stretch for comfort but maintains its shape well.</p>
                  <br />
                  <p>Q: Can this dress be machine washed?</p>
                  <p>
                    A: We recommend gentle hand washing or dry cleaning to maintain the quality of the fabric and print.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Similar Products */}
        <section className="mb-16">
          <TypographyH2 className="mb-6">Similar Product</TypographyH2>
          <SimilarProducts products={similarProducts} />
        </section>

        {/* Explore Other Categories */}
        <section className="mb-16">
          <TypographyH2 className="mb-6">Explore other categories</TypographyH2>
          <CategoryShowcase />
        </section>
      </div>
    </div>
  )
}
