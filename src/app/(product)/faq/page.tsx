"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const faqCategories = [
  {
    title: "Orders & Payments",
    questions: [
      {
        question: "How do I place an order on your website?",
        answer:
          "To place an order, browse our collection, select your desired items, choose size and color, add to cart, and proceed to checkout. Fill in your shipping details and complete payment to confirm your order.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major payment methods including UPI, Credit/Debit Cards, Net Banking, Google Pay, Paytm, PhonePe, and Cash on Delivery (COD) for select locations.",
      },
      {
        question: "Can I use multiple payment methods for one order?",
        answer:
          "Currently, we only support one payment method per order. However, you can use gift cards or store credits along with your primary payment method.",
      },
      {
        question: "Is it safe to use my card on your website?",
        answer:
          "Yes, absolutely! We use industry-standard SSL encryption and secure payment gateways. We do not store your card details on our servers for added security.",
      },
      {
        question: "Why did my payment fail?",
        answer:
          "Payment failures can occur due to insufficient funds, incorrect card details, network issues, or bank restrictions. Please check your details and try again, or contact your bank if the issue persists.",
      },
      {
        question: "I didn't receive an order confirmation. What should I do?",
        answer:
          "Please check your spam/junk folder first. If you still don't see it, contact our customer support with your order details, and we'll resend the confirmation.",
      },
      {
        question: "Can I modify or cancel my order after placing it?",
        answer:
          "Orders can be modified or cancelled within 2 hours of placement. After that, the order enters processing and cannot be changed. Please contact support immediately if you need changes.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    questions: [
      {
        question: "What are your shipping charges?",
        answer:
          "We offer free shipping on orders above ₹999. For orders below this amount, shipping charges of ₹99 apply across India.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery takes 3-7 business days. Express delivery (1-3 days) is available for select locations at additional charges. Custom orders may take 7-14 days.",
      },
      {
        question: "Do you deliver internationally?",
        answer: "Currently, we only deliver within India. We're working on expanding to international markets soon.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 7-day return policy for unworn items with original tags and packaging. Custom-made items are not eligible for returns.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Log into your account, go to 'My Orders', select the item you want to return, and follow the return process. We'll arrange a pickup from your location.",
      },
      {
        question: "Do you offer exchanges?",
        answer:
          "We don't offer direct exchanges. Please return the item and place a new order for the desired size/color.",
      },
    ],
  },
  {
    title: "Product & Stock",
    questions: [
      {
        question: "How do I know my size?",
        answer:
          "Please refer to our detailed size chart available on each product page. You can also use our custom measurement option for a perfect fit.",
      },
      {
        question: "Are the colors accurate on the website?",
        answer:
          "We try our best to display accurate colors, but slight variations may occur due to screen settings and lighting. If you're not satisfied with the color, you can return the item.",
      },
      {
        question: "When will out-of-stock items be available?",
        answer:
          "Restocking times vary by product. You can sign up for notifications on the product page to be alerted when items are back in stock.",
      },
    ],
  },
  {
    title: "Account & Privacy",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click on 'Sign Up' in the top right corner, fill in your details, and verify your email address to activate your account.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes, we use advanced encryption and security measures to protect your data. Please read our Privacy Policy for detailed information.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, you can request account deletion by contacting our support team. Please note that this action is irreversible.",
      },
    ],
  },
  {
    title: "Offers & Promotions",
    questions: [
      {
        question: "How do I use a discount code?",
        answer:
          "Enter your discount code in the 'Coupon Code' field during checkout and click 'Apply'. The discount will be reflected in your order total.",
      },
      {
        question: "Can I use multiple discount codes?",
        answer:
          "Only one discount code can be used per order. The system will automatically apply the best available discount for your order.",
      },
      {
        question: "Why isn't my discount code working?",
        answer:
          "Discount codes may have expiry dates, minimum order requirements, or may be applicable only to specific products. Please check the terms and conditions of the offer.",
      },
    ],
  },
  {
    title: "Miscellaneous",
    questions: [
      {
        question: "Do you have a physical store?",
        answer:
          "Currently, we operate online only. However, you can schedule a virtual styling session with our team for personalized assistance.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us via email at support@dressdexterity.com, call us at +91 9959067795, or use the live chat feature on our website (Mon-Sat, 10AM-6PM).",
      },
      {
        question: "Do you offer custom designs?",
        answer:
          "Yes, we offer customization for select products. You can choose custom measurements, colors, and minor design modifications. Additional charges and longer delivery times may apply.",
      },
    ],
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Orders & Payments")
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({})

  const toggleQuestion = (question: string) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [question]: !prev[question],
    }))
  }

  const activeQuestions = faqCategories.find((cat) => cat.title === activeCategory)?.questions || []

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {faqCategories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(category.title)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-colors",
                    activeCategory === category.title
                      ? "bg-orange-50 text-orange-600 border border-orange-200"
                      : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {activeQuestions.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleQuestion(faq.question)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openQuestions[faq.question] ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openQuestions[faq.question] && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
