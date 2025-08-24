"use client"

import { useState, useEffect } from "react"
// import Image from "next/image"
import { useParams } from 'next/navigation'

import { Heart, Share2 } from "lucide-react"
import { ProductGallery } from "@/components/product-gallery"
import { SizeSelector } from "@/components/size-selector"
import { SimilarProducts } from "@/components/similar-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { Button } from "@/components/ui/button"
import ProductLoading from "@/components/product-loading-skeleton"
// import { Breadcrumb, type BreadcrumbType } from "@/components/ui/breadcrumb"
import { Rating } from "@/components/ui/rating"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TypographyH1, TypographyP, TypographySmall, TypographyH2 } from "@/components/ui/typography"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "@/components/ui/use-toast"
import SizeGuideModal from "@/components/size-guide-modal" 

import api from "@/lib/axios"
import { Product } from "@/types"


export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [product, setProduct] = useState<Product>()
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  const params = useParams()
  const productSku = params?.id
  

  useEffect(()=>{
    const fetchProduct = async() =>{
      try{
        const res = await api.get(`api/products/${productSku}`)
        // console.log("Fetching ka res 🔦", res)
      
        if(res.status != 200){
          console.log("No Product Fetched", res)
        }

        setProduct(res.data.data)
        // console.log("Product Dataa", res.data.data)
        setSelectedColor("")
      }
      catch(e){
        console.log("Error Fetching the one product ::", e)
      }
    }
    
    const fetchSimilarProducts = async() =>{
      try {
        const res = await api.get(`api/products?limit=5?category=${product?.category}`)

        if(res.status != 200){
          console.log("No Product Fetched", res)
        }

        setSimilarProducts(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct();
    fetchSimilarProducts();
  },[])


  const handleAddToCart = () => {
    if (!product)
      return
    
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "warning",
        duration: 2000,
      })
      return
    }

    addItem({
      sku: product.sku,
      name: product.name,
      price: product.price,
      imageSrc: product.images[0],
      color: selectedColor || product.colors[0] || "",
      size: selectedSize,
      category: product.category,
    })
  }

  const handleBuyNow = () => {
    if (!product)
      return 

    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before proceeding to checkout",
        variant: "warning",
        duration: 2000,
      })
      return
    }

    addItem({
      sku: product.sku,
      name: product.name,
      price: product.price,
      imageSrc: product.images[0],
      color: selectedColor || product.colors?.[0] || "",
      size: selectedSize,
      category: product.category,
    })

    // Navigate to checkout page
    window.location.href = "/checkout"
  } 

  const handleWishlist = () => {
    if (!product)
      return

    if (isInWishlist(product.sku)) {
      removeFromWishlist(product.sku)
    } else {
      addToWishlist({ 
        sku: product.sku,
        name: product.name,
        price: product.price,
        imageSrc: product.images[0],
      })
    }
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const sizeGuideToggle = () =>{
    setIsSizeGuideOpen((prev) => !prev)
  }

  const handleCopy = () => {

    const shareText = `http://localhost:3000/product/${product?.sku}`;
    navigator.clipboard.writeText(shareText)
      .then(() => {
        toast({
          title: "Copied",
          description: "Link copied to clipboard",
          variant: "success",
          duration: 2000,
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if(!product)
  return <ProductLoading/>  
  else
  return (
    <div className="min-h-screen bg-white">

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <Breadcrumb segments={breadcrumbSegments} className="bread crumb mb-8" /> */}

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
                  className={`p-2 rounded-full hover:bg-gray-100 ${isInWishlist(product.sku) ? "text-red-500" : ""}`}
                  aria-label={isInWishlist(product.sku) ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={handleWishlist}
                >
                  <Heart className={`h-6 w-6 ${isInWishlist(product.sku) ? "fill-red-500 stroke-red-500" : ""}`} />
                </button>
                <button onClick={handleCopy }className="p-2 rounded-full hover:bg-gray-100" aria-label="Share product">
                  <Share2 className="h-6 w-6 text-[#3A3A3A]" />
                </button>
              </div>
            </div>

            <TypographyP className="mb-2">Cloth type: {product.material}</TypographyP>

            {/* Rating */}
     <Rating value={5} className="mb-4" />

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline">
                {/* <span className="text-[#5A5A5A] mr-2">{product.price + (Math.random()*200).toFixed()}</span> */}
                <span className="text-2xl font-medium text-emerald-400">Rs.{product.price}</span>
              </div>
              <TypographySmall>Inclusive of all taxes</TypographySmall>
            </div>

            {/* Delivery */}
            <div className="flex items-center mb-2">
              {/* <div className="w-6 h-6 mr-2 flex items-center justify-center">
                <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Delivery" />
              </div>
              <TypographySmall>7 Days</TypographySmall> */}
            </div>

            {/* Size Selection */}
             <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[#3A3A3A]">Select Size</span>
                <button onClick={sizeGuideToggle} className="text-sm text-[#8B4513] hover:underline">
                  Size Guide
                </button>
              </div>
              <SizeSelector
                sizes={product.sizes}
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
            {/* <div className="grid grid-cols-2 gap-4 mb-6">
              {product.features &&
                product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                      <Image src="/placeholder.svg?height=20&width=20" width={20} height={20} alt={feature} />
                    </div>hello
                    <TypographySmall>{feature}</TypographySmall>
                  </div>
                ))}
            </div> */}

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                 {product.description}
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
        {/* Size Guide Modal */}
      <SizeGuideModal isOpen={(isSizeGuideOpen)} onClose={sizeGuideToggle} productType={product.category} />

        {/* Similar Products */}
        <section className="mb-16">
          <TypographyH2 className="mb-6">Similar Product</TypographyH2>
          <SimilarProducts products={similarProducts} />
        </section>

        {/* Explore Other Categories */}
        <section className="mb-16">
          <TypographyH2 className="mb-6">Explore other categories</TypographyH2>
          <CategoryShowcase category={product.category}/>
        </section>
      </div>
    </div>
  )
}
 