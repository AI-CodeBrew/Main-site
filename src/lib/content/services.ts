/**
 * Structured content for service detail pages.
 * Copy drafted from legacy page files; unverified claims marked TODO: verify.
 */

export type ServiceCategory = "ai" | "ecommerce";

export type ServiceSlug =
  | "voice-chat"
  | "workflow"
  | "sales-marketing"
  | "data-analytics"
  | "custom-agents"
  | "web-development"
  | "mobile-development"
  | "ui-ux"
  | "cloud"
  | "qa-support"
  | "store-setup"
  | "product-sourcing"
  | "marketing-growth"
  | "sales-funnel"
  | "operations-automation"
  | "branding-creative"
  | "maintenance"
  | "ai-solutions";

export type ServiceContent = {
  slug: ServiceSlug;
  category: ServiceCategory;
  path: string;
  headline: string;
  subheadline: string;
  whoFor: [string, string, string];
  problem: string;
  deliverables: string[];
  process: { title: string; description: string }[];
  timeline: string;
  techStack: string[];
  relatedCaseStudy: { title: string; href: string; note: string } | null;
  pricing: { startingFrom: string | null; factors: string[] };
  faq: { q: string; a: string }[];
  heroImage: string;
};

const dialcomCaseStudy = {
  title: "Dialcom",
  href: "https://dialcom.ai/",
  note: "CRM and voice AI platform for lenders — AI receptionist, CRM, and OMS.",
} as const;

const defaultPricingFactors = [
  "Scope and number of integrations",
  "Timeline and team size",
  "Ongoing support and iteration needs",
];

const discoveryProcess = (
  build: string,
  launch: string,
): ServiceContent["process"] => [
  {
    title: "Discovery call",
    description:
      "We map your goals, systems, and constraints — then agree what success looks like.",
  },
  {
    title: "Proposal & build",
    description: build,
  },
  {
    title: "Launch & optimize",
    description: launch,
  },
];

