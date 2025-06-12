import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-orange-500 text-sm">Effective Date: [Insert Date]</p>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Dress Dexterity. Your privacy is extremely important to us. This Privacy Policy describes how
              we collect, use, and protect your personal information when you visit or make a purchase from
              [www.dressdexterity.com].
            </p>
          </div>

          {/* Information We Collect */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📋</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Information We Collect</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>We may collect the following types of personal data when you interact with our website:</p>

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">a. Personal Identification Data</p>
                        <ul className="ml-4 space-y-1 text-sm">
                          <li>• Full name</li>
                          <li>• Email address</li>
                          <li>• Mobile number</li>
                          <li>• Billing and shipping address</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium">b. Payment Information</p>
                        <ul className="ml-4 space-y-1 text-sm">
                          <li>
                            • UPI ID, credit/debit card details (handled securely through trusted third-party gateways)
                          </li>
                          <li>• We do not store card details on our servers</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium">c. Account Details</p>
                        <ul className="ml-4 space-y-1 text-sm">
                          <li>• Username and password</li>
                          <li>• Order history</li>
                          <li>• Wishlist items</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium">d. Technical Information</p>
                        <ul className="ml-4 space-y-1 text-sm">
                          <li>• IP address</li>
                          <li>• Browser type</li>
                          <li>• Device type and operating system</li>
                          <li>• Website usage data through cookies and analytics tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🔧</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">How We Use Your Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>We use the collected data to:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Process your orders and deliver products</li>
                      <li>• Communicate with you regarding your purchase, shipping, and returns</li>
                      <li>• Offer customer support and respond to your inquiries</li>
                      <li>• Improve our website and optimize website performance</li>
                      <li>
                        • Send promotional emails, newsletters, and personalized product suggestions (only with your
                        consent)
                      </li>
                      <li>• Detect and prevent fraud, unauthorized access, or illegal activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies & Tracking Technologies */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🍪</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Cookies & Tracking Technologies</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Our website uses cookies and similar technologies to enhance your experience. These include:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Essential cookies: Required for basic site functionality</li>
                      <li>• Analytics cookies: Help us understand website traffic and user behavior</li>
                      <li>• Marketing cookies: Personalize ads and recommendations</li>
                    </ul>
                    <p>
                      You can disable cookies in your browser settings, though some site features may be limited as a
                      result.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sharing Your Information */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🤝</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Sharing Your Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>We do not sell or rent your personal information. However, we may share it with:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Trusted service providers (shipping partners, payment gateways, email platforms)</li>
                      <li>• Business partners for joint marketing efforts</li>
                      <li>
                        • Legal authorities if required by law, regulation, legal process, or governmental request
                      </li>
                      <li>• Third-party analytics tools (e.g., Google Analytics) to better understand user behavior</li>
                    </ul>
                    <p>All such parties are obligated to maintain the confidentiality and security of your data.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🔒</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Data Security</h3>
                  <p className="text-gray-600">
                    We implement industry-standard encryption (SSL), firewalls, and access controls to protect your
                    personal data. While we take every reasonable precaution, no method of transmission over the
                    internet is 100% secure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">👶</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Children&apos;s Privacy</h3>
                  <p className="text-gray-600">
                    Dress Dexterity is not intended for users under the age of 13. We do not knowingly collect personal
                    information from children. If we become aware that a minor has submitted personal information, we
                    will delete it immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">⚖️</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Your Rights</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Depending on your location, you may have the right to:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• Access or update your personal information</li>
                      <li>• Request deletion of your data</li>
                      <li>• Opt-out of promotional communications</li>
                      <li>• Object to certain types of processing</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us at support@dressdexterity.com.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email & SMS Communication */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">📧</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Email & SMS Communication</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      By providing your contact details, you consent to receive updates regarding your order,
                      promotional offers, and fashion inspiration from Dress Dexterity.
                    </p>
                    <p>
                      You may unsubscribe at any time via the link in our emails or by replying STOP to our messages.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Links */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🔗</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Third-Party Links</h3>
                  <p className="text-gray-600">
                    Our website may include links to third-party websites. We are not responsible for the privacy
                    practices or content on those external sites.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates to this Privacy Policy */}
          <Card className="border-l-4 border-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-orange-600 text-sm">🔄</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">Updates to this Privacy Policy</h3>
                  <p className="text-gray-600">
                    We reserve the right to modify this Privacy Policy at any time. Any updates will be posted on this
                    page with a revised Effective Date.
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
                  <span className="text-orange-600 text-sm">📞</span>
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
