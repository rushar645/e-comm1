"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AccordionItem {
  title: string
  content: string
  isOpen: boolean
}

export function ProductAccordion() {
  const [items, setItems] = useState<AccordionItem[]>([
    {
      title: "Product Details",
      content:
        "This beautiful dress features a floral pattern on a black background. Made from high-quality fabric, it offers both comfort and style. The sleeveless design and flowy silhouette make it perfect for various occasions. The dress has a round neckline and falls to mid-calf length.",
      isOpen: false,
    },
    {
      title: "Review",
      content: "Customer reviews will be displayed here. Be the first to review this product!",
      isOpen: false,
    },
    {
      title: "Shipping & Return",
      content:
        "Free shipping on all orders. Returns accepted within 7 days of delivery. Items must be unworn, unwashed, and with original tags attached. Please contact our customer service team to initiate a return.",
      isOpen: false,
    },
    {
      title: "FAQs",
      content:
        "Q: Is this dress true to size?\nA: Yes, this dress fits true to size. Please refer to our size guide for detailed measurements.\n\nQ: Is the material stretchy?\nA: The material has a slight stretch for comfort but maintains its shape well.\n\nQ: Can this dress be machine washed?\nA: We recommend gentle hand washing or dry cleaning to maintain the quality of the fabric and print.",
      isOpen: false,
    },
  ])

  const toggleItem = (index: number) => {
    setItems(items.map((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false })))
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-2">
          <button
            className="flex items-center justify-between w-full py-2 text-left font-medium text-[#3A3A3A]"
            onClick={() => toggleItem(index)}
            aria-expanded={item.isOpen}
          >
            {item.title}
            {item.isOpen ? (
              <ChevronUp className="h-5 w-5 text-[#3A3A3A]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#3A3A3A]" />
            )}
          </button>
          {item.isOpen && <div className="py-2 text-sm text-[#5A5A5A] whitespace-pre-line">{item.content}</div>}
        </div>
      ))}
    </div>
  )
}
