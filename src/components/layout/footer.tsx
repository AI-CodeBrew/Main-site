import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";
import { companyAddress } from "@/lib/content/company";

export function Footer() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-gray-200">
                <Image
                  src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                  alt="Fynk Tech logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-semibold text-xl" style={{ color: 'var(--foreground)' }}>Fynk Tech</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              AI automation and e-commerce systems for businesses in Pakistan, the Gulf, the UK and the US.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/fynk-tech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center social-icon">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/fynk.tech?igsh=MWEwbG95NjZtcWYyNg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center social-icon">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
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
            <h3 className="font-semibold mb-4">Ecommerce</h3>
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
              <li><Link href="/free-audit" className="footer-link">Free Store Audit</Link></li>
              <li><Link href="/roi-calculator" className="footer-link">ROI Calculator</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mb-8" style={{ borderColor: 'var(--border)' }}>
          <h3 className="font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Office</h3>
          <div className="text-sm max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>{companyAddress.label}</span>
            </div>
            <p style={{ color: 'var(--muted-foreground)' }}>
              {companyAddress.line1}<br />
              {companyAddress.line2}, {companyAddress.country}
            </p>
            <p className="mt-4" style={{ color: 'var(--muted-foreground)' }}>
              <strong>Email:</strong> {companyAddress.email}
            </p>
          </div>
        </div>

        <div className="border-t pt-8 text-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            © {new Date().getFullYear()} Fynk Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
