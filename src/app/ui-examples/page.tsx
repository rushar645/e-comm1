"use client"

import { useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rating } from "@/components/ui/rating"
import { ProductCardUI } from "@/components/ui/product-card-ui"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer } from "@/components/ui/drawer"
import { Modal } from "@/components/ui/modal"
import { Toast } from "@/components/ui/toast"
import { AlertSuccess, AlertError, AlertWarning, AlertInfo } from "@/components/ui/alert"
import { QuantitySelector } from "@/components/ui/quantity-selector"
import { ColorSelector } from "@/components/ui/color-selector"

// Add these imports at the top of the file
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormField, FormLabel, FormDescription } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchInput } from "@/components/ui/search-input"
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

export default function UIExamplesPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("#FF5733")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isToastOpen, setIsToastOpen] = useState(false)

  const colors = [
    { name: "Red", value: "#FF5733" },
    { name: "Blue", value: "#3498DB" },
    { name: "Green", value: "#2ECC71" },
    { name: "Purple", value: "#9B59B6" },
    { name: "Yellow", value: "#F1C40F" },
  ]

  const breadcrumbSegments = [
    { name: "Home", href: "/" },
    { name: "UI Examples", href: "/ui-examples" },
    { name: "Components" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb segments={breadcrumbSegments} className="mb-8" />

      <TypographyH1 className="mb-8">UI Components</TypographyH1>

      <Tabs defaultValue="buttons" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="buttons">Buttons & Badges</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="overlays">Overlays</TabsTrigger>
          <TabsTrigger value="selectors">Selectors</TabsTrigger>
          {/* Add a new tab for inputs in the TabsList component */}
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
        </TabsList>

        {/* Buttons & Badges */}
        <TabsContent value="buttons" className="space-y-8">
          <section>
            <TypographyH2 className="mb-4">Buttons</TypographyH2>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" /> With Icon
              </Button>
            </div>
          </section>

          <section>
            <TypographyH2 className="mb-4">Badges</TypographyH2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="sale">Sale</Badge>
              <Badge variant="new">New</Badge>
              <Badge size="sm">Small</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </section>
        </TabsContent>

        {/* Cards */}
        <TabsContent value="cards" className="space-y-8">
          <section>
            <TypographyH2 className="mb-4">Cards</TypographyH2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This is a basic card with header, content, and footer.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>

              <ProductCardUI
                id={1}
                name="Product Example"
                price="$99.99"
                imageSrc="/placeholder.svg?height=300&width=240"
                rating={4}
                showRating={true}
                isNew={true}
              />

              <ProductCardUI
                id={2}
                name="Sale Product"
                price="$79.99"
                imageSrc="/placeholder.svg?height=300&width=240"
                rating={5}
                showRating={true}
                isSale={true}
                discount="-20%"
                showQuickAdd={true}
                variant="featured"
              />
            </div>
          </section>
        </TabsContent>

        {/* Typography */}
        <TabsContent value="typography" className="space-y-8">
          <section>
            <TypographyH2 className="mb-4">Typography</TypographyH2>
            <div className="space-y-4">
              <TypographyH1>Heading 1</TypographyH1>
              <TypographyH2>Heading 2</TypographyH2>
              <TypographyP>
                This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </TypographyP>
              <div>
                <Rating value={4} />
              </div>
            </div>
          </section>

          <section>
            <TypographyH2 className="mb-4">Accordion</TypographyH2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>Yes. It comes with default styles that match the other components.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </TabsContent>

        {/* Alerts */}
        <TabsContent value="alerts" className="space-y-8">
          <section>
            <TypographyH2 className="mb-4">Alerts</TypographyH2>
            <div className="space-y-4">
              <AlertSuccess title="Success">Your order has been placed successfully.</AlertSuccess>
              <AlertError title="Error">There was a problem processing your payment.</AlertError>
              <AlertWarning title="Warning">Your subscription will expire in 3 days.</AlertWarning>
              <AlertInfo title="Information">We&apos;ve updated our privacy policy.</AlertInfo>
            </div>
          </section>
        </TabsContent>

        {/* Overlays */}
        <TabsContent value="overlays" className="space-y-8">
          <section>
            <TypographyH2 className="mb-4">Overlays</TypographyH2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              <Button onClick={() => setIsToastOpen(true)}>Show Toast</Button>
            </div>
          </section>
        </TabsContent>

        {/* Selectors */}
        <TabsContent value="selectors" className="space-y-8">
          <section>
            <TypographyH2 className="mb-4">Selectors</TypographyH2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Quantity Selector</h3>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Color Selector</h3>
                <ColorSelector colors={colors} selectedColor={selectedColor} onChange={setSelectedColor} />
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Add this new TabsContent section after the other TabsContent sections */}
        <TabsContent value="inputs" className="space-y-8">
          <section>
            <TypographyH2 className="mb-4">Text Inputs</TypographyH2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="default-input">Default Input</FormLabel>
                  <Input id="default-input" placeholder="Enter text here" />
                </div>
                <div>
                  <FormLabel htmlFor="disabled-input">Disabled Input</FormLabel>
                  <Input id="disabled-input" placeholder="Disabled input" disabled />
                </div>
                <div>
                  <FormLabel htmlFor="error-input">Error Input</FormLabel>
                  <Input id="error-input" placeholder="Error input" error helperText="This field is required" />
                </div>
                <div>
                  <FormLabel htmlFor="helper-input">With Helper Text</FormLabel>
                  <Input id="helper-input" placeholder="With helper text" helperText="This is a helpful message" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="textarea">Textarea</FormLabel>
                  <Textarea id="textarea" placeholder="Enter multiple lines of text" />
                </div>
                <div>
                  <FormLabel htmlFor="search-input">Search Input</FormLabel>
                  <SearchInput
                    id="search-input"
                    placeholder="Search..."
                    onSearch={(value) => console.log("Search:", value)}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="select">Select</FormLabel>
                  <Select>
                    <SelectTrigger id="select">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          <section>
            <TypographyH2 className="mb-4">Checkboxes & Radios</TypographyH2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled-checkbox" disabled />
                  <label
                    htmlFor="disabled-checkbox"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Disabled checkbox
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <label htmlFor="option1" className="text-sm font-medium leading-none">
                      Option 1
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <label htmlFor="option2" className="text-sm font-medium leading-none">
                      Option 2
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="option3" disabled />
                    <label
                      htmlFor="option3"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Disabled option
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </section>

          <section>
            <TypographyH2 className="mb-4">Form Example</TypographyH2>
            <Form size="md" className="border border-[#E0D0C0] rounded-lg p-6 bg-white">
              <FormField>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input id="name" placeholder="Enter your full name" />
              </FormField>
              <FormField>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" type="email" placeholder="Enter your email" />
                <FormDescription>We&apos;ll never share your email with anyone else.</FormDescription>
              </FormField>
              <FormField>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea id="message" placeholder="Enter your message" />
              </FormField>
              <FormField>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" />
                  <label
                    htmlFor="marketing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Receive marketing emails
                  </label>
                </div>
              </FormField>
              <Button type="submit">Submit</Button>
            </Form>
          </section>

          <section>
            <TypographyH2 className="mb-4">Button Groups</TypographyH2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Horizontal Button Group</h3>
                <ButtonGroup>
                  <ButtonGroupItem>Day</ButtonGroupItem>
                  <ButtonGroupItem>Week</ButtonGroupItem>
                  <ButtonGroupItem>Month</ButtonGroupItem>
                </ButtonGroup>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Vertical Button Group</h3>
                <ButtonGroup orientation="vertical">
                  <ButtonGroupItem>Top</ButtonGroupItem>
                  <ButtonGroupItem>Middle</ButtonGroupItem>
                  <ButtonGroupItem>Bottom</ButtonGroupItem>
                </ButtonGroup>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Outline Button Group</h3>
                <ButtonGroup variant="outline">
                  <ButtonGroupItem variant="outline">Left</ButtonGroupItem>
                  <ButtonGroupItem variant="outline">Center</ButtonGroupItem>
                  <ButtonGroupItem variant="outline">Right</ButtonGroupItem>
                </ButtonGroup>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Shopping Cart"
        position="right"
        size="md"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <p className="text-center text-[#5A5A5A] py-8">Your cart is empty</p>
          </div>
          <div className="pt-4 border-t border-[#E0D0C0]">
            <Button className="w-full">Checkout</Button>
          </div>
        </div>
      </Drawer>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Quick View" size="lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <div className="aspect-square relative bg-gray-100 rounded-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <p>Product Image</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-medium mb-2">Product Name</h3>
            <p className="text-[#D35400] text-lg font-medium mb-4">$99.99</p>
            <p className="text-[#5A5A5A] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Color</h4>
                <ColorSelector colors={colors} selectedColor={selectedColor} onChange={setSelectedColor} />
              </div>
              <div>
                <h4 className="font-medium mb-2">Quantity</h4>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      <Toast
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        title="Item Added"
        description="The item has been added to your cart."
        variant="success"
        duration={3000}
      />
    </div>
  )
}
