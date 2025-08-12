import { type NextRequest, NextResponse } from "next/server"
import { CloudinaryService, UploadOptions } from "@/lib/cloudinary"
import { withAuth } from "@/lib/admin-middleware"

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try { 
      const formData = await req.formData()
      const file = formData.get("file") as File
      const folder = (formData.get("folder") as string) || "general"
      const width = formData.get("width") as string
      const height = formData.get("height") as string

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." }, { status: 400 })
      }

      // Validate file size (max 10MB)
      const maxSize = 20 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        return NextResponse.json({ error: "File size too large. Maximum size is 10MB." }, { status: 400 })
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Prepare upload options
      const uploadOptions:UploadOptions = {
        folder: `dress-dexterity/${folder}`,
        quality: "auto",
        format: "webp",
      }

      if (width && height) {
        uploadOptions.width = Number.parseInt(width)
        uploadOptions.height = Number.parseInt(height)
        uploadOptions.crop = "fill"
      }

      // Upload to Cloudinary
      const result = await CloudinaryService.uploadImage(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        uploadOptions,
      )

      return NextResponse.json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        },
      })
    } catch (error) {
      console.log("Image upload he nahi hui:", error)
      return NextResponse.json({ error: `Failed to upload imageese, ${error}` }, { status: 469 })
    }
  })
}
 