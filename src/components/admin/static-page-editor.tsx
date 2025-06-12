"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Eye, Globe, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Heading } from "@/components/ui/heading"

interface StaticPageEditorProps {
  pageId: string
  onBack: () => void
}

interface PageData {
  id: string
  title: string
  slug: string
  metaTitle: string
  metaDescription: string
  content: string
  status: "published" | "draft"
  showInFooter: boolean
  showInHeader: boolean
  lastModified: string
}

export function StaticPageEditor({ pageId, onBack }: StaticPageEditorProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState<PageData>({
    id: pageId,
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    content: "",
    status: "draft",
    showInFooter: true,
    showInHeader: false,
    lastModified: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (pageId !== "new") {
      // Load existing page data
      const existingPages: Record<string, Partial<PageData>> = {
        about: {
          title: "About Us",
          slug: "/about",
          metaTitle: "About Us - Dress Dexterity",
          metaDescription: "Learn about Dress Dexterity's mission, values, and commitment to sustainable fashion.",
          content: `# About Us - Dress Dexterity

## Where Artistry Meets Attire

Dress Dexterity isn't just a fashion label—it's a canvas where heritage, craftsmanship, and contemporary charm blend into one. We design not just for your wardrobe, but for your moments— big or small, bold or graceful.

## Our Story

Born out of a desire to bridge the gap between tradition and trend, Dress Dexterity was founded with one mission: **To redefine ethnic wear for the modern woman.**

What started as a small boutique concept has now grown into a full-fledged fashion destination, offering thoughtfully designed Indian wear with a global appeal.`,
          status: "published" as const,
          showInFooter: true,
          showInHeader: false,
        },
        privacy: {
          title: "Privacy Policy",
          slug: "/privacy",
          metaTitle: "Privacy Policy - Dress Dexterity",
          metaDescription:
            "Read our privacy policy to understand how we collect, use, and protect your personal information.",
          content: `# Privacy Policy

**Effective Date:** January 1, 2024

Welcome to Dress Dexterity. Your privacy is extremely important to us. This Privacy Policy describes how we collect, use, and protect your personal information.

## Information We Collect

We may collect the following types of personal data when you interact with our website:

### Personal Identification Data
- Full name
- Email address
- Mobile number
- Billing and shipping address`,
          status: "published" as const,
          showInFooter: true,
          showInHeader: false,
        },
      }

      const existingData = existingPages[pageId]
      if (existingData) {
        setPageData((prev) => ({ ...prev, ...existingData }))
      }
    }
  }, [pageId])

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: `Page "${pageData.title}" has been saved successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = () => {
    window.open(pageData.slug || "#", "_blank")
  }

  const generateSlug = (title: string) => {
    return (
      "/" +
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    )
  }

  const handleTitleChange = (title: string) => {
    setPageData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      metaTitle: prev.metaTitle || `${title} - Dress Dexterity`,
    }))
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
            <Heading level={1}>{pageId === "new" ? "Create New Page" : `Edit: ${pageData.title}`}</Heading>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={pageData.status === "published" ? "default" : "secondary"}>{pageData.status}</Badge>
              <span className="text-sm text-gray-600">Last modified: {pageData.lastModified}</span>
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
            {loading ? "Saving..." : "Save Page"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Page Content
              </CardTitle>
              <CardDescription>Edit the main content of your page using Markdown syntax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={pageData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  value={pageData.content}
                  onChange={(e) => setPageData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your page content using Markdown..."
                  className="min-h-[400px] font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can use Markdown syntax for formatting. Preview your changes using the Preview button.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Page Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={pageData.status}
                  onValueChange={(value: "published" | "draft") => setPageData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={pageData.slug}
                  onChange={(e) => setPageData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="/page-url"
                />
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showInFooter">Show in Footer</Label>
                  <Switch
                    id="showInFooter"
                    checked={pageData.showInFooter}
                    onCheckedChange={(checked) => setPageData((prev) => ({ ...prev, showInFooter: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showInHeader">Show in Header</Label>
                  <Switch
                    id="showInHeader"
                    checked={pageData.showInHeader}
                    onCheckedChange={(checked) => setPageData((prev) => ({ ...prev, showInHeader: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                SEO Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={pageData.metaTitle}
                  onChange={(e) => setPageData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="SEO title for search engines"
                />
                <p className="text-xs text-gray-500 mt-1">{pageData.metaTitle.length}/60 characters</p>
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={pageData.metaDescription}
                  onChange={(e) => setPageData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="Brief description for search engines"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">{pageData.metaDescription.length}/160 characters</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
