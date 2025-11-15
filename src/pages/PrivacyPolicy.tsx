import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-foreground">
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                At NextScholar, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                and use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>Name and contact information when you subscribe to our newsletter</li>
                <li>Email address when you create an account or submit scholarship opportunities</li>
                <li>Information you provide when contacting us through our contact form</li>
                <li>Usage data and analytics about how you interact with our website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you scholarship opportunities and educational news via our newsletter</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Prevent fraudulent activity and ensure platform security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the 
                following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>With your consent or at your direction</li>
                <li>With service providers who assist us in operating our website</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect the rights, property, or safety of NextScholar, our users, or others</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do 
                not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we 
                cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>Access to the personal information we hold about you</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Objection to or restriction of certain processing activities</li>
                <li>Data portability</li>
                <li>Withdrawal of consent where processing is based on consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Children's Privacy</h2>
              <p className="mb-4">
                Our service is not directed to children under the age of 13. We do not knowingly collect personal information from 
                children under 13. If you are a parent or guardian and believe your child has provided us with personal information, 
                please contact us so we can delete such information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Third-Party Links</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content 
                of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
                Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically 
                for any changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none space-y-2 ml-4 text-muted-foreground">
                <li>By email: privacy@nextscholar.com</li>
                <li>Through our contact page: <a href="/contact" className="text-primary hover:underline">Contact Us</a></li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-2xl p-6 mt-8">
              <p className="text-sm text-muted-foreground">
                By using NextScholar, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
