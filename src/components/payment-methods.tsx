import Image from "next/image"

export function PaymentMethods() {
  const paymentMethods = [
    { name: "Visa", src: "/images/payments/visa.png", width: 50, height: 32 },
    { name: "Google Pay", src: "/images/payments/google-pay.png", width: 50, height: 32 },
    { name: "Paytm", src: "/images/payments/paytm.png", width: 50, height: 32 },
    { name: "PhonePe", src: "/images/payments/phonepe.png", width: 50, height: 32 },
    { name: "UPI", src: "/images/payments/upi.png", width: 50, height: 32 },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {paymentMethods.map((method) => (
        <div
          key={method.name}
          className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <Image
            src={method.src || "/placeholder.svg"}
            width={method.width}
            height={method.height}
            alt={method.name}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  )
}
