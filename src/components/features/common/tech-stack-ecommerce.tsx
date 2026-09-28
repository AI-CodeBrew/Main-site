"use client";

import { motion } from "framer-motion";

const techStackEcommerce = [
  // E-commerce Platforms
  {
    name: "Shopify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
    category: "E-commerce"
  },
  {
    name: "WooCommerce",
    logo: "/Logos/logo-ecommerce/WooCommerce_Logo_0.svg",
    category: "E-commerce"
  },
  {
    name: "BigCommerce",
    logo: "/Logos/logo-ecommerce/BigCommerce_id1b0Ha0CJ_0.svg",
    category: "E-commerce"
  },
  {
    name: "Daraz",
    logo: "/Logos/logo-ecommerce/daraz.jpeg",
    category: "E-commerce"
  },
  {
    name: "WordPress",
    logo: "https://s.w.org/images/wmark.png",
    category: "E-commerce"
  },
  {
    name: "PrestaShop",
    logo: "https://www.prestashop.com/favicon.ico",
    category: "E-commerce"
  },
  {
    name: "OpenCart",
    logo: "https://www.opencart.com/favicon.ico",
    category: "E-commerce"
  },
  {
    name: "Squarespace",
    logo: "https://www.squarespace.com/favicon.ico",
    category: "E-commerce"
  },
  {
    name: "Wix",
    logo: "https://www.wix.com/favicon.ico",
    category: "E-commerce"
  },
  {
    name: "Webflow",
    logo: "https://webflow.com/favicon.ico",
    category: "E-commerce"
  },
  {
    name: "Framer",
    logo: "/Logos/logo-ecommerce/Framer_id0d95cxIr_0.svg",
    category: "E-commerce"
  },
  
  // Payment Gateways
  {
    name: "Stripe",
    logo: "/Logos/cc-stripe.svg",
    category: "Payments"
  },
  {
    name: "PayPal",
    logo: "/Logos/logo-ecommerce/PayPal_Symbol_0.svg",
    category: "Payments"
  },
  {
    name: "Payoneer",
    logo: "/Logos/logo-ecommerce/Payoneer_idAcvQJcQZ_0.svg",
    category: "Payments"
  },
  {
    name: "Wise",
    logo: "/Logos/logo-ecommerce/wise.png",
    category: "Payments"
  },
  {
    name: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    category: "Payments"
  },
  {
    name: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    category: "Payments"
  },
  {
    name: "Razorpay",
    logo: "/Logos/logo-ecommerce/Razorpay_idJPs0Yq7Y_0.svg",
    category: "Payments"
  },
  {
    name: "2Checkout",
    logo: "https://www.2checkout.com/favicon.ico",
    category: "Payments"
  },
  {
    name: "Adyen",
    logo: "https://www.adyen.com/favicon.ico",
    category: "Payments"
  },
  
  // E-commerce Tools & Analytics
  {
    name: "Google Analytics",
    logo: "/Logos/logo-ecommerce/google-analytics.png",
    category: "Analytics"
  },
  {
    name: "Hotjar",
    logo: "https://www.hotjar.com/favicon.ico",
    category: "Analytics"
  },
  {
    name: "Mixpanel",
    logo: "https://mixpanel.com/favicon.ico",
    category: "Analytics"
  },
  {
    name: "Amplitude",
    logo: "https://amplitude.com/favicon.ico",
    category: "Analytics"
  },
  {
    name: "Klaviyo",
    logo: "/Logos/logo-ecommerce/Klaviyo_idRlQDy2Ux_0.svg",
    category: "Marketing"
  },
  {
    name: "Mailchimp",
    logo: "https://mailchimp.com/favicon.ico",
    category: "Marketing"
  },
  {
    name: "SendGrid",
    logo: "/Logos/logo-ecommerce/SendGrid_Symbol_0.svg",
    category: "Marketing"
  },
  {
    name: "Twilio",
    logo: "https://www.twilio.com/favicon.ico",
    category: "Marketing"
  },
  
  // Inventory & Order Management
  {
    name: "Cin7",
    logo: "https://www.cin7.com/favicon.ico",
    category: "Inventory"
  },
  {
    name: "Zoho Inventory",
    logo: "https://www.zoho.com/favicon.ico",
    category: "Inventory"
  },
  {
    name: "FedEx",
    logo: "/Logos/logo-ecommerce/FedEx_idqjl418bD_0.svg",
    category: "Shipping"
  },
  {
    name: "UPS",
    logo: "https://www.ups.com/favicon.ico",
    category: "Shipping"
  },
  {
    name: "DHL",
    logo: "https://www.dhl.com/favicon.ico",
    category: "Shipping"
  },
  
  // Customer Support
  {
    name: "Zendesk",
    logo: "https://www.zendesk.com/favicon.ico",
    category: "Support"
  },
  {
    name: "Help Scout",
    logo: "/Logos/logo-ecommerce/Help Scout_idPud41Rd5_0.svg",
    category: "Support"
  },
  
  // Review & Feedback
  {
    name: "Trustpilot",
    logo: "https://www.trustpilot.com/favicon.ico",
    category: "Reviews"
  },
  {
    name: "Reddot",
    logo: "/Logos/logo-ecommerce/reddot.png",
    category: "Reviews"
  },
  
  // A/B Testing & Optimization
  {
    name: "Optimizely",
    logo: "https://www.optimizely.com/favicon.ico",
    category: "Testing"
  },
  {
    name: "VWO",
    logo: "https://vwo.com/favicon.ico",
    category: "Testing"
  },
  {
    name: "Unbounce",
    logo: "https://unbounce.com/favicon.ico",
    category: "Testing"
  },
  
  // Social Commerce
  {
    name: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    category: "Social"
  },
  {
    name: "Instagram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    category: "Social"
  },
  {
    name: "Pinterest",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
    category: "Social"
  },
  {
    name: "TikTok Shop",
    logo: "https://www.tiktok.com/favicon.ico",
    category: "Social"
  },
  
  // Marketplace Integration
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    category: "Marketplace"
  },
  {
    name: "eBay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    category: "Marketplace"
  },
  {
    name: "Etsy",
    logo: "/Logos/logo-ecommerce/Etsy_Logo_0.svg",
    category: "Marketplace"
  },
  {
    name: "Walmart",
    logo: "/Logos/logo-ecommerce/Walmart_Logo_0.svg",
    category: "Marketplace"
  },
  {
    name: "CJ Dropshipping",
    logo: "/Logos/logo-ecommerce/cjdropshiping.png",
    category: "Marketplace"
  },
  {
    name: "Alibaba",
    logo: "/Logos/logo-ecommerce/Alibaba.com_idHTHL5c-K_0.svg",
    category: "Marketplace"
  },
  {
    name: "Temu",
    logo: "/Logos/logo-ecommerce/Temu_Logo_0.svg",
    category: "Marketplace"
  },
  {
    name: "AliExpress",
    logo: "/Logos/logo-ecommerce/aliexpress.jpeg",
    category: "Marketplace"
  },

  // Additional Tools
  {
    name: "GoDaddy",
    logo: "/Logos/godaddy.svg",
    category: "Tools"
  },
  {
    name: "Namecheap",
    logo: "https://www.namecheap.com/favicon.ico",
    category: "Tools"
  },
];

export function TechStackEcommerce() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
            Tech Stack
          </h2>
          <p className="text-xl" style={{ color: 'var(--text-muted)' }}>
            Comprehensive ecommerce tools and platforms for building successful online stores
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStackEcommerce.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.01 }}
              className="bg-surface rounded-xl p-6 border border-line shadow-sm flex flex-col items-center justify-center h-32"
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-lg dark:bg-white/95 dark:p-1.5">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNCAyOEMyNi4yMDkxIDI4IDI4IDI2LjIwOTEgMjggMjRDMjggMjEuNzkwOSAyNi4yMDkxIDIwIDI0IDIwQzIxLjc5MDkgMjAgMjAgMjEuNzkwOSAyMCAyNEMyMCAyNi4yMDkxIDIxLjc5MDkgMjggMjQgMjhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                  }}
                />
              </div>
              <h3 className="text-sm font-medium text-center" style={{ color: 'var(--heading)' }}>
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
