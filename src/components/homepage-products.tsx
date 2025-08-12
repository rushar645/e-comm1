"use client"

import useSWR from "swr"
import {Carousel3D} from "@/components/carousel-3d"
import {ScrollableProductSection} from "@/components/scrollable-product-section"
import React from "react"
import { Product } from "@/types"

import api from "@/lib/axios"
// import { se } from "date-fns/locale"


type Category ={
  id:string
  name:string
  slug:string
}

type CategorySection = {
  category: Category
  products: Product[]
}

type HomeProductsResponse = {
  success: boolean
  categories: CategorySection[]
  new_arrivals: Product[]
}

const fetcher = (url: string) =>
  api.get<HomeProductsResponse>(url).then(res => res.data)

export default function HomePageProducts() {
  const { data, error, isLoading } = useSWR("api/home-products", fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateIfStale: true,
  })

  if (isLoading) return <div className="py-8 text-center">Loading...</div>
  if (error) return <div className="py-8 text-center text-red-500">Failed to load products.</div>
  if (!data) return null
  // console.log(data)

  return (
    <>
      {/* New Arrivals */}
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-[#3A3A3A]">New Arrivals</h2>
          <p className="text-[#5A5A5A]">Explore Our Latest Collection in 3D</p>
        </div>
        <Carousel3D products={data.new_arrivals} />
      </section>

      {/* Shop by Style - Categories */}
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-[#3A3A3A]">Shop by Style</h2>
          <p className="text-[#5A5A5A]">Find the perfect outfit for every occasion</p>
        </div>
        {data.categories.map((section) => (
          <div
            key={section.category.id}
            className="mb-12"
          >
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-serif text-[#3A3A3A]">{section.category.name}</h3>
              <div className="grow ml-4 border-t border-gray-300"></div>
            </div>
            <div className="bg-[#799e9a] bg-opacity-10 p-4 rounded-md">
              <ScrollableProductSection
                products={section.products}
                showRating={true}
                category={section.category.name}
              />
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
