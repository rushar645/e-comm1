"use client"

import { useState } from "react"
import { Plus, Edit, Eye, ImageIcon, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdmin } from "@/contexts/admin-context"
import { StaticPageEditor } from "@/components/admin/static-page-editor"
import { BannerManager } from "@/components/admin/banner-manager"
import Image  from "next/image"

export default function CMSPage() {
  const { cmsContent, loading } = useAdmin()
  const [activeTab, setActiveTab] = useState("pages")
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [editingBanner, setEditingBanner] = useState<string | null>(null)

  const staticPages = [
    {
      id: "about",
      title: "About Us",
      slug: "/about",
      lastModified: "2024-01-15",
      status: "published",
      wordCount: 850,
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      slug: "/privacy",
      lastModified: "2024-01-10",
      status: "published",
      wordCount: 1200,
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      slug: "/terms",
      lastModified: "2024-01-08",
      status: "published",
      wordCount: 950,
    },
    {
      id: "faq",
      title: "FAQ",
      slug: "/faq",
      lastModified: "2024-01-12",
      status: "published",
      wordCount: 600,
    },
    {
      id: "returns",
      title: "Returns & Exchanges",
      slug: "/returns",
      lastModified: "2024-01-05",
      status: "published",
      wordCount: 450,
    },
  ]

  const homepageBanners = [
    {
      id: "banner-1",
      title: "Summer Collection 2024",
      subtitle: "Discover vibrant styles for the season",
      image: "/placeholder.svg?height=400&width=800",
      buttonText: "Shop Now",
      buttonLink: "/category/summer",
      position: 1,
      isActive: true,
      lastModified: "2024-01-15",
    },
    {
      id: "banner-2",
      title: "Wedding Special",
      subtitle: "Elegant lehengas for your special day",
      image: "/placeholder.svg?height=400&width=800",
      buttonText: "Explore",
      buttonLink: "/category/lehenga",
      position: 2,
      isActive: true,
      lastModified: "2024-01-12",
    },
    {
      id: "banner-3",
      title: "Festive Offers",
      subtitle: "Up to 50% off on selected items",
      image: "/placeholder.svg?height=400&width=800",
      buttonText: "Shop Sale",
      buttonLink: "/category/sale",
      position: 3,
      isActive: false,
      lastModified: "2024-01-08",
    },
  ]

  if (editingPage) {
    return <StaticPageEditor pageId={editingPage} onBack={() => setEditingPage(null)} />
  }

  if (editingBanner) {
    return <BannerManager bannerId={editingBanner} onBack={() => setEditingBanner(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Content Management</h1>
          <p className="text-gray-600">Manage your website content and homepage banners</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Static Pages
          </TabsTrigger>
          <TabsTrigger value="banners" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Homepage Banners
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Static Pages</h2>
              <p className="text-grey-600">Manage your website&apos;s static content pages</p>
            </div>
            <Button onClick={() => setEditingPage("new")} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Page
            </Button>
          </div>

          <div className="grid gap-4">
            {staticPages.map((page) => (
              <Card key={page.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{page.title}</h3>
                        <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Slug: {page.slug}</span>
                        <span>•</span>
                        <span>{page.wordCount} words</span>
                        <span>•</span>
                        <span>Modified: {page.lastModified}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(page.slug, "_blank")}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPage(page.id)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="banners" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Homepage Banners</h2>
              <p className="text-gray-600">Manage carousel banners on your homepage</p>
            </div>
            <Button onClick={() => setEditingBanner("new")} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Banner
            </Button>
          </div>

          <div className="grid gap-4">
            {homepageBanners.map((banner) => (
              <Card key={banner.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={banner.image || "/placeholder.svg"}
                        alt={banner.title}
                        height={400}
                        width={800}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{banner.title}</h3>
                        <Badge variant={banner.isActive ? "default" : "secondary"}>
                          {banner.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">Position {banner.position}</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{banner.subtitle}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Button: &apos;{banner.buttonText}&apos;</span>
                        <span>•</span>
                        <span>Links to: {banner.buttonLink}</span>
                        <span>•</span>
                        <span>Modified: {banner.lastModified}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open("/", "_blank")}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingBanner(banner.id)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staticPages.length}</div>
            <p className="text-xs text-muted-foreground">
              {staticPages.filter((p) => p.status === "published").length} published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{homepageBanners.filter((b) => b.isActive).length}</div>
            <p className="text-xs text-muted-foreground">of {homepageBanners.length} total banners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">Content last modified</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
