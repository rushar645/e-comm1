"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Eye, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Heading } from "@/components/ui/heading"
import Image from "next/image"

interface BannerManagerProps {
  bannerId: string
  onBack: () => void
}

interface BannerData {
  id: string
  title: string
  subtitle: string
  image: string
  buttonText: string
  buttonLink: string
  position: number
  isActive: boolean
  backgroundColor: string
  textColor: string
  buttonColor: string
  alignment: "left" | "center" | "right"
  lastModified: string
}

export function BannerManager({ bannerId, onBack }: BannerManagerProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [bannerData, setBannerData] = useState<BannerData>({
    id: bannerId,
    title: "",
    subtitle: "",
    image: "",
    buttonText: "Shop Now",
    buttonLink: "/category",
    position: 1,
    isActive: true,
    backgroundColor: "#FFF2E6",
    textColor: "#3A3A3A",
    buttonColor: "#FF6B35",
    alignment: "left",
    lastModified: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (bannerId !== "new") {
      // Load existing banner data
      const existingBanners: Record<string, Partial<BannerData>> = {
        "banner-1": {
          title: "Summer Collection 2024",
          subtitle: "Discover vibrant styles for the season",
          image: "/placeholder.svg?height=400&width=800",
          buttonText: "Shop Now",
          buttonLink: "/category/summer",
          position: 1,
          isActive: true,
          backgroundColor: "#FFF2E6",
          textColor: "#3A3A3A",
          buttonColor: "#FF6B35",
          alignment: "left",
        },
        "banner-2": {
          title: "Wedding Special",
          subtitle: "Elegant lehengas for your special day",
          image: "/placeholder.svg?height=400&width=800",
          buttonText: "Explore",
          buttonLink: "/category/lehenga",
          position: 2,
          isActive: true,
          backgroundColor: "#F0F8FF",
          textColor: "#2C3E50",
          buttonColor: "#3498DB",
          alignment: "center",
        },
      }

      const existingData = existingBanners[bannerId]
      if (existingData) {
        setBannerData((prev) => ({ ...prev, ...existingData }))
      }
    }
  }, [bannerId])

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: `Banner "${bannerData.title}" has been saved successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save banner. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // Simulate image upload
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation, upload to your storage service
      const imageUrl = URL.createObjectURL(file)
      setBannerData((prev) => ({ ...prev, image: imageUrl }))

      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      })
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "warning",
      })
    } finally {
      setUploading(false)
    }
  }

  const handlePreview = () => {
    window.open("/", "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to CMS
          </Button>
          <div>
            <Heading level={1}>{bannerId === "new" ? "Create New Banner" : `Edit: ${bannerData.title}`}</Heading>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={bannerData.isActive ? "default" : "secondary"}>
                {bannerData.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge variant="outline">Position {bannerData.position}</Badge>
              <span className="text-sm text-gray-600">Last modified: {bannerData.lastModified}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreview} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={loading} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save Banner"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Banner Preview</CardTitle>
              <CardDescription>See how your banner will look on the homepage</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="relative w-full h-64 rounded-lg overflow-hidden"
                style={{ backgroundColor: bannerData.backgroundColor }}
              >
                {bannerData.image && (
                  <Image
                    src={bannerData.image || "/placeholder.svg"}
                    alt={bannerData.title}
                    height={256}
                    width={800}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div
                  className={`absolute inset-0 flex flex-col justify-center p-8 ${
                    bannerData.alignment === "center"
                      ? "text-center items-center"
                      : bannerData.alignment === "right"
                        ? "text-right items-end"
                        : "text-left items-start"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-2" style={{ color: bannerData.textColor }}>
                    {bannerData.title || "Banner Title"}
                  </h2>
                  <p className="text-lg mb-4" style={{ color: bannerData.textColor }}>
                    {bannerData.subtitle || "Banner subtitle"}
                  </p>
                  <button
                    className="px-6 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: bannerData.buttonColor }}
                  >
                    {bannerData.buttonText}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Banner Settings */}
        <div className="space-y-6">
          {/* Content Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={bannerData.title}
                  onChange={(e) => setBannerData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter banner title"
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={bannerData.subtitle}
                  onChange={(e) => setBannerData((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Enter banner subtitle"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={bannerData.buttonText}
                  onChange={(e) => setBannerData((prev) => ({ ...prev, buttonText: e.target.value }))}
                  placeholder="Shop Now"
                />
              </div>
              <div>
                <Label htmlFor="buttonLink">Button Link</Label>
                <Input
                  id="buttonLink"
                  value={bannerData.buttonLink}
                  onChange={(e) => setBannerData((prev) => ({ ...prev, buttonLink: e.target.value }))}
                  placeholder="/category/new-arrivals"
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Banner Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {bannerData.image ? (
                  <div className="relative">
                    <Image
                      src={bannerData.image || "/placeholder.svg"}
                      alt="Banner"
                      height={256}
                      width={800}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setBannerData((prev) => ({ ...prev, image: "" }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload banner image</p>
                    <p className="text-sm text-gray-500">Recommended: 1200x400px, JPG or PNG</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Choose Image"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Active</Label>
                <Switch
                  id="isActive"
                  checked={bannerData.isActive}
                  onCheckedChange={(checked) => setBannerData((prev) => ({ ...prev, isActive: checked }))}
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Select
                  value={bannerData.position.toString()}
                  onValueChange={(value) => setBannerData((prev) => ({ ...prev, position: Number.parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (First)</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5 (Last)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alignment">Text Alignment</Label>
                <Select
                  value={bannerData.alignment}
                  onValueChange={(value: "left" | "center" | "right") =>
                    setBannerData((prev) => ({ ...prev, alignment: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Style Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={bannerData.backgroundColor}
                    onChange={(e) => setBannerData((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={bannerData.backgroundColor}
                    onChange={(e) => setBannerData((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                    placeholder="#FFF2E6"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={bannerData.textColor}
                    onChange={(e) => setBannerData((prev) => ({ ...prev, textColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={bannerData.textColor}
                    onChange={(e) => setBannerData((prev) => ({ ...prev, textColor: e.target.value }))}
                    placeholder="#3A3A3A"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="buttonColor">Button Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="buttonColor"
                    type="color"
                    value={bannerData.buttonColor}
                    onChange={(e) => setBannerData((prev) => ({ ...prev, buttonColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={bannerData.buttonColor}
                    onChange={(e) => setBannerData((prev) => ({ ...prev, buttonColor: e.target.value }))}
                    placeholder="#FF6B35"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
