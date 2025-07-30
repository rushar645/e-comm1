import { type NextRequest, NextResponse } from "next/server"
import { CloudinaryService } from "@/lib/cloudinary"
import { withAuth } from "@/lib/admin-middleware"

export async function DELETE(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const { publicId, publicIds } = await req.json()

      if (!publicId && (!publicIds || publicIds.length === 0)) {
        return NextResponse.json({ error: "No public ID(s) provided" }, { status: 400 })
      }

      if (publicId) {
        // Delete single image
        await CloudinaryService.deleteImage(publicId)
      } else {
        // Delete multiple images
        await CloudinaryService.deleteMultipleImages(publicIds)
      }

      return NextResponse.json({
        success: true,
        message: "Image(s) deleted successfully",
      })
    } catch (error) {
      console.error("Image deletion error:", error)
      return NextResponse.json({ error: "Failed to delete image(s)" }, { status: 500 })
    }
  })
}
