"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ArrowLeft } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload"
import { useToast } from "@/components/ui/use-toast"

import api from "@/lib/axios";

interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
}

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    sku: "",
    category: "",
    brand: "",
    stock: "",
    material: "",
    careInstructions: "",
    featured: false,
    newArrival: false,
    bestSeller: false,
  })

  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [images, setImages] = useState<UploadedImage[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const colors = [
    { value: "red", label: "Red", hex: "#FF0000" },
    { value: "blue", label: "Blue", hex: "#0000FF" },
    { value: "green", label: "Green", hex: "#00FF00" },
    { value: "black", label: "Black", hex: "#000000" },
    { value: "white", label: "White", hex: "#FFFFFF" },
    { value: "yellow", label: "Yellow", hex: "#FFFF00" },
    { value: "purple", label: "Purple", hex: "#800080" },
    { value: "pink", label: "Pink", hex: "#FFC0CB" },
    { value: "orange", label: "Orange", hex: "#FFA500" },
    { value: "brown", label: "Brown", hex: "#A52A2A" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]
  const categories = ["Lehenga", "Suit", "Jumpsuit", "Long Dress", "Short Dress", "Saree", "Kurti"]
  const brands = ["Dress Dexterity", "Premium Collection", "Designer Series", "Casual Wear", "Ethnic Collection"]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.brand) newErrors.brand = "Brand is required"
    if (!formData.stock || Number.parseInt(formData.stock) < 0) newErrors.stock = "Valid stock quantity is required"
    if (selectedColors.length === 0) newErrors.colors = "At least one color is required"
    if (selectedSizes.length === 0) newErrors.sizes = "At least one size is required"
    if (images.length === 0) newErrors.images = "At least one product image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (status: "active" | "draft") => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "warning",
      })
      return
    }

    setLoading(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        mrp: formData.mrp ? Number.parseFloat(formData.mrp) : null,
        sku: formData.sku,
        category: formData.category,
        brand: formData.brand,
        stock: Number.parseInt(formData.stock),
        status,
        images: images.map((img) => img.url),
        image_public_ids: images.map((img) => img.publicId),
        colors: selectedColors,
        sizes: selectedSizes,
        material: formData.material,
        care_instructions: formData.careInstructions,
        featured: formData.featured,
        new_arrival: formData.newArrival,
        best_seller: formData.bestSeller,
      }

      const response = await api.post("api/products", productData)

      if (response.status !==200) {
        // throw new Error(result.error || "Failed to create product")
      }

      toast({
        title: "Success",
        description: `Product ${status === "active" ? "published" : "saved as draft"} successfully.`,
      })

      router.push("/admin/products")
    } catch (error) {
      // console.log("Product creation error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.response.data.error : "Failed to create product. Please try again.",
        variant: "warning",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
    if (errors.colors) {
      setErrors((prev) => ({ ...prev, colors: "" }))
    }
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
    if (errors.sizes) {
      setErrors((prev) => ({ ...prev, sizes: "" }))
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImagesChange = (newImages: UploadedImage[]) => {
    setImages(newImages)
    if (errors.images && newImages.length > 0) {
      setErrors((prev) => ({ ...prev, images: "" }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
            <p className="text-muted-foreground">Create a new product listing for your store.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Basic Info & Images */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      placeholder="SKU-12345"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value.toLowerCase())}
                      className={errors.sku ? "border-red-500" : ""}
                    />
                    {errors.sku && <p className="text-sm text-red-500 mt-1">{errors.sku}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter detailed product description"
                    className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Selling Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="2999"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className={errors.price ? "border-red-500" : ""}
                    />
                    {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <Label htmlFor="mrp">MRP (₹)</Label>
                    <Input
                      id="mrp"
                      type="number"
                      placeholder="3999"
                      value={formData.mrp}
                      onChange={(e) => handleInputChange("mrp", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="50"
                      value={formData.stock}
                      onChange={(e) => handleInputChange("stock", e.target.value)}
                      className={errors.stock ? "border-red-500" : ""}
                    />
                    {errors.stock && <p className="text-sm text-red-500 mt-1">{errors.stock}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      className={`w-full border rounded-md px-3 py-2 ${errors.category ? "border-red-500" : ""}`}
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category.toLowerCase().replace(" ", "-")}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="brand">Brand *</Label>
                    <select
                      id="brand"
                      className={`w-full border rounded-md px-3 py-2 ${errors.brand ? "border-red-500" : ""}`}
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {errors.brand && <p className="text-sm text-red-500 mt-1">{errors.brand}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images *</CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload high-quality images. The first image will be used as the main product image.
              </p>
            </CardHeader>
            <CardContent>
              <ImageUpload
                onImagesChange={handleImagesChange}
                maxImages={6}
                folder="products"
                existingImages={images}
                disabled={loading}
              />
              {errors.images && <p className="text-sm text-red-500 mt-2">{errors.images}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Variants & Additional Info */}
        <div className="space-y-6">
          {/* Product Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Product Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Available Colors *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => toggleColor(color.value)}
                        className={`flex items-center space-x-2 border rounded-md px-3 py-2 text-sm transition-colors ${
                          selectedColors.includes(color.value)
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.colors && <p className="text-sm text-red-500 mt-1">{errors.colors}</p>}
                </div>

                <div>
                  <Label className="mb-3 block">Available Sizes *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`border rounded-md px-3 py-2 text-sm transition-colors ${
                          selectedSizes.includes(size)
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {errors.sizes && <p className="text-sm text-red-500 mt-1">{errors.sizes}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    placeholder="e.g., Cotton, Silk, Polyester"
                    value={formData.material}
                    onChange={(e) => handleInputChange("material", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="care">Care Instructions</Label>
                  <Textarea
                    id="care"
                    placeholder="e.g., Machine wash cold, tumble dry low"
                    className="min-h-20"
                    value={formData.careInstructions}
                    onChange={(e) => handleInputChange("careInstructions", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Product Tags</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange("featured", checked as boolean)}
                      />
                      <label htmlFor="featured" className="text-sm font-medium">
                        Featured Product
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-arrival"
                        checked={formData.newArrival}
                        onCheckedChange={(checked) => handleInputChange("newArrival", checked as boolean)}
                      />
                      <label htmlFor="new-arrival" className="text-sm font-medium">
                        New Arrival
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="best-seller"
                        checked={formData.bestSeller}
                        onCheckedChange={(checked) => handleInputChange("bestSeller", checked as boolean)}
                      />
                      <label htmlFor="best-seller" className="text-sm font-medium">
                        Best Seller
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2">
            <Button onClick={() => handleSubmit("active")} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Product"
              )}
            </Button>
            <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save as Draft"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
