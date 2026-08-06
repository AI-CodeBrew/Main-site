"use client";

import { motion } from "framer-motion";

const techStackAI = [
  // Languages
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
    logo: "/Logos/Node.js_idBSZu62Vz_1.svg",
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

  // Frameworks
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
    logo: "/Logos/NestJS_id4Zjs7PVZ_1.svg",
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
  {
    name: "React Native",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    category: "Frameworks"
  },
  {
    name: "Flutter",
    logo: "/Logos/flutter.svg",
    category: "Frameworks"
  },
  {
    name: "SwiftUI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg",
    category: "Frameworks"
  },
  {
    name: "Kotlin",
    logo: "/Logos/kotlin.svg",
    category: "Frameworks"
  },

  // AI/ML Frameworks & Tools
  {
    name: "TensorFlow",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
    category: "AI/ML"
  },
  {
    name: "PyTorch",
    logo: "/Logos/PyTorch_id5W5KzDd3_1.svg",
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
    logo: "/Logos/LangChain_idUYyy_A3P_1.svg",
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
    name: "Groq",
    logo: "https://groq.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Perplexity",
    logo: "/Logos/Perplexity_Black_0.svg",
    category: "AI/ML"
  },
  {
    name: "Cognosys",
    logo: "https://cognosys.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "CrewAI",
    logo: "/Logos/CrewAI_ids_ENJUEa_1.svg",
    category: "AI/ML"
  },
  {
    name: "AgentGPT",
    logo: "https://agentgpt.reworkd.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "DeepSeek",
    logo: "https://www.deepseek.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "GPT-5",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "AI/ML"
  },
  {
    name: "Claude 3.5",
    logo: "https://www.anthropic.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Gemini 2.0",
    logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    category: "AI/ML"
  },
  {
    name: "Mistral",
    logo: "https://mistral.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Vapi",
    logo: "https://vapi.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "ElevenLabs",
    logo: "https://elevenlabs.io/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Whisper",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "AI/ML"
  },
  {
    name: "Rime",
    logo: "https://rime.ai/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Speechmatics",
    logo: "https://www.speechmatics.com/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Weaviate",
    logo: "https://weaviate.io/favicon.ico",
    category: "AI/ML"
  },
  {
    name: "Qdrant",
    logo: "https://qdrant.tech/favicon.ico",
    category: "AI/ML"
  },

  // Cloud & Infrastructure
  {
    name: "AWS",
    logo: "/Logos/aws.svg",
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
    logo: "https://www.cloudflare.com/favicon.ico",
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
  {
    name: "Render",
    logo: "/Logos/Render_idNBsqZbYC_0.svg",
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
    logo: "https://redis.io/favicon.ico",
    category: "Database"
  },
  {
    name: "Elasticsearch",
    logo: "https://www.elastic.co/favicon.ico",
    category: "Database"
  },
  {
    name: "Supabase",
    logo: "/Logos/supabase.svg",
    category: "Database"
  },

  // Tools
  {
    name: "Git",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
    category: "Tools"
  },
  {
    name: "GitHub",
    logo: "https://github.com/favicon.ico",
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
    name: "Cursor",
    logo: "https://cursor.sh/favicon.ico",
    category: "Tools"
  },
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
  {
    name: "n8n",
    logo: "https://n8n.io/favicon.ico",
    category: "Tools"
  },
  {
    name: "Make",
    logo: "https://www.make.com/favicon.ico",
    category: "Tools"
  },
  {
    name: "Zapier",
    logo: "/Logos/zapier.svg",
    category: "Tools"
  },
  {
    name: "Tray.io",
    logo: "https://tray.io/favicon.ico",
    category: "Tools"
  },
  {
    name: "Robot Framework",
    logo: "https://robotframework.org/favicon.ico",
    category: "Tools"
  },
  {
    name: "UiPath",
    logo: "https://www.uipath.com/favicon.ico",
    category: "Tools"
  },
  {
    name: "SendGrid",
    logo: "/Logos/logo-ecommerce/SendGrid_Symbol_0.svg",
    category: "Tools"
  },
  {
    name: "Stripe",
    logo: "/Logos/cc-stripe.svg",
    category: "Tools"
  },
  {
    name: "PayPal",
    logo: "/Logos/logo-ecommerce/PayPal_Symbol_0.svg",
    category: "Tools"
  },
  {
    name: "Payoneer",
    logo: "/Logos/logo-ecommerce/Payoneer_idAcvQJcQZ_0.svg",
    category: "Tools"
  },
  {
    name: "Mailchimp",
    logo: "https://mailchimp.com/favicon.ico",
    category: "Tools"
  },
  {
    name: "Twilio",
    logo: "https://www.twilio.com/favicon.ico",
    category: "Tools"
  }
];

export function TechStackAI() {
  return (
    <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
            Tech Stack
          </h2>
          <p className="text-xl" style={{ color: '#666666' }}>
            Cutting-edge AI technologies and frameworks powering our automation solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStackAI.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.01 }}
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