const allServices: ServiceContent[] = [
  {
    slug: "voice-chat",
    category: "ai",
    path: "/ai-automation/voice-chat",
    headline: "AI Voice & Chat Automation",
    subheadline:
      "Transform customer interactions with intelligent conversational AI that understands, responds, and delivers exceptional experiences 24/7.",
    whoFor: [
      "Support teams handling high chat, WhatsApp, and phone volume",
      "Businesses that need 24/7 coverage with human handoff when it matters",
      "Teams ready to integrate AI with CRM, helpdesk, or internal tools",
    ],
    problem:
      "Manual support does not scale: wait times grow, costs rise, and customers expect instant answers across channels. You need conversational AI that stays on-brand, remembers context, and escalates cleanly to people.",
    deliverables: [
      "Voice and chat agent design aligned to your brand and policies",
      "NLU, speech, and messaging flows with escalation rules",
      "CRM and helpdesk integration (APIs, webhooks)",
      "Knowledge base connection and conversation monitoring",
      "Handoff docs, training, and launch support",
    ],
    process: [
      {
        title: "Intelligent voice assistants",
        description:
          "Design natural voice flows with NLU, speech-to-text, text-to-speech, and multi-turn conversation management.",
      },
      {
        title: "Advanced chat automation",
        description:
          "Deploy chatbots for FAQs through complex troubleshooting with intent recognition and analytics.",
      },
      {
        title: "Integration & customization",
        description:
          "Connect channels, train on your data, and tune monitoring for ongoing optimization.",
      },
    ],
    timeline:
      "Smaller chat or voice pilots often ship in a few weeks; multi-channel and deep integrations take longer. TODO: verify typical timelines per scope.",
    techStack: [
      "Voice & chat platforms (e.g. Vapi, Twilio) — TODO: verify stack per project",
      "Node.js / Python backends",
      "LangChain / LLM providers",
      "CRM & helpdesk APIs",
      "Supabase / PostgreSQL",
    ],
    relatedCaseStudy: dialcomCaseStudy,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Channels (voice, web, WhatsApp)", "Languages and compliance needs"] },
    faq: [
      {
        q: "Can the AI hand off to a human agent?",
        a: "Yes. We design escalation paths so complex or sensitive conversations reach your team with full context.",
      },
      {
        q: "Which channels can you support?",
        a: "Web chat, voice, and messaging channels depending on your stack. We confirm fit on the discovery call.",
      },
      {
        q: "Do you train the bot on our docs and policies?",
        a: "Yes — we connect your knowledge base and review responses before launch. TODO: verify data handling requirements.",
      },
      {
        q: "How is pricing structured?",
        a: "Based on scope, channels, integrations, and support. We share a clear proposal after discovery; published starting prices are TODO.",
      },
    ],
    heroImage: "/Business-Cards/AI Voice & Chat Automation.png",
  },
  {
    slug: "workflow",
    category: "ai",
    path: "/ai-automation/workflow",
    headline: "Business Workflow Automation",
    subheadline:
      "Streamline your operations with intelligent automation that eliminates manual tasks, reduces errors, and accelerates business processes across your organization.",
    whoFor: [
      "Ops teams drowning in repetitive tasks across spreadsheets and email",
      "Businesses connecting CRM, billing, and internal tools manually",
      "Leaders who want measurable efficiency without losing human oversight",
    ],
    problem:
      "Manual workflows create bottlenecks, errors, and invisible cost. When systems do not talk to each other, teams copy data by hand and critical steps get missed.",
    deliverables: [
      "Process mapping and automation opportunity analysis",
      "Workflow design with exception handling and approvals",
      "Integrations across your existing SaaS and internal APIs",
      "Monitoring dashboards and audit trails",
      "Documentation and handoff for your team",
    ],
    process: [
      {
        title: "Process discovery & analysis",
        description:
          "Identify bottlenecks, document flows, and prioritize automations with the best ROI.",
      },
      {
        title: "Intelligent automation design",
        description:
          "Build visual workflows with branching logic, AI-assisted decisions, and escalation paths.",
      },
      {
        title: "Monitoring & optimization",
        description:
          "Track performance, tune automations, and iterate from real usage.",
      },
    ],
    timeline:
      "Focused automations can go live in weeks; cross-system programs take longer. TODO: verify timelines after discovery.",
    techStack: [
      "Zapier / Make.com",
      "Node.js / NestJS",
      "AWS",
      "Supabase / PostgreSQL",
      "LangChain / CrewAI (where AI decisions help)",
    ],
    relatedCaseStudy: {
      ...dialcomCaseStudy,
      note: "Dialcom combines CRM, OMS, and voice workflows — relevant reference for integrated ops automation.",
    },
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Number of systems integrated", "Complexity of business rules"] },
    faq: [
      {
        q: "Do you replace our existing tools?",
        a: "Usually no — we automate between the tools you already use and add orchestration where needed.",
      },
      {
        q: "Can humans stay in the loop?",
        a: "Yes. Approvals, exceptions, and manual checkpoints are built into the design.",
      },
      {
        q: "What if a workflow fails?",
        a: "We add error handling, alerts, and recovery paths so failures are visible and fixable quickly.",
      },
      {
        q: "How do you measure success?",
        a: "We agree KPIs in discovery (time saved, error rate, throughput). TODO: verify reporting format per client.",
      },
    ],
    heroImage: "/Business-Cards/Business Workflow Automation.png",
  },
  {
    slug: "sales-marketing",
    category: "ai",
    path: "/ai-automation/sales-marketing",
    headline: "AI Sales & Marketing Automation",
    subheadline:
      "Supercharge your sales and marketing efforts with AI-powered automation that personalizes customer experiences, optimizes campaigns, and drives measurable growth across all channels.",
    whoFor: [
      "Sales teams that need faster lead follow-up and qualification",
      "Marketing teams running multi-channel campaigns with limited bandwidth",
      "Growth leaders who want personalization without adding headcount",
    ],
    problem:
      "Leads go cold when follow-up is slow, and campaigns stay generic when teams cannot personalize at scale. Data lives in silos, so scoring and routing stay manual.",
    deliverables: [
      "Lead capture, scoring, and routing automation",
      "Personalized email or message sequences (where approved)",
      "Campaign orchestration hooks and performance dashboards",
      "CRM integration and attribution setup",
      "Playbooks and documentation for your team",
    ],
    process: discoveryProcess(
      "Implement automations, content templates, and CRM connections in short demo cycles.",
      "Launch campaigns, monitor performance, and optimize from real conversion data.",
    ),
    timeline:
      "Initial automations often ship in weeks; full funnel programs vary by channel count. TODO: verify.",
    techStack: [
      "CRM APIs (HubSpot, Salesforce, etc.) — TODO: verify per client",
      "Node.js / Python",
      "Email & ads platform integrations",
      "Analytics (GA4, Meta, etc.)",
      "LLMs for copy assistance where appropriate",
    ],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Number of channels and CRM depth", "Content and compliance review needs"] },
    faq: [
      {
        q: "Will AI write all our marketing copy?",
        a: "We use AI to draft and personalize where it helps; your team approves brand-sensitive content before send.",
      },
      {
        q: "Can you work with our existing CRM?",
        a: "Yes — we integrate with common CRMs and custom APIs. Fit is confirmed on discovery.",
      },
      {
        q: "How do you handle data privacy?",
        a: "We follow your policies and applicable regulations; specifics are scoped in the proposal. TODO: verify compliance requirements per region.",
      },
      {
        q: "What results should we expect?",
        a: "Outcomes depend on baseline and channel mix. We set measurable targets in discovery — no guaranteed ROI figures without audit.",
      },
    ],
    heroImage: "/Business-Cards/AI Sales & Marketing Automation.avif",
  },
  {
    slug: "data-analytics",
    category: "ai",
    path: "/ai-automation/data-analytics",
    headline: "Data, Analytics & AI Insight Systems",
    subheadline:
      "Transform your data into actionable intelligence with AI-powered analytics that uncover hidden patterns, predict future trends, and drive strategic decision-making across your organization.",
    whoFor: [
      "Teams with data scattered across tools and spreadsheets",
      "Leaders who need dashboards and forecasts, not static reports",
      "Product and ops teams exploring ML for predictions and alerts",
    ],
    problem:
      "Raw data piles up but decisions still rely on gut feel. Reporting is manual, slow, and outdated by the time it reaches stakeholders.",
    deliverables: [
      "Data pipeline design (ETL/ELT) and quality checks",
      "Dashboards and self-serve views for key KPIs",
      "Predictive models or alerts where data supports them",
      "Documentation and training for internal users",
      "Iteration plan after launch",
    ],
    process: [
      {
        title: "Advanced data processing",
        description:
          "Ingest, clean, and model data from your sources with scalable pipelines.",
      },
      {
        title: "AI-powered analytics & insights",
        description:
          "Add forecasting, anomaly detection, or NL queries where they add clear value.",
      },
      {
        title: "Visualization & reporting",
        description:
          "Ship interactive dashboards and automated reports your team will actually use.",
      },
    ],
    timeline:
      "Dashboard MVP often takes weeks; full warehouse + ML programs take longer. TODO: verify per data maturity.",
    techStack: [
      "PostgreSQL / Supabase",
      "Python",
      "AWS",
      "BI tools (Metabase, custom Next.js dashboards, etc.) — TODO: verify choice per client",
      "LangChain / ML libraries when needed",
    ],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Data sources and volume", "ML complexity"] },
    faq: [
      {
        q: "Do we need a data warehouse first?",
        a: "Not always. We start from what you have and recommend architecture that matches your stage.",
      },
      {
        q: "Who owns the data models and dashboards?",
        a: "You do — built in your accounts and repos unless we agree otherwise in writing.",
      },
      {
        q: "Can you work with our existing BI tool?",
        a: "Often yes. We confirm connectors and access on discovery.",
      },
      {
        q: "How accurate are predictions?",
        a: "Depends on data quality and history. We validate models before production and document limitations.",
      },
    ],
    heroImage: "/Business-Cards/Data Analytics & Scaling Roadmaps.png",
  },
  {
    slug: "custom-agents",
    category: "ai",
    path: "/ai-automation/custom-agents",
    headline: "Custom AI Agent Development",
    subheadline:
      "Build intelligent, purpose-built AI agents tailored to your specific business needs — from specialized task automation to complex decision-making systems.",
    whoFor: [
      "Businesses with workflows too specific for off-the-shelf chatbots",
      "Teams orchestrating multiple agents or tools behind one experience",
      "Products adding autonomous or semi-autonomous AI features",
    ],
    problem:
      "Generic AI tools rarely match your domain rules, integrations, or compliance needs. You need agents that execute real tasks safely in your environment.",
    deliverables: [
      "Agent architecture and behavior design for your domain",
      "Tool/API integrations and guardrails",
      "Multi-step task automation with human-in-the-loop options",
      "Deployment, monitoring, and logging",
      "Runbooks and iteration roadmap",
    ],
    process: [
      {
        title: "Agent architecture & design",
        description:
          "Define capabilities, knowledge boundaries, personality, and security requirements.",
      },
      {
        title: "Intelligent task automation",
        description:
          "Implement workflows, decision logic, exception handling, and learning loops where appropriate.",
      },
      {
        title: "Integration & deployment",
        description:
          "Deploy to cloud or your infrastructure with monitoring and support handoff.",
      },
    ],
    timeline:
      "Single-purpose agents can ship in weeks; multi-agent systems take longer. TODO: verify.",
    techStack: [
      "LangChain / CrewAI",
      "Python / Node.js",
      "NestJS",
      "Supabase / PostgreSQL",
      "AWS",
    ],
    relatedCaseStudy: dialcomCaseStudy,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Agent complexity and tool count", "Security and compliance tier"] },
    faq: [
      {
        q: "How is this different from a chatbot?",
        a: "Agents can call tools, update systems, and run multi-step tasks — not just answer questions.",
      },
      {
        q: "Can agents work with our private data?",
        a: "Yes, with access controls and deployment options scoped in the proposal. TODO: verify data residency needs.",
      },
      {
        q: "Do you support multi-agent setups?",
        a: "Yes — we design orchestration when one agent is not enough.",
      },
      {
        q: "What about maintenance after launch?",
        a: "We offer retainers for updates, model changes, and monitoring. Scope is agreed up front.",
      },
    ],
    heroImage: "/Business-Cards/Custom AI Agent Development.webp",
  },
  {
    slug: "web-development",
    category: "ai",
    path: "/ai-automation/web-development",
    headline: "Web Development",
    subheadline:
      "Build modern, scalable web applications with cutting-edge technologies and AI-powered development tools — from responsive frontends to robust backends.",
    whoFor: [
      "Startups shipping an MVP or customer portal",
      "Teams rebuilding legacy web apps on modern stacks",
      "Businesses pairing web apps with AI features",
    ],
    problem:
      "Slow, fragile, or hard-to-maintain web apps block growth. You need performant, secure full-stack delivery without endless rework.",
    deliverables: [
      "Frontend and backend implementation to agreed scope",
      "API design (REST/GraphQL) and database schema",
      "CI/CD and deployment setup",
      "Performance and security baseline review",
      "Documentation and source handoff",
    ],
    process: [
      {
        title: "Frontend development",
        description:
          "React/Next.js (or agreed stack) UI with responsive, accessible patterns.",
      },
      {
        title: "Backend development",
        description:
          "Services, APIs, and data layers built for scale and clarity.",
      },
      {
        title: "DevOps & deployment",
        description:
          "Automated pipelines, hosting, and monitoring for reliable releases.",
      },
    ],
    timeline:
      "MVPs often range from weeks to a few months depending on scope. TODO: verify per feature set.",
    techStack: [
      "Next.js / React",
      "Node.js / NestJS",
      "TypeScript",
      "PostgreSQL / Supabase",
      "AWS / Vercel",
    ],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Feature count and design depth", "Third-party integrations"] },
    faq: [
      {
        q: "Do you only build with Next.js?",
        a: "Next.js is our default for new apps; we match the stack to your constraints when needed.",
      },
      {
        q: "Who owns the code?",
        a: "You do — repos and accounts are yours unless otherwise agreed.",
      },
      {
        q: "Can you work with an existing design?",
        a: "Yes — we implement from Figma or your design system.",
      },
      {
        q: "Do you handle hosting?",
        a: "We can deploy to Vercel, AWS, or your preferred provider and document runbooks.",
      },
    ],
    heroImage: "/Business-Cards/webdevelopment.png",
  },
  {
    slug: "mobile-development",
    category: "ai",
    path: "/ai-automation/mobile-development",
    headline: "Mobile App Development",
    subheadline:
      "Create powerful native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
    whoFor: [
      "Brands launching a customer-facing mobile app",
      "Teams needing one codebase for iOS and Android",
      "Products adding on-device or cloud AI features to mobile",
    ],
    problem:
      "Mobile users expect speed, polish, and reliability. Building twice for iOS and Android drains budget unless the approach is deliberate.",
    deliverables: [
      "App architecture and UI implementation",
      "API integration and offline/error handling",
      "App store submission support (where in scope)",
      "Performance testing baseline",
      "Source code and build documentation",
    ],
    process: [
      {
        title: "Native mobile development",
        description:
          "Swift/Kotlin paths when platform-specific UX is required.",
      },
      {
        title: "Cross-platform development",
        description:
          "React Native or Flutter when shared codebase fits timeline and budget.",
      },
      {
        title: "AI-powered mobile features",
        description:
          "Optional ML, personalization, or voice features integrated safely.",
      },
    ],
    timeline:
      "Simple apps may ship in weeks; feature-rich apps take months. TODO: verify.",
    techStack: ["React Native", "Flutter", "Swift / Kotlin", "Node.js backends", "AWS"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Platforms (iOS, Android, both)", "Native vs cross-platform choice"] },
    faq: [
      {
        q: "Native or cross-platform — how do you choose?",
        a: "We recommend based on UX needs, timeline, and budget on the discovery call.",
      },
      {
        q: "Do you publish to the app stores?",
        a: "We can assist with submission when included in scope; store accounts stay yours.",
      },
      {
        q: "Can you maintain the app after launch?",
        a: "Yes via support retainers — OS updates, bug fixes, and feature work.",
      },
      {
        q: "How do you handle backend APIs?",
        a: "We build or integrate existing APIs; contract is defined in the proposal.",
      },
    ],
    heroImage: "/Business-Cards/mobiledevelopment.avif",
  },
  {
    slug: "ui-ux",
    category: "ai",
    path: "/ai-automation/ui-ux",
    headline: "UI/UX Design",
    subheadline:
      "Create beautiful, intuitive user experiences that delight users and drive business success — from research and wireframes to production-ready design.",
    whoFor: [
      "Teams launching a new product or major redesign",
      "Founders who need UX clarity before development",
      "Companies scaling a design system across surfaces",
    ],
    problem:
      "Poor UX erodes trust and conversion. Without research and consistent patterns, every screen becomes a one-off guess.",
    deliverables: [
      "User research summary and journey maps (as scoped)",
      "Wireframes and high-fidelity UI",
      "Interactive prototype for key flows",
      "Design system or component specs for dev handoff",
      "Usability review recommendations",
    ],
    process: [
      {
        title: "User research & strategy",
        description:
          "Personas, journeys, and success metrics aligned to business goals.",
      },
      {
        title: "Design & prototyping",
        description:
          "Visual design, responsive layouts, and clickable prototypes.",
      },
      {
        title: "Implementation support",
        description:
          "Dev handoff, QA on UI fidelity, and iteration from feedback.",
      },
    ],
    timeline:
      "Focused flows can ship in weeks; full product design takes longer. TODO: verify.",
    techStack: ["Figma", "Design tokens / component libraries", "Accessibility (WCAG) review", "Prototyping tools"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Number of screens and flows", "Research depth"] },
    faq: [
      {
        q: "Do you only design, or also develop?",
        a: "We offer both — design-only or design + build depending on your needs.",
      },
      {
        q: "Will developers get specs they can use?",
        a: "Yes — Figma, redlines, and component notes for smooth handoff.",
      },
      {
        q: "Do you run user testing?",
        a: "We can include moderated or lightweight tests when scoped.",
      },
      {
        q: "Can you align with our existing brand?",
        a: "Absolutely — we extend brand guidelines into product UI.",
      },
    ],
    heroImage: "/Business-Cards/UI:UXDesign.png",
  },
  {
    slug: "cloud",
    category: "ai",
    path: "/ai-automation/cloud",
    headline: "Cloud Application Development",
    subheadline:
      "Build scalable, secure cloud applications on modern platforms — from microservices to serverless architectures that grow with your business.",
    whoFor: [
      "Teams moving legacy apps to the cloud",
      "Startups needing scalable infrastructure from day one",
      "Organizations standardizing on AWS or hybrid setups",
    ],
    problem:
      "On-prem or ad-hoc hosting limits scale and reliability. Without cloud-native design, costs spike and deployments stay risky.",
    deliverables: [
      "Cloud architecture design and security baseline",
      "Application and API implementation",
      "IaC templates and CI/CD pipelines",
      "Monitoring, logging, and backup strategy",
      "Cost and scaling guidance",
    ],
    process: [
      {
        title: "Cloud architecture & design",
        description:
          "Microservices, serverless, or hybrid patterns matched to your workload.",
      },
      {
        title: "Cloud application development",
        description:
          "Build, containerize, and integrate cloud services securely.",
      },
      {
        title: "DevOps & cloud operations",
        description:
          "Automate deploys, observability, and ongoing ops runbooks.",
      },
    ],
    timeline:
      "Architecture and first deploy often take weeks; full migrations vary widely. TODO: verify.",
    techStack: ["AWS", "Docker / Kubernetes (when needed)", "Node.js / NestJS", "Terraform / IaC", "Supabase / RDS"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Environment count and compliance", "Migration complexity"] },
    faq: [
      {
        q: "Which cloud providers do you support?",
        a: "AWS is our primary depth; we evaluate others when client-standard requires it.",
      },
      {
        q: "Can you reduce our cloud bill?",
        a: "We right-size resources and automate scaling; savings depend on current setup. TODO: verify with audit.",
      },
      {
        q: "Do you offer 24/7 ops?",
        a: "Extended support is available via retainer — hours defined in contract.",
      },
      {
        q: "How do you handle security?",
        a: "Least-privilege IAM, encryption, and review checkpoints — detailed in proposal.",
      },
    ],
    heroImage: "/Business-Cards/Cloud Application.png",
  },
  {
    slug: "qa-support",
    category: "ai",
    path: "/ai-automation/qa-support",
    headline: "Quality Assurance, Maintenance & Support",
    subheadline:
      "Keep applications running flawlessly with QA testing, ongoing maintenance, and support — from automated tests to performance and security checks.",
    whoFor: [
      "Teams without dedicated QA capacity",
      "Products post-launch that need stable maintenance",
      "Companies preparing for releases or compliance reviews",
    ],
    problem:
      "Releases break in production when testing is rushed. Without monitoring and support, small bugs become customer-facing incidents.",
    deliverables: [
      "Test strategy and automated suite (as scoped)",
      "Manual exploratory and regression passes",
      "Monitoring and incident response setup",
      "Patch and dependency update process",
      "Support tier documentation",
    ],
    process: [
      {
        title: "Quality assurance & testing",
        description:
          "Automated and manual testing across browsers, devices, and critical paths.",
      },
      {
        title: "Monitoring & maintenance",
        description:
          "Uptime checks, alerts, and proactive fixes for performance and security.",
      },
      {
        title: "Support & optimization",
        description:
          "Ticket handling, enhancements, and continuous improvement cycles.",
      },
    ],
    timeline:
      "Test sprint kickoff can start within days; ongoing support is retainer-based. TODO: verify SLAs.",
    techStack: [
      "Playwright / Cypress — TODO: verify tool choice per stack",
      "CI/CD integrations",
      "Error tracking (Sentry, etc.) — TODO: verify per client",
      "AWS / hosting monitors",
    ],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Coverage hours and severity SLAs", "Application complexity"] },
    faq: [
      {
        q: "Can you test an app you did not build?",
        a: "Yes — we audit coverage and propose a plan after codebase access.",
      },
      {
        q: "What support tiers do you offer?",
        a: "L1–L3 style coverage is scoped in the retainer. TODO: publish tier details.",
      },
      {
        q: "Do you perform security testing?",
        a: "Baseline security and dependency scans can be included; deep pen-tests may need a specialist partner.",
      },
      {
        q: "How fast do you respond to incidents?",
        a: "Response times depend on your retainer tier. TODO: verify committed SLAs.",
      },
    ],
    heroImage: "/Business-Cards/quality-control.png",
  },
  {
    slug: "store-setup",
    category: "ecommerce",
    path: "/ecommerce/store-setup",
    headline: "Store Setup & Development",
    subheadline:
      "Launch your e-commerce store from scratch — Shopify, WooCommerce, or custom — built to convert visitors into customers.",
    whoFor: [
      "Brands launching their first online store",
      "Businesses migrating from another platform",
      "Teams needing payments, shipping, and catalog configured correctly",
    ],
    problem:
      "A half-configured store loses sales at checkout. Themes, apps, and integrations must work together on day one.",
    deliverables: [
      "Platform setup (Shopify, WooCommerce, or custom as scoped)",
      "Theme customization and key page templates",
      "Payment, shipping, and tax configuration",
      "Essential app integrations and analytics",
      "Launch checklist and handoff training",
    ],
    process: [
      {
        title: "Platform selection & setup",
        description:
          "Recommend platform, configure store foundation, and migrate data if needed.",
      },
      {
        title: "Design & user experience",
        description:
          "Conversion-focused layout for home, collection, product, and cart.",
      },
      {
        title: "Integration & configuration",
        description:
          "Payments, fulfillment, email, and tracking wired and tested.",
      },
    ],
    timeline:
      "Many store launches complete in a few weeks; custom builds take longer. TODO: verify.",
    techStack: ["Shopify", "WooCommerce", "Stripe", "PayPal", "Next.js (headless when needed)"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Platform choice", "SKU count and custom features"] },
    faq: [
      {
        q: "Shopify or WooCommerce — which do you recommend?",
        a: "We compare total cost, features, and your team skills on discovery — no one-size answer.",
      },
      {
        q: "Do you provide product photography?",
        a: "That is a separate branding/creative scope; we can coordinate if needed.",
      },
      {
        q: "Will we own the store and accounts?",
        a: "Yes — store, domain, and payment accounts remain in your name.",
      },
      {
        q: "Do you offer post-launch support?",
        a: "Yes — see Maintenance & Long-Term Store Management or a custom retainer.",
      },
    ],
    heroImage: "/Business-Cards/StoreSetup&Development.png",
  },
  {
    slug: "product-sourcing",
    category: "ecommerce",
    path: "/ecommerce/product-sourcing",
    headline: "Product Sourcing & Supply Chain Management",
    subheadline:
      "Find, evaluate, and manage suppliers for your e-commerce business — from product research to quality control and logistics.",
    whoFor: [
      "E-commerce brands sourcing from overseas suppliers",
      "Operators scaling SKU count who need reliable QC",
      "Teams new to import, compliance, and freight coordination",
    ],
    problem:
      "Bad suppliers and unclear logistics erode margins and damage brand trust. Without structured sourcing, quality and lead times stay unpredictable.",
    deliverables: [
      "Product and supplier research (as scoped)",
      "Supplier vetting and sample coordination",
      "QC checkpoints and documentation",
      "Freight and fulfillment coordination support",
      "Import/compliance checklist — TODO: verify jurisdiction-specific requirements",
    ],
    process: [
      {
        title: "Product research & analysis",
        description:
          "Trend, margin, and demand assessment before you commit to inventory.",
      },
      {
        title: "Supplier sourcing & management",
        description:
          "Identify factories, negotiate terms, and maintain backup suppliers.",
      },
      {
        title: "Quality control & logistics",
        description:
          "Inspections, packaging, shipping, and customs documentation support.",
      },
    ],
    timeline:
      "Research sprints can start quickly; production runs depend on supplier lead times. TODO: verify.",
    techStack: [
      "Sourcing platforms and spreadsheets — TODO: verify tools used",
      "QC checklists and reporting",
      "3PL integrations (where applicable)",
    ],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Product categories and MOQs", "QC depth and travel if any"] },
    faq: [
      {
        q: "Do you guarantee supplier quality?",
        a: "We reduce risk with vetting and QC; guarantees depend on contracts with factories — detailed in scope.",
      },
      {
        q: "Which regions do you source from?",
        a: "We have China sourcing expertise noted in legacy copy. TODO: verify current regions and partners.",
      },
      {
        q: "Can you manage ongoing reorders?",
        a: "Yes — ongoing vendor management can be part of a retainer.",
      },
      {
        q: "Who pays suppliers?",
        a: "Typically you pay factories and freight directly; we clarify flows in the proposal.",
      },
    ],
    heroImage: "/Business-Cards/Product Sourcing & Supply Chain Management.png",
  },
  {
    slug: "marketing-growth",
    category: "ecommerce",
    path: "/ecommerce/marketing-growth",
    headline: "Marketing & Growth Systems",
    subheadline:
      "Drive traffic and conversions with data-driven marketing strategies — paid ads, email, SMS, and optimization that scale your store.",
    whoFor: [
      "Stores with product-market fit needing predictable acquisition",
      "Teams struggling to connect ad spend to revenue",
      "Brands building retention via email and SMS",
    ],
    problem:
      "Ad costs rise while attribution stays fuzzy. Without integrated growth systems, CAC climbs and repeat revenue stalls.",
    deliverables: [
      "Channel strategy and campaign structure",
      "Ad account setup and creative iteration rhythm",
      "Email/SMS flows (welcome, cart, win-back) as scoped",
      "CRO recommendations on key landing pages",
      "Reporting dashboard for ROAS and LTV — TODO: verify metrics available",
    ],
    process: [
      {
        title: "Paid advertising & campaigns",
        description:
          "Meta, Google, and other channels structured for test-and-scale.",
      },
      {
        title: "Email & SMS marketing",
        description:
          "Automations that recover carts and nurture repeat buyers.",
      },
      {
        title: "Growth optimization",
        description:
          "Continuous A/B tests on funnel, offers, and creative.",
      },
    ],
    timeline:
      "Initial campaigns can launch in weeks; optimization is ongoing. TODO: verify.",
    techStack: ["Meta Ads", "Google Ads", "Klaviyo / email ESPs — TODO: verify per client", "Shopify analytics", "GA4"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Ad spend management vs strategy-only", "Number of channels"] },
    faq: [
      {
        q: "Do you manage ad spend directly?",
        a: "We can operate in your ad accounts or advise your in-house team — scoped upfront.",
      },
      {
        q: "What minimum budget do you need?",
        a: "Depends on niche and CAC targets. TODO: verify minimums we accept.",
      },
      {
        q: "Do you create ad creative?",
        a: "We iterate creative with your brand assets; full production can tie to branding services.",
      },
      {
        q: "How do you report results?",
        a: "Regular reports tied to agreed KPIs — no invented performance numbers in marketing materials.",
      },
    ],
    heroImage: "/Business-Cards/Marketing & Growth Systems.png",
  },
  {
    slug: "sales-funnel",
    category: "ecommerce",
    path: "/ecommerce/sales-funnel",
    headline: "Sales Funnel Optimization",
    subheadline:
      "Transform visitors into paying customers with optimized funnels — audits, CRO, upsells, and recovery flows across the journey.",
    whoFor: [
      "Stores with traffic but weak conversion rates",
      "Teams seeing high cart abandonment",
      "Brands ready to test offers, bundles, and checkout UX",
    ],
    problem:
      "Traffic is wasted when product pages, cart, and checkout leak revenue. Small UX fixes compound when tested systematically.",
    deliverables: [
      "Funnel audit and prioritized fix list",
      "CRO implementations on scoped pages",
      "Upsell/cross-sell and bundle experiments",
      "Cart abandonment recovery setup",
      "Test roadmap and results readouts",
    ],
    process: [
      {
        title: "Funnel analysis & auditing",
        description:
          "Map drop-offs, review analytics, and benchmark key steps.",
      },
      {
        title: "Conversion rate optimization",
        description:
          "Ship UX, copy, and trust improvements with A/B tests where viable.",
      },
      {
        title: "Revenue enhancement",
        description:
          "Upsells, bundles, and retention hooks aligned to margin goals.",
      },
    ],
    timeline:
      "Audits can complete in 1–2 weeks; test cycles run ongoing. TODO: verify.",
    techStack: ["Shopify / WooCommerce", "Analytics & heatmaps — TODO: verify tools", "A/B testing apps", "Stripe checkout optimizations"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Store size and SKU complexity", "Number of experiments"] },
    faq: [
      {
        q: "Do you guarantee conversion lifts?",
        a: "We prioritize tests with strong hypotheses; outcomes vary — we report honestly.",
      },
      {
        q: "Can you audit before we hire you for implementation?",
        a: "Yes — audit-first engagements are available. TODO: verify audit offer details.",
      },
      {
        q: "Will changes break our theme?",
        a: "We use staging and backups; risky changes are tested before production.",
      },
      {
        q: "How do you measure success?",
        a: "Agreed metrics such as conversion rate, AOV, and checkout completion — baselined before tests.",
      },
    ],
    heroImage: "/Business-Cards/SalesFunnelOptimization.png",
  },
  {
    slug: "operations-automation",
    category: "ecommerce",
    path: "/ecommerce/operations-automation",
    headline: "Operations & Automation",
    subheadline:
      "Streamline e-commerce operations with AI-powered automation — inventory, orders, support, and workflows across your stack.",
    whoFor: [
      "Stores scaling order volume with manual ops",
      "Support teams answering the same tickets repeatedly",
      "Operators connecting Shopify, CRM, and fulfillment tools",
    ],
    problem:
      "Operational drag grows with every SKU and channel. Manual order handling and support backlogs eat margin and slow growth.",
    deliverables: [
      "Support bot or workflow automation (as scoped)",
      "Inventory and order automation rules",
      "Integrations via Zapier/Make or custom APIs",
      "Reporting automations for ops KPIs",
      "Documentation and training",
    ],
    process: [
      {
        title: "AI customer support & chatbots",
        description:
          "Instant answers on chat/WhatsApp with escalation to humans.",
      },
      {
        title: "Inventory & order management",
        description:
          "Alerts, routing, and sync across channels and 3PLs.",
      },
      {
        title: "Workflow & integration automation",
        description:
          "Connect CRM, email, and fulfillment with reliable automations.",
      },
    ],
    timeline:
      "Quick wins in weeks; full ops stack automation takes longer. TODO: verify.",
    techStack: ["Shopify", "Zapier / Make.com", "Node.js", "LangChain (support AI)", "Supabase"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Order volume and channel count", "Support automation depth"] },
    faq: [
      {
        q: "Can automation work with our 3PL?",
        a: "We integrate when APIs or EDI exist — confirmed on discovery.",
      },
      {
        q: "Will bots replace our support team?",
        a: "Bots handle repetitive tiers; humans focus on complex cases.",
      },
      {
        q: "What if an automation misfires?",
        a: "We add logging, alerts, and rollback paths before go-live.",
      },
      {
        q: "Do you support B2B wholesale flows?",
        a: "Possible with custom rules — scoped in proposal. TODO: verify typical setups.",
      },
    ],
    heroImage: "/Business-Cards/Operations & Automation(AI + Workflow + Support).png",
  },
  {
    slug: "data-analytics",
    category: "ecommerce",
    path: "/ecommerce/data-analytics",
    headline: "Data Analytics & Scaling Roadmaps",
    subheadline:
      "Make data-driven decisions with e-commerce analytics and scaling roadmaps — dashboards, forecasting, and growth planning.",
    whoFor: [
      "Store owners flying blind on SKU and channel performance",
      "Teams planning inventory and marketing spend from spreadsheets",
      "Brands preparing to scale into new markets or channels",
    ],
    problem:
      "Shopify reports alone rarely tell the full margin story. Without unified analytics, scaling decisions become reactive and expensive.",
    deliverables: [
      "Custom dashboards for sales, marketing, and product KPIs",
      "Forecasting models where data allows",
      "Marketing ROI and attribution views — TODO: verify data quality needs",
      "Scaling roadmap with prioritized initiatives",
      "Training on reading and acting on reports",
    ],
    process: [
      {
        title: "Advanced analytics & reporting",
        description:
          "Centralize store, ads, and ops metrics into actionable views.",
      },
      {
        title: "AI-powered insights & forecasting",
        description:
          "Demand, LTV, and churn signals when historical data supports models.",
      },
      {
        title: "Strategic scaling & growth planning",
        description:
          "Turn insights into a phased roadmap with risks called out.",
      },
    ],
    timeline:
      "Dashboard MVP in weeks; roadmap workshops scheduled early. TODO: verify.",
    techStack: ["Shopify / Woo APIs", "PostgreSQL / Supabase", "Python", "GA4", "Meta/Google ads data"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Number of data sources", "Forecasting complexity"] },
    faq: [
      {
        q: "Can you connect ad platforms to revenue?",
        a: "We set up attribution views; accuracy depends on tracking hygiene. TODO: verify pixel/CAPI status.",
      },
      {
        q: "Do you replace our accountant's reports?",
        a: "No — we focus on operational and growth analytics, not statutory accounting.",
      },
      {
        q: "What if our data is messy?",
        a: "We include cleanup in scope or phase 1 before advanced models.",
      },
      {
        q: "Is the roadmap a one-time doc?",
        a: "We deliver a living plan and can refresh quarterly on retainer.",
      },
    ],
    heroImage: "/Business-Cards/Data Analytics & Scaling Roadmaps.png",
  },
  {
    slug: "branding-creative",
    category: "ecommerce",
    path: "/ecommerce/branding-creative",
    headline: "Branding & Creative Production",
    subheadline:
      "Build a powerful brand with logo, guidelines, photography, and creative assets that drive loyalty in crowded markets.",
    whoFor: [
      "New DTC brands needing identity before launch",
      "Stores refreshing visual identity and content",
      "Teams lacking in-house creative for campaigns",
    ],
    problem:
      "Inconsistent creative weakens trust and ad performance. Without guidelines and quality assets, every launch looks different.",
    deliverables: [
      "Logo and brand identity kit (as scoped)",
      "Brand guidelines (color, type, voice)",
      "Product and lifestyle creative — TODO: verify production location",
      "Social and ad asset templates",
      "Handoff files for web and print",
    ],
    process: [
      {
        title: "Brand identity & design",
        description:
          "Positioning, visual identity, and messaging foundations.",
      },
      {
        title: "Product photography & visual content",
        description:
          "Shoots and edits optimized for e-commerce and ads.",
      },
      {
        title: "Marketing & promotional materials",
        description:
          "Templates and campaigns aligned to your channels.",
      },
    ],
    timeline:
      "Identity projects often take weeks; shoots depend on logistics. TODO: verify.",
    techStack: ["Figma", "Adobe Creative Suite", "E-commerce image specs (Shopify)", "Video editing — TODO: verify tools"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Number of SKUs shot", "Video vs static deliverables"] },
    faq: [
      {
        q: "Do you own the final files?",
        a: "You receive agreed source and export files upon payment milestones in contract.",
      },
      {
        q: "Can you match an existing partial brand?",
        a: "Yes — we extend or refine what you already have.",
      },
      {
        q: "Do you handle influencer shoots?",
        a: "Can be scoped with partners. TODO: verify offering details.",
      },
      {
        q: "How many revision rounds are included?",
        a: "Defined in proposal — typically 2–3 rounds per milestone. TODO: verify standard policy.",
      },
    ],
    heroImage: "/Business-Cards/Branding & Creative Production.png",
  },
  {
    slug: "maintenance",
    category: "ecommerce",
    path: "/ecommerce/maintenance",
    headline: "Maintenance & Long-Term Store Management",
    subheadline:
      "Keep your e-commerce store fast, secure, and profitable with ongoing maintenance, monitoring, and optimization.",
    whoFor: [
      "Store owners who want tech off their plate",
      "Teams without dedicated Shopify/Woo developers",
      "Brands needing security patches and performance tuning",
    ],
    problem:
      "Stores degrade without updates: apps break, speed slips, and security gaps appear. Reactive fixes cost more than steady care.",
    deliverables: [
      "Platform, theme, and app updates",
      "Uptime and performance monitoring",
      "Security patches and backup verification",
      "Small CRO and SEO fixes within retainer hours",
      "Monthly summary and backlog recommendations",
    ],
    process: [
      {
        title: "Technical maintenance & updates",
        description:
          "Scheduled updates with staging validation before production.",
      },
      {
        title: "Monitoring & support",
        description:
          "Alerts, incident response, and ticket handling per SLA.",
      },
      {
        title: "Ongoing optimization & growth",
        description:
          "Iterative UX, SEO, and conversion improvements.",
      },
    ],
    timeline:
      "Retainers start after onboarding; emergency support per SLA. TODO: verify onboarding duration.",
    techStack: ["Shopify / WooCommerce", "Theme & app ecosystems", "Monitoring tools — TODO: verify", "CDN and performance tooling"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "Monthly hours and response SLA", "Store complexity and app count"] },
    faq: [
      {
        q: "What is not included in maintenance?",
        a: "Major new features are quoted separately; retainers cover agreed support scope.",
      },
      {
        q: "Do you take backups before changes?",
        a: "Yes — backup verification is part of our update process.",
      },
      {
        q: "Can you manage multiple stores?",
        a: "Yes — pricing scales with store count and shared playbooks.",
      },
      {
        q: "How do we request work?",
        a: "Via agreed channel (email, Slack, etc.). TODO: verify standard client portal.",
      },
    ],
    heroImage: "/Business-Cards/Maintenance &Long-TermStore Management.png",
  },
  {
    slug: "ai-solutions",
    category: "ecommerce",
    path: "/ecommerce/ai-solutions",
    headline: "AI for eCommerce",
    subheadline:
      "Enhance your store with AI — support bots, recommendations, returns automation, upsell logic, and ops intelligence.",
    whoFor: [
      "E-commerce brands adding AI support without hiring a full AI team",
      "Stores wanting recommendations and upsell personalization",
      "Operators automating returns, reviews, or WhatsApp commerce",
    ],
    problem:
      "Customers expect instant answers and relevant products. Manual merchandising and support cannot keep up as catalog and order volume grow.",
    deliverables: [
      "Scoped AI feature (bot, recommendations, or automation)",
      "Integration with Shopify/Woo and support tools",
      "Guardrails, escalation, and monitoring",
      "Performance review and tuning plan",
      "Team training on operating the system",
    ],
    process: [
      {
        title: "AI customer experience",
        description:
          "Chat, voice, or WhatsApp assistants plus personalization hooks.",
      },
      {
        title: "AI sales & marketing automation",
        description:
          "Upsell, email/SMS triggers, and segmentation where data allows.",
      },
      {
        title: "AI operations & analytics",
        description:
          "Forecasting, fraud signals, and automated ops reporting.",
      },
    ],
    timeline:
      "Single AI features often ship in weeks; bundled programs take longer. TODO: verify.",
    techStack: ["LangChain / LLM providers", "Shopify", "Node.js", "Supabase", "WhatsApp Business API — TODO: verify"],
    relatedCaseStudy: null,
    pricing: { startingFrom: null, factors: [...defaultPricingFactors, "AI feature type and channels", "Catalog size and languages"] },
    faq: [
      {
        q: "Will AI hallucinate product answers?",
        a: "We ground responses in your catalog and policies with testing before launch.",
      },
      {
        q: "Can you integrate with our helpdesk?",
        a: "Yes for common platforms — confirmed on discovery.",
      },
      {
        q: "Is customer data sent to third-party models?",
        a: "Disclosed in architecture review; options include private deployments. TODO: verify preferred approach.",
      },
      {
        q: "Does this overlap with voice-chat services?",
        a: "Yes — e-commerce AI often includes chat/voice; we scope the right package for your stack.",
      },
    ],
    heroImage:
      "/Business-Cards/AI for eCommerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation).png",
  },
];

/** All 19 services. Slug is the key except `data-analytics`, keyed as `ai:data-analytics` and `ecommerce:data-analytics`. */
export const services: Record<string, ServiceContent> = Object.fromEntries(
  allServices.map((s) => {
    const key =
      s.slug === "data-analytics" ? `${s.category}:${s.slug}` : s.slug;
    return [key, s];
  }),
);

const compositeKey = (category: ServiceCategory, slug: ServiceSlug) =>
  slug === "data-analytics" ? `${category}:${slug}` : slug;

const slugIndex = new Map<string, ServiceContent[]>();
for (const s of allServices) {
  const list = slugIndex.get(s.slug) ?? [];
  list.push(s);
  slugIndex.set(s.slug, list);
}

export function getService(
  slug: ServiceSlug,
  category?: ServiceCategory,
): ServiceContent {
  if (category) {
    const service = services[compositeKey(category, slug)];
    if (!service) {
      throw new Error(`Service not found: ${category}/${slug}`);
    }
    return service;
  }

  const matches = slugIndex.get(slug);
  if (!matches?.length) {
    throw new Error(`Service not found: ${slug}`);
  }
  if (matches.length > 1) {
    throw new Error(
      `Service slug "${slug}" is ambiguous; pass category "ai" or "ecommerce".`,
    );
  }
  return matches[0];
}

export function getAllServices(): ServiceContent[] {
  return [...allServices];
}
