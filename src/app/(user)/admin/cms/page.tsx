"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Eye, ImageIcon, FileText, Settings, Trash, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaticPageEditor } from "@/components/admin/static-page-editor"
import { BannerManager } from "@/components/admin/banner-manager"
import Image  from "next/image"
import { HomepageBanner } from "@/types"

import api from "@/lib/axios"
export default function CMSPage() {

  const [editingBanner, setEditingBanner] = useState<string | null>(null)
  const [homepageBanners, setHomepageBanner] = useState<HomepageBanner[] | null>([])

  const handleDelete = async(id:string) =>{
    try {
      await api.delete("api/admin/banners", {data:{id}})

    } catch (error) {
      console.log(error)
    }
    if (!homepageBanners)
      return
    // const latestBanners = homepageBanners.filter((b)=>b.id != id)
    // setHomepageBanner(latestBanners)
  }

  useEffect(()=>{
    async function fetchHomepage(){
      try{
        const res = await api.get('api/admin/banners')
        setHomepageBanner(res.data.data)
        console.log("Home Page Banner", res)
      }  
      catch(e){
        console.log("Cannot fetch banner", e)
      }

    }

    fetchHomepage()
  },[])

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{homepageBanners?.filter((b) => b.is_active).length}</div>
            <p className="text-xs text-muted-foreground">of {homepageBanners?.length} total banners</p>
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
      <Tabs value="banners" className="">
        <TabsList className="grid w-full grid-cols-2">
          {/* <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Static Pages
          </TabsTrigger> */}
          {/* <TabsTrigger value="banners" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Homepage Banners
          </TabsTrigger> */}
        </TabsList>

        {/* <TabsContent value="pages" className="space-y-6">
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
            {staticPages?.map((page) => (
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
        </TabsContent> */}

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
          {homepageBanners?.map((banner) => (
              <Card key={banner.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={banner.image_url || "/placeholder.svg"}
                        alt={banner.title}
                        height={400}
                        width={800}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{banner.title}</h3>
                        <Badge variant={banner.is_active ? "default" : "secondary"}>
                          {banner.is_active ? "Active" : "Inactive"}
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
                        onClick={() => handleDelete(banner.id)}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <Trash2/>
                        Delete
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
    </div>
  )
}
