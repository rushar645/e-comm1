export interface DiscountCode {
  code: string
  type: "percentage" | "fixed" | "free_shipping"
  value: number
  minOrderValue?: number
  maxDiscount?: number
  expiryDate?: Date
  usageLimit?: number
  usedCount?: number
  description: string
  isActive: boolean
}

export const DISCOUNT_CODES: DiscountCode[] = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrderValue: 500,
    maxDiscount: 200,
    description: "10% off on orders above ₹500 (max ₹200)",
    isActive: true,
  },
  {
    code: "FLAT100",
    type: "fixed",
    value: 100,
    minOrderValue: 800,
    description: "₹100 off on orders above ₹800",
    isActive: true,
  },
  {
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    minOrderValue: 300,
    description: "Free shipping on orders above ₹300",
    isActive: true,
  },
  {
    code: "SAVE20",
    type: "percentage",
    value: 20,
    minOrderValue: 1000,
    maxDiscount: 500,
    description: "20% off on orders above ₹1000 (max ₹500)",
    isActive: true,
  },
  {
    code: "NEWUSER",
    type: "percentage",
    value: 15,
    minOrderValue: 600,
    maxDiscount: 300,
    description: "15% off for new users on orders above ₹600 (max ₹300)",
    isActive: true,
  },
  {
    code: "FESTIVE25",
    type: "percentage",
    value: 25,
    minOrderValue: 1500,
    maxDiscount: 750,
    expiryDate: new Date("2025-12-31"),
    description: "25% off festive sale on orders above ₹1500 (max ₹750)",
    isActive: true,
  },
]

export function validateDiscountCode(
  code: string,
  orderValue: number,
): {
  isValid: boolean
  discount: DiscountCode | null
  error?: string
} {
  const discountCode = DISCOUNT_CODES.find((d) => d.code.toLowerCase() === code.toLowerCase() && d.isActive)

  if (!discountCode) {
    return {
      isValid: false,
      discount: null,
      error: "Invalid discount code",
    }
  }

  // Check expiry date
  if (discountCode.expiryDate && new Date() > discountCode.expiryDate) {
    return {
      isValid: false,
      discount: null,
      error: "This discount code has expired",
    }
  }

  // Check minimum order value
  if (discountCode.minOrderValue && orderValue < discountCode.minOrderValue) {
    return {
      isValid: false,
      discount: null,
      error: `Minimum order value of ₹${discountCode.minOrderValue} required`,
    }
  }

  // Check usage limit
  if (discountCode.usageLimit && discountCode.usedCount && discountCode.usedCount >= discountCode.usageLimit) {
    return {
      isValid: false,
      discount: null,
      error: "This discount code has reached its usage limit",
    }
  }

  return {
    isValid: true,
    discount: discountCode,
  }
}

export function calculateDiscount(
  discount: DiscountCode,
  orderValue: number,
  shippingCost: number,
): {
  discountAmount: number
  shippingDiscount: number
  finalOrderValue: number
  finalShippingCost: number
} {
  let discountAmount = 0
  let shippingDiscount = 0

  switch (discount.type) {
    case "percentage":
      discountAmount = (orderValue * discount.value) / 100
      if (discount.maxDiscount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscount)
      }
      break

    case "fixed":
      discountAmount = Math.min(discount.value, orderValue)
      break

    case "free_shipping":
      shippingDiscount = shippingCost
      break
  }

  const finalOrderValue = Math.max(0, orderValue - discountAmount)
  const finalShippingCost = Math.max(0, shippingCost - shippingDiscount)

  return {
    discountAmount,
    shippingDiscount,
    finalOrderValue,
    finalShippingCost,
  }
}
