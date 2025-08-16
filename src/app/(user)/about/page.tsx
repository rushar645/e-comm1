import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">About Us - Dress Dexterity</h1>
            <h2 className="text-xl text-[#3E2723] font-medium">Where Artistry Meets Attire</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dress Dexterity isn&apos;t just a fashion label—it&apos;s a canvas where heritage, craftsmanship, and contemporary
              charm blend into one. We design not just for your wardrobe, but for your moments— big or small, bold or
              graceful.
            </p>
          </div>

          {/* Our Story */}
          <Card className="border-l-4 border-[#3E2723]">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#3E2723] rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📖</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Our Story</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      Born out of a desire to bridge the gap between tradition and trend, Dress Dexterity was founded
                      with one mission:
                    </p>
                    <p className="text-[#3E2723] italic">To redefine ethnic wear for the modern woman.</p>
                    <p>
                      What started as a small boutique concept has now grown into a full-fledged fashion destination,
                      offering thoughtfully designed Indian wear with a global appeal. Whether you&apos;re dressing for a
                      festival, a wedding, or simply for yourself, our goal is to make you feel{" "}
                      <span className="italic">confident and radiant.</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Essence */}
          <Card className="border-l-4 border-[#3E2723]">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">✨</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Our Essence</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      We&apos;re not here to follow trends—we&apos;re here to create timeless pieces that you&apos;ll cherish season
                      after season. Each outfit is a story in itself, crafted with attention to detail, sustainability
                      in mind, and love at heart.
                    </p>
                    <p className="font-medium">What We Offer:</p>
                    <ul className="space-y-1 ml-4">
                      <li>
                        🌸 <strong>Signature Collections:</strong> Suits, Lehengas, Long & Short Dresses, and
                        Jumpsuits—all tailored to grace and modernity.
                      </li>
                      <li>
                        🎨 <strong>Customizable Outfits:</strong> Because we know one size (or style) doesn&apos;t fit all.
                        Personalize select pieces to make them truly yours.
                      </li>
                      <li>
                        ⚡ <strong>Express Delivery:</strong> 3-Day delivery for regular outfits, 7-Day for
                        customized—so you&apos;re always ready to shine.
                      </li>
                      <li>
                        🔄 <strong>Easy 7-Day Returns:</strong> Changed your mind? No worries. Enjoy a hassle-free
                        return policy on all non-customized pieces.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Craftsmanship */}
          <Card className="border-l-4 border-[#3E2723]">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#3E2723] rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[#3E2723] text-sm">🎭</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Our Craftsmanship</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      Every Dress Dexterity piece is created by skilled artisans who understand not just fabric, but the
                      feeling behind wearing something special. Our materials are handpicked for comfort and longevity,
                      and each silhouette is designed to enhance every <span className="italic">body type.</span>
                    </p>
                    <p>
                      We use a mix of traditional embroidery techniques, fluid cuts, and contemporary fabrics to create
                      fashion that&apos;s timeless yet modern.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Values */}
          <Card className="border-l-4 border-[#3E2723]">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[#3E2723] text-sm">💎</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      🌱 <strong>Sustainable Practices:</strong> We aim to minimize waste, source ethically, and reduce
                      our carbon footprint—because we care about fashion and the future.
                    </p>
                    <p>
                      👩 <strong>Empowering Women:</strong> From our team of designers to the women we dress, empowering
                      women is central to our brand&apos;s philosophy and mission.
                    </p>
                    <p>
                      ❤️ <strong>Customer-First:</strong> From order to delivery to returns—we&apos;re here to make sure you
                      enjoy every step of your Dress Dexterity experience.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Behind the Name */}
          <Card className="border-l-4 border-[#3E2723]">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📝</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Behind the Name</h3>
                  <p className="text-gray-600">
                    Dexterity symbolizes skill, finesse, and precision. Thats&apos; exactly how we want you to feel when
                    you wear our clothes—crafted with care, made with mastery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connect With Us */}
          <Card className="border-l-4 border-[#3E2723]">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🌐</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Connect With Us</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      We&apos;re more than just an online store—were a community. Follow us on social media, share your
                      looks, or reach out to us anytime.
                    </p>
                    <p>We love hearing from you!</p>
                    <ul className="space-y-1">
                      <li>• Instagram: @dressdexterity</li>
                      <li>• Email: support@dressdexterity.com</li>
                      <li>• Chat Support: Mon-Sat | 10AM-6PM</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Thought */}
          <Card className="border-l-4 border-[#3E2723]">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">💭</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Final Thought</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>You&apos;re not just choosing a dress. You&apos;re choosing a feeling.</p>
                    <p>
                      Let Dress Dexterity be part of your journey—through celebrations, milestones, and everyday
                      elegance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
