"use client";

import { motion } from "framer-motion";

const techStackAI = [
  // AI & Machine Learning
  {
    name: "TensorFlow",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
    category: "AI/ML"
  },
  {
    name: "PyTorch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.svg",
    category: "AI/ML"
  },
  {
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "AI/ML"
  },
  {
    name: "Hugging Face",
    logo: "https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg",
    category: "AI/ML"
  },
  {
    name: "LangChain",
    logo: "https://langchain.com/img/langchain-logo.svg",
    category: "AI/ML"
  },
  {
    name: "Pinecone",
    logo: "https://www.pinecone.io/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Anthropic",
    logo: "https://www.anthropic.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Google AI",
    logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    category: "AI/ML"
  },
  {
    name: "Meta AI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    category: "AI/ML"
  },
  {
    name: "Mistral AI",
    logo: "https://mistral.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Cohere",
    logo: "https://cohere.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Replicate",
    logo: "https://replicate.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "RunPod",
    logo: "https://runpod.io/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Together AI",
    logo: "https://together.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Groq",
    logo: "https://groq.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Perplexity",
    logo: "https://www.perplexity.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Cognosys",
    logo: "https://cognosys.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "CrewAI",
    logo: "https://crewai.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "AutoGen",
    logo: "https://microsoft.github.io/autogen/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "AgentGPT",
    logo: "https://agentgpt.reworkd.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "BabyAGI",
    logo: "https://babyagi.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "SuperAGI",
    logo: "https://superagi.com/favicon.ico",
    category: "AI/ML"
  },

  // Programming Languages
  {
    name: "Python",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    category: "Languages"
  },
  {
    name: "JavaScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
    category: "Languages"
  },
  {
    name: "Node.js",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    category: "Languages"
  },
  {
    name: "TypeScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    category: "Languages"
  },
  {
    name: "Java",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    category: "Languages"
  },
  {
    name: "Go",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg",
    category: "Languages"
  },
  {
    name: "Rust",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg",
    category: "Languages"
  },
  {
    name: "SQL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
    category: "Languages"
  },
  {
    name: "Bash",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg",
    category: "Languages"
  },

  // AI Models & LLMs
  {
    name: "GPT-5",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "AI Models"
  },
  {
    name: "Claude 3.5",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Claude_logo.svg",
    category: "AI Models"
  },
  {
    name: "Gemini 2.0",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Google_Gemini_logo.svg",
    category: "AI Models"
  },
  {
    name: "LLaMA 3",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Llama_logo.svg",
    category: "AI Models"
  },
  {
    name: "Mistral",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Mistral_AI_logo.svg",
    category: "AI Models"
  },

  // Voice & Speech AI
  {
    name: "Vapi",
    logo: "https://vapi.ai/favicon.ico",
    category: "Voice AI"
  },
  {
    name: "ElevenLabs",
    logo: "https://elevenlabs.io/favicon.ico",
    category: "Voice AI"
  },
  {
    name: "Whisper",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "Voice AI"
  },
  {
    name: "Rime",
    logo: "https://rime.ai/favicon.ico",
    category: "Voice AI"
  },
  {
    name: "Speechmatics",
    logo: "https://www.speechmatics.com/favicon.ico",
    category: "Voice AI"
  },

  // AI Frameworks & Tools
  {
    name: "LlamaIndex",
    logo: "https://www.llamaindex.ai/favicon.ico",
    category: "AI Frameworks"
  },
  {
    name: "Weaviate",
    logo: "https://weaviate.io/favicon.ico",
    category: "AI Frameworks"
  },
  {
    name: "Qdrant",
    logo: "https://qdrant.tech/favicon.ico",
    category: "AI Frameworks"
  },

  // Frameworks & Libraries
  {
    name: "React",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    category: "Frameworks"
  },
  {
    name: "Next.js",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    category: "Frameworks"
  },
  {
    name: "Vue.js",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    category: "Frameworks"
  },
  {
    name: "Angular",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    category: "Frameworks"
  },
  {
    name: "Django",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg",
    category: "Frameworks"
  },
  {
    name: "FastAPI",
    logo: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
    category: "Frameworks"
  },
  {
    name: "Express.js",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    category: "Frameworks"
  },
  {
    name: "NestJS",
    logo: "https://nestjs.com/favicon.ico",
    category: "Frameworks"
  },
  {
    name: "Laravel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
    category: "Frameworks"
  },
  {
    name: "Tailwind",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    category: "Frameworks"
  },
  {
    name: "ShadCN",
    logo: "https://ui.shadcn.com/favicon.ico",
    category: "Frameworks"
  },

  // Cloud & Infrastructure
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    category: "Cloud"
  },
  {
    name: "Google Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    category: "Cloud"
  },
  {
    name: "Azure",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
    category: "Cloud"
  },
  {
    name: "DigitalOcean",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg",
    category: "Cloud"
  },
  {
    name: "Cloudflare",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.svg",
    category: "Cloud"
  },
  {
    name: "Docker",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
    category: "Cloud"
  },
  {
    name: "Kubernetes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
    category: "Cloud"
  },
  {
    name: "Terraform",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Terraform_Logo.svg",
    category: "Cloud"
  },

  // Databases
  {
    name: "PostgreSQL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    category: "Database"
  },
  {
    name: "MongoDB",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
    category: "Database"
  },
  {
    name: "Redis",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Redis_Logo.svg",
    category: "Database"
  },
  {
    name: "Elasticsearch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Elasticsearch_logo.svg",
    category: "Database"
  },
  {
    name: "Supabase",
    logo: "https://supabase.com/images/brand/supabase-logo.svg",
    category: "Database"
  },
  {
    name: "PlanetScale",
    logo: "https://planetscale.com/images/planetscale-logo.svg",
    category: "Database"
  },

  // Development Tools
  {
    name: "Git",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
    category: "Tools"
  },
  {
    name: "GitHub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    category: "Tools"
  },
  {
    name: "Vercel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
    category: "Tools"
  },
  {
    name: "Netlify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg",
    category: "Tools"
  },
  {
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    category: "Tools"
  },
  {
    name: "VS Code",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
    category: "Tools"
  },
  {
    name: "GitHub Actions",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    category: "Tools"
  },
  {
    name: "ArgoCD",
    logo: "https://argo-cd.readthedocs.io/en/stable/assets/logo.svg",
    category: "Tools"
  },

  // Automation & Workflow
  {
    name: "n8n",
    logo: "https://n8n.io/favicon.ico",
    category: "Automation"
  },
  {
    name: "Make",
    logo: "https://www.make.com/favicon.ico",
    category: "Automation"
  },
  {
    name: "Zapier",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Zapier_logo.svg",
    category: "Automation"
  },
  {
    name: "Tray.io",
    logo: "https://tray.io/favicon.ico",
    category: "Automation"
  },

  // Testing & Automation
  {
    name: "Playwright",
    logo: "https://playwright.dev/favicon.ico",
    category: "Testing"
  },
  {
    name: "Puppeteer",
    logo: "https://pptr.dev/favicon.ico",
    category: "Testing"
  },
  {
    name: "Robot Framework",
    logo: "https://robotframework.org/favicon.ico",
    category: "Testing"
  },
  {
    name: "UiPath",
    logo: "https://www.uipath.com/favicon.ico",
    category: "Testing"
  },

  // Mobile Development
  {
    name: "React Native",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    category: "Mobile"
  },
  {
    name: "Flutter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.svg",
    category: "Mobile"
  },
  {
    name: "SwiftUI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg",
    category: "Mobile"
  },
  {
    name: "Kotlin",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/Kotlin_Icon.svg",
    category: "Mobile"
  }
];

