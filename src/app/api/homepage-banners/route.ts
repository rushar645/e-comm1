import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@/lib/admin-middleware"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const { data: banners, error } = await supabase
        .from("homepage_banners")
        .select("*")
        .order("position", { ascending: true })

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        data: banners,
      })
    } catch (error) {
      console.error("Banners fetch error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  })
}

export async function POST(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const body = await request.json()
      const {
        title,
        subtitle,
        image,
        buttonText,
        buttonLink,
        position,
        isActive,
        backgroundColor,
        textColor,
        buttonColor,
        alignment,
      } = body

      // Validation
      if (!title?.trim()) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 })
      }

      if (!image?.url) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 })
      }

      // Insert banner
      const { data: banner, error } = await supabase
        .from("homepage_banners")
        .insert({
          title: title.trim(),
          subtitle: subtitle?.trim() || "",
          image_url: image.url,
          image_public_id: image.publicId,
          button_text: buttonText || "Shop Now",
          button_link: buttonLink || "/category",
          position: position || 1,
          is_active: isActive !== false,
          background_color: backgroundColor || "#FFF2E6",
          text_color: textColor || "#3A3A3A",
          button_color: buttonColor || "#FF6B35",
          alignment: alignment || "left",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to create banner" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        data: banner,
        message: "Banner created successfully",
      })
    } catch (error) {
      console.error("Banner creation error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  })
}

export async function PUT(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const body = await request.json()
      const {
        id,
        title,
        subtitle,
        image,
        buttonText,
        buttonLink,
        position,
        isActive,
        backgroundColor,
        textColor,
        buttonColor,
        alignment,
      } = body

      if (!id) {
        return NextResponse.json({ error: "Banner ID is required" }, { status: 400 })
      }

      // Validation
      if (!title?.trim()) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 })
      }

      if (!image?.url) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 })
      }

      // Update banner
      const { data: banner, error } = await supabase
        .from("homepage_banners")
        .update({
          title: title.trim(),
          subtitle: subtitle?.trim() || "",
          image_url: image.url,
          image_public_id: image.publicId,
          button_text: buttonText || "Shop Now",
          button_link: buttonLink || "/category",
          position: position || 1,
          is_active: isActive !== false,
          background_color: backgroundColor || "#FFF2E6",
          text_color: textColor || "#3A3A3A",
          button_color: buttonColor || "#FF6B35",
          alignment: alignment || "left",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to update banner" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        data: banner,
        message: "Banner updated successfully",
      })
    } catch (error) {
      console.error("Banner update error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  })
}
