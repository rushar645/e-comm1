import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF2E6] px-4">
      <h1 className="text-4xl font-serif text-[#3A3A3A] mb-4">Page Not Found</h1>
      <p className="text-[#5A5A5A] mb-8 text-center">
        We couldn&apos;t find the page you were looking for. It might have been moved or deleted.
      </p>
      <Button asChild className="bg-[#3A2723] hover:bg-[#5A3A33] text-white">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
