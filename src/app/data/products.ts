export const newArrivalsData = [
  {
    id: '1',
    name: "Floral Summer Dress",
    price: "$89.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
    clothType: "Cotton",
  },
  {
    id: '2',
    name: "Elegant Evening Gown",
    price: "$129.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "long-dress",
    clothType: "Silk",
  },
  {
    id: '3',
    name: "Casual Denim Jumpsuit",
    price: "$79.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "jumpsuit",
    clothType: "Denim",
  },
  {
    id: '4',
    name: "Bohemian Maxi Dress",
    price: "$99.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "long-dress",
    clothType: "Rayon",
  },
  {
    id: '5',
    name: "Classic Black Dress",
    price: "$69.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
    clothType: "Polyester",
  },
  {
    id: '6',
    name: "Printed Wrap Dress",
    price: "$59.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
    clothType: "Chiffon",
  },
  {
    id: '7',
    name: "Linen Summer Suit",
    price: "$149.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "suit",
    clothType: "Linen",
  },
]

import heroBanner1 from "@/images/banner/image9.png";

export const heroBannersData = [
  {
    id: 1,
    title: "Welcome to Dress Dexterity –\nSustainable, Stylish, &\nDesigned to Last.",
    subtitle:
      "High-quality visuals showcasing the latest collection with\na slogan like: Where Style Meets Sustainability",
    buttonText: "Shop Now",
    imageSrc: heroBanner1,
  },
  {
    id: 2,
    title: "Summer Collection 2023\nBright Colors &\nBreathable Fabrics",
    subtitle: "Discover our new summer collection with vibrant colors\nand lightweight fabrics perfect for the season",
    buttonText: "Explore Collection",
    imageSrc: "/placeholder.svg?height=500&width=400",
  },
  {
    id: 3,
    title: "Exclusive Designs\nHandcrafted with Love\nJust for You",
    subtitle: "Each piece is carefully crafted by our artisans\nusing traditional techniques and sustainable materials",
    buttonText: "View Exclusives",
    imageSrc: "/placeholder.svg?height=500&width=400",
  },
]

// Helper function to get product by ID
export function getProductById(id: string | number) {
  // Convert id to number if it's a string
  const numId = typeof id === "string" ? id : Number.parseInt(id, 10)  

  // First check in newArrivalsData
  const product = newArrivalsData.find((p) => p.id === numId)

  if (product) {
    return {
      ...product,
      mrp: "M.R.P",
      rating: 5,
      estimatedDelivery: "Est. delivery by Day, DD Mon YYYY",
      images: [
        product.imageSrc,
        "/placeholder.svg?height=100&width=80",
        "/placeholder.svg?height=100&width=80",
        "/placeholder.svg?height=100&width=80",
        "/placeholder.svg?height=100&width=80",
      ],
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      features: ["100% Purchase Protection", "Assured Quality", "7-day easy returns", "Free shipping"],
    }
  }

  // If not found, return a default product
  return {
    id,
    name: "Product Name",
    clothType: "ABCD",
    price: "$89.99",
    mrp: "M.R.P",
    rating: 5,
    estimatedDelivery: "Est. delivery by Day, DD Mon YYYY",
    images: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=100&width=80",
      "/placeholder.svg?height=100&width=80",
      "/placeholder.svg?height=100&width=80",
      "/placeholder.svg?height=100&width=80",
    ],
    category: "short-dress",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: ["100% Purchase Protection", "Assured Quality", "7-day easy returns", "Free shipping"],
  }
}

// Helper function to get similar products
export function getSimilarProducts(category: string, currentId: string | number) {
  // Filter products by category and exclude the current product
  const similar = newArrivalsData.filter((p) => p.category === category && p.id !== currentId).slice(0, 4)

  // If we don't have enough products, add some generic ones
  if (similar.length < 4) {
    const needed = 4 - similar.length
    for (let i = 0; i < needed; i++) {
      similar.push({
        id: `generic-${i}`,
        name: "Product name",
        price: "Price",
        imageSrc: "/placeholder.svg?height=300&width=240",
        category: category as string,
        clothType: "ABCD",
      })
    }
  }

  return similar
}

// Additional products data for search functionality
export const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    description: "A beautiful floral summer dress.",
    price: "$89.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    description: "An elegant evening gown for special occasions.",
    price: "$129.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "long-dress",
  },
  {
    id: 3,
    name: "Casual Denim Jumpsuit",
    description: "A casual denim jumpsuit for everyday wear.",
    price: "$79.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "jumpsuit",
  },
  {
    id: 4,
    name: "Bohemian Maxi Dress",
    description: "A bohemian maxi dress with a flowy design.",
    price: "$99.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "long-dress",
  },
  {
    id: 5,
    name: "Classic Black Dress",
    description: "A classic black dress that can be dressed up or down.",
    price: "$69.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
  },
  {
    id: 6,
    name: "Printed Wrap Dress",
    description: "A printed wrap dress with a flattering silhouette.",
    price: "$59.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "short-dress",
  },
  {
    id: 7,
    name: "Linen Summer Suit",
    description: "A linen summer suit perfect for warm weather.",
    price: "$149.99",
    imageSrc: "/placeholder.svg?height=300&width=240",
    category: "suit",
  },
]
