import { type NextRequest, NextResponse } from "next/server"
import { CloudinaryService } from "@/lib/cloudinary"
import { withAuth } from "@/lib/admin-middleware"

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const formData = await req.formData()
      const files = formData.getAll("files") as File[]
      const folder = (formData.get("folder") as string) || "general"

      if (!files || files.length === 0) {
        return NextResponse.json({ error: "No files provided" }, { status: 400 })
      }

      // Validate file count (max 10 files)
      if (files.length > 10) {
        return NextResponse.json({ error: "Too many files. Maximum 10 files allowed." }, { status: 400 })
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      const maxSize = 10 * 1024 * 1024 // 10MB

      // Validate all files
      for (const file of files) {
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { error: `Invalid file type for ${file.name}. Only JPEG, PNG, and WebP are allowed.` },
            { status: 400 },
          )
        }

        if (file.size > maxSize) {
          return NextResponse.json({ error: `File ${file.name} is too large. Maximum size is 10MB.` }, { status: 400 })
        }
      }

      // Convert files to base64
      const fileBuffers = await Promise.all(
        files.map(async (file) => {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          return `data:${file.type};base64,${buffer.toString("base64")}`
        }),
      )

      // Upload all files to Cloudinary
      const results = await CloudinaryService.uploadMultipleImages(fileBuffers, {
        folder: `dress-dexterity/${folder}`,
        transformation: [
          {
            quality: "auto",
            fetch_format: "auto",
          },
        ]        
      })

      return NextResponse.json({
        success: true,
        data: results.map((result) => ({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        })),
      })
    } catch (error) {
      console.error("Multiple image upload error:", error)
      return NextResponse.json({ error: `Failed to upload images:: ${error}` }, { status: 500 })
    }
  })
}
