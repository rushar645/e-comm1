"use client"
import { useState} from "react"
import { ArrowLeft, Save } from "lucide-react"
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
import { SingleImageUpload } from "@/components/ui/single-image-upload"
// import Image from "next/image"

import api from '@/lib/axios'

interface BannerManagerProps {
  bannerId: string
  onBack: () => void
  initialData?: BannerData
}

interface Image
  {
    url: string
    publicId: string
    width: number
    height: number
  } 
interface BannerData {
  id: string
  title: string
  subtitle: string
  image: Image | null
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

export function BannerManager({ bannerId, onBack, initialData }: BannerManagerProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [bannerData, setBannerData] = useState<BannerData>(
    initialData ?? {
      id: bannerId,
      title: "",
      subtitle: "",
      image: null,
      buttonText: "Shop Now",
      buttonLink: "/category",
      position: 1,
      isActive: true,
      backgroundColor: "#aaa",
      textColor: "#3A3A3A",
      buttonColor: "#FF6B35",
      alignment: "left",
      lastModified: new Date().toISOString().split("T")[0],
    }
  )


  const handleSave = async () => {
    setLoading(true)
    try {
      // Validate required fields
      if (!bannerData.title.trim()) {
        toast({
          title: "Validation Error",
          description: "Banner title is required.",
          variant: "warning",
        })
        return
      }

      if (!bannerData.image) {
        toast({
          title: "Validation Error",
          description: "Banner image is required.",
          variant: "warning",
        })
        return
      }

      // Simulate API call to save banner
      const payload = {
        ...bannerData,
        id: bannerId === "new" ? undefined : bannerId,
      };
      
      const response = bannerId === "new"
        ? await api.post("api/admin/banners", payload)
        : await api.put("api/admin/banners", payload);

      if (response.status !=200) {
        throw new Error("Failed to save banner")
      }

      toast({
        title: "Success",
        description: `Banner "${bannerData.title}" has been saved successfully.`,
      })

      // Redirect back to CMS after successful save
      setTimeout(() => {
        onBack()
      }, 1000)
    } catch (error) {
      console.error("Save error:", error)
      toast({
        title: "Error",
        description: "Failed to save banner. Please try again.",
        variant: "warning",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (image:Image) => {
    setBannerData((prev) => ({
      ...prev,
      image: image,
    }))
  }

  // const handlePreview = () => {
  //   window.open("/", "_blank")
  // }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
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
          {/* <Button variant="outline" onClick={handlePreview} className="flex items-center gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button> */}
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
                className="relative w-full h-78 rounded-lg overflow-hidden bg-amber-400"
                style={{
                  background: `linear-gradient(to bottom, white, ${bannerData.backgroundColor})`
                }}                
              >
                {bannerData.image && (
                  // <Image
                  //   src={bannerData.image.url || "/placeholder.svg"}
                  //   alt={bannerData.title}
                  //   width={200}
                  //   height={100}

                  //   className="absolute inset-0 w-full h-full object-cover"
                  // />
                  <img className="ml-50 object-contain w-full h-full" src={bannerData.image.url}/>
                )}
                <div className="absolute inset-0 bg-opacity-20" />
                <div
                  className={`absolute inset-0 flex flex-col justify-center p-8 ${
                    bannerData.alignment === "center"
                      ? "text-center items-center"
                      : bannerData.alignment === "right"
                        ? "text-right items-end"
                        : "text-left items-start"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-2 w-[55%]" style={{ color: bannerData.textColor }}>
                    {bannerData.title || "Banner Title"}
                  </h2> 
                  <p className="text-sm mb-4 w-[68%]" style={{ color: bannerData.textColor }}>
                    {bannerData.subtitle || "Banner subtitle"}
                  </p>
                  <button
                    className="px-10 py-2 rounded-md text-white text-sm font-medium"
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
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={bannerData.title}
                  onChange={(e) => setBannerData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter banner title"
                  required
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
              <CardTitle>Banner Image *</CardTitle>
              <CardDescription>Upload a high-quality banner image (recommended: 450x400px)</CardDescription>
            </CardHeader>
            <CardContent>
              <SingleImageUpload
                onImageChange={handleImageChange}
                folder="banners"
                existingImage={bannerData.image}
                width={442}
                height={450}
                className="w-full"
              />
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
                  <SelectContent className="bg-white">
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
                  <SelectContent className="bg-white">
                    <SelectItem value="left">Left</SelectItem>
                    {/* <SelectItem value="center">Center</SelectItem> */}
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