const techStackEcommerce = [
  // E-commerce Platforms
  {
    name: "Shopify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
    category: "E-commerce"
  },
  {
    name: "WooCommerce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/WooCommerce_logo.svg",
    category: "E-commerce"
  },
  {
    name: "Magento",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Magento_2_logo.svg",
    category: "E-commerce"
  },
  {
    name: "BigCommerce",
    logo: "https://www.bigcommerce.com/favicon.ico",
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
    logo: "https://www.framer.com/favicon.ico",
    category: "E-commerce"
  },
  
  // Payment Gateways
  {
    name: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    category: "Payments"
  },
  {
    name: "PayPal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    category: "Payments"
  },
  {
    name: "Square",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Square_Inc._logo.svg",
    category: "Payments"
  },
  {
    name: "Razorpay",
    logo: "https://razorpay.com/favicon.ico",
    category: "Payments"
  },
  {
    name: "2Checkout",
    logo: "https://www.2checkout.com/favicon.ico",
    category: "Payments"
  },
  {
    name: "Authorize.Net",
    logo: "https://www.authorize.net/favicon.ico",
    category: "Payments"
  },
  {
    name: "Braintree",
    logo: "https://www.braintreepayments.com/favicon.ico",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Analytics_logo.svg",
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
    logo: "https://www.klaviyo.com/favicon.ico",
    category: "Marketing"
  },
  {
    name: "Mailchimp",
    logo: "https://mailchimp.com/favicon.ico",
    category: "Marketing"
  },
  {
    name: "SendGrid",
    logo: "https://sendgrid.com/favicon.ico",
    category: "Marketing"
  },
  {
    name: "Twilio",
    logo: "https://www.twilio.com/favicon.ico",
    category: "Marketing"
  },
  
  // Inventory & Order Management
  {
    name: "TradeGecko",
    logo: "https://www.tradegecko.com/favicon.ico",
    category: "Inventory"
  },
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
    name: "ShipStation",
    logo: "https://www.shipstation.com/favicon.ico",
    category: "Shipping"
  },
  {
    name: "ShipBob",
    logo: "https://www.shipbob.com/favicon.ico",
    category: "Shipping"
  },
  {
    name: "FedEx",
    logo: "https://www.fedex.com/favicon.ico",
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
    name: "Intercom",
    logo: "https://www.intercom.com/favicon.ico",
    category: "Support"
  },
  {
    name: "Freshdesk",
    logo: "https://www.freshworks.com/favicon.ico",
    category: "Support"
  },
  {
    name: "Help Scout",
    logo: "https://www.helpscout.com/favicon.ico",
    category: "Support"
  },
  
  // Review & Feedback
  {
    name: "Trustpilot",
    logo: "https://www.trustpilot.com/favicon.ico",
    category: "Reviews"
  },
  {
    name: "Yotpo",
    logo: "https://www.yotpo.com/favicon.ico",
    category: "Reviews"
  },
  {
    name: "Judge.me",
    logo: "https://judge.me/favicon.ico",
    category: "Reviews"
  },
  {
    name: "Okendo",
    logo: "https://www.okendo.io/favicon.ico",
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
  {
    name: "Convert",
    logo: "https://www.convert.com/favicon.ico",
    category: "Testing"
  },
  
  // Social Commerce
  {
    name: "Facebook Shop",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    category: "Social"
  },
  {
    name: "Instagram Shopping",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Etsy_logo.svg",
    category: "Marketplace"
  },
  {
    name: "Walmart",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    category: "Marketplace"
  }
];

export function TechStack() {
  return (
    <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-page">
        {/* Tech Stack AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
            Tech Stack AI
          </h2>
          <p className="text-xl" style={{ color: '#666666' }}>
            Cutting-edge AI technologies and frameworks powering our automation solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {techStackAI.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-center justify-center h-32"
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
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
              <h3 className="text-sm font-medium text-center" style={{ color: '#000000' }}>
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Ecommerce Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
            Tech Stack Ecommerce
          </h2>
          <p className="text-xl" style={{ color: '#666666' }}>
            Comprehensive ecommerce tools and platforms for building successful online stores
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStackEcommerce.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-center justify-center h-32"
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
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
              <h3 className="text-sm font-medium text-center" style={{ color: '#000000' }}>
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}