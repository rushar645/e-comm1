import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import google from "@/images/payments/google-pay.png"
import visa from "@/images/payments/visa.png"
import upi from "@/images/payments/upi.png"
import phonepe from "@/images/payments/phonepe.png"
import paytm from "@/images/payments/paytm.png"

const footer = () => {
  return (
    <footer className="bg-[#FBE3CE] pt-12 pb-4 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold md:text-lg text-[#3A3A3A] mb-4">Discover</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/category/suit" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Suit
                  </Link>
                </li>
                <li>
                  <Link href="/category/lehenga" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Lehenga
                  </Link>
                </li>
                <li>
                  <Link href="/category/jumpsuit" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Jumpsuit
                  </Link>
                </li>
                <li>
                  <Link href="/category/long-dress" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Long Dress
                  </Link>
                </li>
                <li>
                  <Link href="/category/short-dress" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Short Dress
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold md:text-lg text-[#3A3A3A] mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    F&Q
                  </Link>
                </li>
                <li>
                  <Link href="/track" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Track
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    About Us
                  </Link>
                </li>
            
                <li>
                  <Link href="/privacy" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Privacy 
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                    Return & Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold md:text-lg text-[#3A3A3A] mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-sm text-[#5A5A5A]">Number: +919599067795</li>
                <li className="text-sm text-[#5A5A5A]">Mail: info@dressdexterity.com</li>
                <li className="text-sm text-[#5A5A5A]">Location: B-74, Sector-88, Noida 210305</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold md:text-lg text-[#3A3A3A] mb-4">Payment Merchant</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <Image src={google} width={60} height={40} alt="Google Pay" />
                <Image src={visa} width={60} height={40} alt="Visa" />
                <Image src={paytm} width={60} height={40} alt="Paytm" />
                <Image src={phonepe} width={60} height={40} alt="PhonePe" />
                <Image src={upi} width={60} height={40} alt="UPI" />
              </div>

              <h3 className="font-bold md:text-lg text-[#3A3A3A] mb-4">Social Media</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-[#3A3A3A] hover:text-[#8B4513]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link href="#" className="text-[#3A3A3A] hover:text-[#8B4513]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-[#3A3A3A] hover:text-[#8B4513]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D0B090] pt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#5A5A5A]">Copyright ©dressdexterity 2025. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="#" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                Terms & Conditions
              </Link>
              <span className="text-[#5A5A5A]">·</span>
              <Link href="#" className="text-sm text-[#5A5A5A] hover:text-[#8B4513]">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

  )
}

export default footer