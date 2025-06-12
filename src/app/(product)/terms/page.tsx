import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms & Conditions</h1>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Dress Dexterity. These Terms and Conditions (Terms) govern your access to and use of our
              website [www.dressdexterity.com] and the products and services we provide. By using this Site, you agree
              to comply with and be bound by these Terms.
            </p>
          </div>

          {/* User Eligibility & Account */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">👤</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">User Eligibility & Account</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>
                        • You must be at least 18 years of age or using the site under the supervision of a legal
                        guardian.
                      </li>
                      <li>• You are responsible for maintaining the confidentiality of your account and password.</li>
                      <li>• You must notify us immediately of any unauthorized access to your account.</li>
                      <li>
                        • You agree to provide accurate, current, and complete information when creating an account or
                        placing an order.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Information & Accuracy */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📦</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Product Information & Accuracy</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>
                        • All products listed are described as accurately as possible. However, slight variations in
                        color, embroidery, or fabric may occur due to photography, lighting or device displays.
                      </li>
                      <li>
                        • We reserve the right to correct any errors, inaccuracies, or omissions and to change or update
                        information without notice.
                      </li>
                      <li>• All prices are listed in INR and include applicable taxes unless stated otherwise.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Orders */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">✂️</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Custom Orders</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>
                        • Custom orders include products that are tailored to your specific measurements, design
                        preferences, or custom embroidery.
                      </li>
                      <li>
                        • Once a custom order is confirmed and paid for, it cannot be cancelled, returned, or exchanged.
                      </li>
                      <li>
                        • It is your responsibility to ensure the accuracy of all measurements and specifications
                        provided.
                      </li>
                      <li>• Custom orders may take longer to process and ship.</li>
                      <li>
                        • Minor alterations (if allowed) may be chargeable and should be requested within 24 hours of
                        placing the order.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Processing */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">⚙️</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Order Processing</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>• Orders are processed within 24-48 hours of successful payment confirmation.</li>
                      <li>
                        • We reserve the right to cancel or refuse any order at our discretion, especially in cases of
                        suspected fraud or incorrect pricing.
                      </li>
                      <li>• You will receive order updates via email or SMS.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Delivery */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🚚</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Shipping & Delivery</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>• For non-customized items, delivery is done within 3-5 business days post dispatch.</li>
                      <li>• For customized garments, delivery takes up to 7 business days post-production.</li>
                      <li>
                        • Shipping delays may occur due to weather, public holidays, or logistical issues beyond our
                        control.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return & Refund Policy */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">↩️</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Return & Refund Policy</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>• We offer 7-day return eligibility for non-customized products.</li>
                      <li>
                        • Returned items must be in original condition, unworn, unwashed, with tags and packaging
                        intact.
                      </li>
                      <li>
                        • The return process must be initiated within 7 days of delivery by contacting our support team.
                      </li>
                      <li>
                        • Upon inspection and approval of the returned item, a refund will be issued within 5-7 working
                        days to your original payment method.
                      </li>
                      <li>• Shipping fees (if applicable) are non-refundable.</li>
                      <li>• No return or exchange is accepted on customized orders.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Billing */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">💳</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Payment & Billing</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>• We accept payments through UPI, Debit/Credit Cards, Net Banking, and Wallets.</li>
                      <li>• You are responsible for providing correct billing details.</li>
                      <li>• In case of failed transactions, you may try again or contact your bank.</li>
                      <li>• Dress Dexterity is not liable for any charges levied by your financial institution.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offers, Discounts & Promotions */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🎁</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Offers, Discounts & Promotions</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>• All offers are time-sensitive and subject to availability.</li>
                      <li>• Discount codes and promotional offers cannot be retroactively applied.</li>
                      <li>• Promotions cannot be combined unless stated otherwise.</li>
                      <li>• We reserve the right to modify, withdraw or cancel any offer without prior notice.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data Protection */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🔒</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Privacy & Data Protection</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>
                        • Your privacy is extremely important to us. Any personal data provided is used only for
                        processing your order, shipping, and support services.
                      </li>
                      <li>• We do not share your personal data with third parties (refer to our Privacy Policy).</li>
                      <li>
                        • We ensure all personal and payment information is securely handled using industry-standard
                        encryption.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">©️</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Intellectual Property</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>
                        • All content on the website including images, product designs, graphics, text, and branding
                        elements is the exclusive property of Dress Dexterity.
                      </li>
                      <li>
                        • Unauthorized copying, distribution or reproduction of any content without prior written
                        consent is strictly prohibited.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Use */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">❌</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Prohibited Use</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>You agree not to:</p>
                    <ul className="space-y-1">
                      <li>• Use the website for unlawful activities</li>
                      <li>• Attempt to gain unauthorized access to the website&apos;s systems</li>
                      <li>• Violate any applicable local, state, national, or international law</li>
                      <li>• Impersonate another person or entity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Availability */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📋</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Product Availability</h3>
                  <p className="text-gray-600">
                    Occasionally, high demand or limited edition items may cause a product to go out of stock even after
                    your order has been placed. In such cases, we will notify you immediately and process a full refund.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📞</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Communication</h3>
                  <div className="space-y-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>
                        • By using our platform, you agree to receive promotional emails, SMS, or WhatsApp messages.
                      </li>
                      <li>• You may opt out of marketing communications at any time.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🔄</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Changes to Terms</h3>
                  <p className="text-gray-600">
                    We reserve the right to modify or update these Terms & Conditions at any time without notice. It is
                    your responsibility to review these Terms periodically.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Us */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📧</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>If you have any questions regarding our Terms & Conditions, please get in touch:</p>
                    <p>📧 support@dressdexterity.com</p>
                    <p>📞 +91 9959067795</p>
                    <p>📍 B-74, Sector-88, Noida 210305</p>
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
