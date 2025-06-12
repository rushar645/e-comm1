import { Card, CardContent } from "@/components/ui/card"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Return & Refund</h1>
            <p className="text-gray-600 leading-relaxed">
              At Dress Dexterity, we believe fashion should feel right. If something doesn&apos;t work out, we&apos;re here to
              make it right. Please read our return and refund guidelines below.
            </p>
          </div>

          {/* Return Window */}
          <Card className="border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-green-600 text-sm">📅</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Return Window</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>You can initiate a return within 7 days of receiving your order.</p>
                    <p>To be eligible, the item must be:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Unworn and unused</li>
                      <li>• With tags intact</li>
                      <li>• In original packaging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Non-Returnable Items */}
          <Card className="border-l-4 border-red-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-red-600 text-sm">❌</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Non-Returnable Items</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>We do not accept returns for:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Custom-made garments or altered outfits</li>
                      <li>• Items purchased on final sale</li>
                      <li>• Products that show signs of wear, damage, or stains</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eligible Products */}
          <Card className="border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-blue-600 text-sm">✅</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Eligible Products</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>We currently accept returns on the following categories:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Suits</li>
                      <li>• Jumpsuits</li>
                      <li>• Lehengas</li>
                      <li>• Long Dresses</li>
                      <li>• Short Dresses</li>
                    </ul>
                    <p>These must be in their original, unused condition with all labels and tags attached.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Initiate a Return */}
          <Card className="border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-purple-600 text-sm">🔄</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">How to Initiate a Return</h3>
                  <div className="space-y-2 text-gray-600">
                    <ol className="ml-4 space-y-1 list-decimal">
                      <li>Log in to your account and go to My Orders</li>
                      <li>Select the item you wish to return</li>
                      <li>Click on Return Item and choose your reason</li>
                      <li>We will schedule a free reverse pickup within 2-4 working days</li>
                    </ol>
                    <p>If pickup is not available in your location, you may be required to self-ship the product.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Process */}
          <Card className="border-l-4 border-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-yellow-600 text-sm">💰</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Refund Process</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Once your returned item is received and inspected, we&apos;ll notify you of the status.</p>
                    <p>If approved:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Refund will be processed to your original payment method</li>
                      <li>• Refunds may take 5-7 business days to reflect in your account</li>
                    </ul>
                    <p>If you choose store credit, it will be issued instantly after approval.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchange Policy */}
          <Card className="border-l-4 border-indigo-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-indigo-600 text-sm">🔄</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Exchange Policy</h3>
                  <p className="text-gray-600">
                    Currently, we do not offer direct exchanges. If youd like to switch sizes or styles, please return
                    your product and place a new order.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Need Help? */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">❓</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Need Help?</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>We&apos;re here for you!</p>
                    <p>Reach out at support@dressdexterity.com or call us at +91-XXXXXXXXX</p>
                    <p>Our customer support team is available Mon-Sat, 10 AM to 6 PM.</p>
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
