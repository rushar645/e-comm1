"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { X, Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

import api from '@/lib/axios'


export interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
}

interface SingleImageUploadProps {
  onImageChange: (image: UploadedImage | null) => void
  folder?: string
  existingImage?: UploadedImage | null
  disabled?: boolean
  width?: number
  height?: number
  className?: string
}

export function SingleImageUpload({
  onImageChange,
  folder = "general",
  existingImage = null,
  disabled = false,
  width,
  height,
  className = "",
}: SingleImageUploadProps) {
  const [image, setImage] = useState<UploadedImage | null>(existingImage)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { toast } = useToast()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return

      const file = acceptedFiles[0]
      setUploading(true) 

      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", folder)

        if (width) formData.append("width", width.toString())
        if (height) formData.append("height", height.toString())

        const response = await api.post("api/upload/image", formData, {withCredentials: true,
          headers: {
            "Content-Type":"multipart/form-data"
          }
        })

        const result = await response.data

        if (response.status !=200) {
          throw new Error(result.error || "Upload failed")
        }

        // Delete old image if exists
        if (image?.publicId) {
          try {
            await fetch("/api/upload/delete", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ publicId: image.publicId }),
            })
          } catch (error) {
            console.error("Failed to delete old image:", error)
          }
        }

        setImage(result.data)
        onImageChange(result.data)

        toast({
          title: "Success",
          description: "Image uploaded successfully.",
        })
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Failed to upload image",
          variant: "warning",
        })
      } finally {
        setUploading(false)
      }
    },
    [image, folder, onImageChange, disabled, width, height, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 1,
    disabled: disabled || uploading,
  })

  const removeImage = async () => {
    if (disabled || !image) return

    setDeleting(true)

    try {
      const response = await fetch("/api/upload/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId: image.publicId }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete image")
      }

      setImage(null)
      onImageChange(null)

      toast({
        title: "Success",
        description: "Image deleted successfully.",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Delete failed",
        description: "Failed to delete image",
        variant: "warning",
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        {image ? (
          <div className="relative group">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={image.url || "/placeholder.svg"}
                alt="Uploaded image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Delete Button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={removeImage}
                disabled={disabled || deleting}
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
              </Button>
            </div>

            {/* Image Info */}
            <div className="mt-2 text-xs text-gray-500 text-center">
              <p>
                {image.width} × {image.height}
              </p>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors aspect-square flex flex-col items-center justify-center
              ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"}
              ${disabled || uploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input {...getInputProps()} />

            {uploading ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Camera className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{isDragActive ? "Drop image here" : "Click to upload"}</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 10MB</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
