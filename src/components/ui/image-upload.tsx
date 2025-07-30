"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import api from '@/lib/axios'

interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
}

interface ImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void
  maxImages?: number
  folder?: string
  existingImages?: UploadedImage[]
  disabled?: boolean
}

export function ImageUpload({
  onImagesChange,
  maxImages = 5,
  folder = "general",
  existingImages = [],
  disabled = false,
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>(existingImages)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return

      const remainingSlots = maxImages - images.length
      const filesToUpload = acceptedFiles.slice(0, remainingSlots)

      if (filesToUpload.length === 0) {
        toast({
          title: "Upload limit reached",
          description: `You can only upload ${maxImages} images maximum.`,
          variant: "warning",
        })
        return
      }

      setUploading(true)

      try {
        const formData = new FormData()
        filesToUpload.forEach((file) => {
          formData.append("files", file)
        })
        formData.append("folder", folder)

        const response = await api.post("/api/upload/multiple", formData, {headers:{"Content-Type":"multipart/form-data"}})

        if (response.status ==200) {
          const newImages = [...images, ...response.data.data]
          setImages(newImages)
          onImagesChange(newImages)
        }


        toast({
          title: "Success",
          description: `${filesToUpload.length} image(s) uploaded successfully.`,
        })
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: `Upload failed`,
          description: `Upload failed bcoz ${error}`,
          variant: "warning",
        })
      } finally {
        setUploading(false)
      }
    },
    [images, maxImages, folder, onImagesChange, disabled, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: disabled || uploading || images.length >= maxImages,
  })

  const removeImage = async (index: number) => {
    if (disabled) return

    const imageToRemove = images[index]
    setDeleting(imageToRemove.publicId)

    try {
      const response = await fetch("/api/upload/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId: imageToRemove.publicId }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete image")
      }

      const newImages = images.filter((_, i) => i !== index)
      setImages(newImages)
      onImagesChange(newImages)

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
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <Card>
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"}
                ${disabled || uploading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <input {...getInputProps()} />

              {uploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-gray-600">Uploading images...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">
                      {isDragActive ? "Drop images here" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, WebP up to 10MB ({images.length}/{maxImages} images)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={image.publicId} className="relative group">
              <CardContent className="p-2">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Main Image Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}

                  {/* Delete Button */}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                    disabled={disabled || deleting === image.publicId}
                  >
                    {deleting === image.publicId ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </Button>
                </div>

                {/* Image Info */}
                <div className="mt-2 text-xs text-gray-500">
                  <p>
                    {image.width} × {image.height}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No images uploaded yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
