import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  bytes: number
}

export interface UploadOptions {
  folder?: string
  transformation?: unknown[]
  quality?: string | number
  format?: string
  width?: number
  height?: number
  crop?: string
}

export class CloudinaryService {
  /**
   * Upload image to Cloudinary
   */
  static async uploadImage(file: string , options: UploadOptions = {}): Promise<CloudinaryUploadResult> {
    try {
      const defaultOptions = {
        folder: "dress-dexterity",
        quality: "auto",
        format: "webp",
        ...options,
      }

      console.log("Uploading to Cloudinary with options:", defaultOptions)
      console.log("File string starts with:", file.slice(0, 30))

      const result = await cloudinary.uploader.upload(file, defaultOptions)

      if (!result) {
        throw new Error("Result nahi aya");
      }

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        resource_type: result.resource_type,
        created_at: result.created_at,
        bytes: result.bytes,
      }
    } catch (error: unknown) {
      console.error("Cloudinary upload error:", error)
    
      if (error?.message) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
      }
    
      throw new Error("Cloudinary upload failed with an unknown error.");
    }
    
  }

  /**
   * Upload multiple images
   */
  static async uploadMultipleImages(
    files: (string )[],
    options: UploadOptions = {},
  ): Promise<CloudinaryUploadResult[]> {
    try {
      const uploadPromises = files.map((file) => this.uploadImage(file, options))
      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error("Multiple upload error:", error)
      throw new Error(`Failed to upload multiple images:; ${error}`)
    }
  }

  /**
   * Delete image from Cloudinary
   */
  static async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId)
    } catch (error) {
      console.error("Cloudinary delete error:", error)
      throw new Error("Failed to delete image from Cloudinary")
    }
  }

  /**
   * Delete multiple images
   */
  static async deleteMultipleImages(publicIds: string[]): Promise<void> {
    try {
      await cloudinary.api.delete_resources(publicIds)
    } catch (error) {
      console.error("Multiple delete error:", error)
      throw new Error("Failed to delete multiple images")
    }
  }

  /**
   * Generate optimized image URL
   */
  static getOptimizedUrl(
    publicId: string,
    options: {
      width?: number
      height?: number
      quality?: string | number
      format?: string
      crop?: string
    } = {},
  ): string {
    return cloudinary.url(publicId, {
      quality: "auto",
      format: "auto",
      ...options,
    })
  }

  /**
   * Generate thumbnail URL
   */
  static getThumbnailUrl(publicId: string, size = 150): string {
    return this.getOptimizedUrl(publicId, {
      width: size,
      height: size,
      crop: "fill",
      quality: 80,
    })
  }

  /**
   * Generate responsive image URLs
   */
  static getResponsiveUrls(publicId: string): {
    small: string
    medium: string
    large: string
    xlarge: string
  } {
    return {
      small: this.getOptimizedUrl(publicId, { width: 400, quality: 80 }),
      medium: this.getOptimizedUrl(publicId, { width: 800, quality: 85 }),
      large: this.getOptimizedUrl(publicId, { width: 1200, quality: 90 }),
      xlarge: this.getOptimizedUrl(publicId, { width: 1600, quality: 95 }),
    }
  }
}

export default CloudinaryService
