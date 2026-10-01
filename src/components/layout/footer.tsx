"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { companyAddress } from "@/lib/content/company";
import { siteConfig, socialLinks, whatsappLink } from "@/lib/content/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/common/social-icons";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const whatsappNumber = siteConfig.whatsappNumber;

  return (
    <footer className="border-t footer-light-shadow relative overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(7, 6, 67, 0.15) 0%, rgba(7, 6, 67, 0.08) 30%, transparent 70%)',
          filter: 'blur(1px)'
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(7, 6, 67, 0.12) 0%, transparent 70%)',
          filter: 'blur(2px)',
          transform: 'translate(25%, 25%)'
        }}
      />

      <div className="container-page py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-gray-200">
                <Image
                  src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                  alt="FynkTech"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-semibold text-xl" style={{ color: 'var(--foreground)' }}>FynkTech</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              AI automation and e-commerce systems for businesses worldwide. Delivery center in Lahore, Pakistan.
            </p>
            <div className="flex gap-3">
              {[
                { href: socialLinks.facebook, label: "FynkTech on Facebook", Icon: FacebookIcon },
                { href: socialLinks.instagram, label: "FynkTech on Instagram", Icon: InstagramIcon },
                { href: socialLinks.linkedin, label: "FynkTech on LinkedIn", Icon: LinkedInIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center social-icon"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/blogs" className="footer-link">Blogs</Link></li>
              <li><Link href="/contact" className="footer-link" onClick={() => trackEvent("nav_click", { destination: "/contact", label: "Contact", location: "footer" })}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">AI Automation</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ai-automation/voice-chat" className="footer-link">AI Voice & Chat Automation</Link></li>
              <li><Link href="/ai-automation/workflow" className="footer-link">Business Workflow Automation</Link></li>
              <li><Link href="/ai-automation/sales-marketing" className="footer-link">AI Sales & Marketing Automation</Link></li>
              <li><Link href="/ai-automation/data-analytics" className="footer-link">Data, Analytics & AI Insight Systems</Link></li>
              <li><Link href="/ai-automation/custom-agents" className="footer-link">Custom AI Agent Development</Link></li>
              <li><Link href="/ai-automation/web-development" className="footer-link">Web Development</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">E-commerce</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ecommerce/store-setup" className="footer-link">Store Setup & Development</Link></li>
              <li><Link href="/ecommerce/product-sourcing" className="footer-link">Product Sourcing & Supply Chain</Link></li>
              <li><Link href="/ecommerce/marketing-growth" className="footer-link">Marketing & Growth Systems</Link></li>
              <li><Link href="/ecommerce/sales-funnel" className="footer-link">Sales Funnel Optimization</Link></li>
              <li><Link href="/ecommerce/operations-automation" className="footer-link">Operations & Automation</Link></li>
              <li><Link href="/ecommerce/data-analytics" className="footer-link">Data Analytics & Scaling</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/case-studies" className="footer-link">Case Studies</Link></li>
              <li><Link href="/roi-calculator" className="footer-link">ROI Calculator</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--foreground)' }} />
                <a href={`mailto:${companyAddress.email}`} className="footer-link break-all">{companyAddress.email}</a>
              </li>
              {whatsappNumber && (
                <li className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--foreground)' }} />
                  <a
                    href={whatsappLink() ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                    onClick={() => trackEvent("whatsapp_click", { location: "footer" })}
                  >
                    +{whatsappNumber}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--foreground)' }} />
                <span style={{ color: 'var(--muted-foreground)' }}>
                  {companyAddress.line1},<br />
                  {companyAddress.line2}, {companyAddress.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            © {new Date().getFullYear()} FynkTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
