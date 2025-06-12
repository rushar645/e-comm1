import Link from "next/link"
import { Linkedin, Instagram, MessageCircle } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <Link href="#" className="text-[#3A3A3A] hover:text-[#8B4513]" aria-label="LinkedIn">
        <Linkedin className="h-5 w-5" />
      </Link>
      <Link href="#" className="text-[#3A3A3A] hover:text-[#8B4513]" aria-label="Instagram">
        <Instagram className="h-5 w-5" />
      </Link>
      <Link href="#" className="text-[#3A3A3A] hover:text-[#8B4513]" aria-label="WhatsApp">
        <MessageCircle className="h-5 w-5" />
      </Link>
    </div>
  )
}
