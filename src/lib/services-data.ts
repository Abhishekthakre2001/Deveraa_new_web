// lib/services-data.ts
import {
  Bell,
  Brain,
  Cloud,
  Code2,
  Cpu,
  CreditCard,
  Fingerprint,
  Gauge,
  Globe,
  Layers,
  Lock,
  MessageSquare,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Wifi,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Tech = { name: string; slug: string; color: string; invert?: boolean };

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  highlights: string[];
  features: { icon: LucideIcon; title: string; text: string }[];
  tech: Tech[];
  faqs: { q: string; a: string }[];
};

const T = (name: string, slug: string, color: string, invert = false): Tech => ({
  name,
  slug,
  color,
  invert,
});

export const SERVICES: Record<string, Service> = {
  "web-development": {
    slug: "web-development",
    title: "Web Development",
    icon: Globe,
    tagline: "Fast, accessible websites and web apps that turn visitors into customers.",
    description:
      "From marketing sites to complex web platforms, we build with modern frameworks and solid engineering so your product loads fast, ranks well and scales with your business.",
    highlights: ["Blazing-fast load times", "SEO-ready from day one", "Responsive on every device"],
    features: [
      { icon: Zap, title: "Performance first", text: "Optimized rendering, image handling and caching for instant page loads." },
      { icon: Search, title: "SEO & accessibility", text: "Semantic markup and structured data so everyone can find and use your site." },
      { icon: Smartphone, title: "Responsive design", text: "Pixel-perfect layouts that adapt from phones to ultra-wide screens." },
      { icon: ShieldCheck, title: "Secure by default", text: "Best-practice authentication, input validation and hardened deployments." },
      { icon: Layers, title: "CMS & integrations", text: "Connect a headless CMS, payments, analytics and the tools your team uses." },
      { icon: Code2, title: "Maintainable code", text: "Typed, tested and documented code your team can extend with confidence." },
    ],
    tech: [
      T("React", "react", "61DAFB"),
      T("Next.js", "nextdotjs", "000000", true),
      T("TypeScript", "typescript", "3178C6"),
      T("Tailwind", "tailwindcss", "06B6D4"),
      T("Node.js", "nodedotjs", "5FA04E"),
      T("PostgreSQL", "postgresql", "4169E1"),
      T("GraphQL", "graphql", "E10098"),
      T("Vercel", "vercel", "000000", true),
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "Marketing sites typically take a few weeks, while larger web apps take a few months depending on scope. You'll get a clear timeline after our discovery call." },
      { q: "Can you improve my existing website?", a: "Yes. We audit your current site, then modernize the design, performance and code without losing your search rankings." },
      { q: "Do you offer support after launch?", a: "Yes. Our support plans cover updates, monitoring, fixes and new features." },
    ],
  },

  "mobile-apps": {
    slug: "mobile-apps",
    title: "Mobile Apps",
    icon: Smartphone,
    tagline: "iOS and Android apps with a native feel that users keep coming back to.",
    description:
      "We design and build high-performance mobile apps, from MVPs to full products, using cross-platform and native technologies, and we take care of store submission too.",
    highlights: ["iOS and Android", "Native-feel performance", "App store launch support"],
    features: [
      { icon: Layers, title: "Cross-platform efficiency", text: "One codebase for iOS and Android with React Native or Flutter, without compromising quality." },
      { icon: Gauge, title: "Native performance", text: "Smooth animations and gestures that feel at home on every device." },
      { icon: Wifi, title: "Offline & sync", text: "Apps that keep working on poor connections and sync when back online." },
      { icon: Bell, title: "Push notifications", text: "Re-engage users with targeted, timely notifications." },
      { icon: Fingerprint, title: "Secure authentication", text: "Biometric login, encrypted storage and secure API communication." },
      { icon: Rocket, title: "Store launch", text: "We handle builds, review guidelines and App Store and Google Play submission." },
    ],
    tech: [
      T("React Native", "react", "61DAFB"),
      T("Flutter", "flutter", "02569B"),
      T("Swift", "swift", "F05138"),
      T("Kotlin", "kotlin", "7F52FF"),
      T("Firebase", "firebase", "FFCA28"),
      T("TypeScript", "typescript", "3178C6"),
      T("Node.js", "nodedotjs", "5FA04E"),
      T("Figma", "figma", "F24E1E"),
    ],
    faqs: [
      { q: "Native or cross-platform: which should I choose?", a: "Cross-platform is faster and more cost-effective for most products. We recommend native when you need deep hardware access or maximum performance." },
      { q: "Will you publish the app to the stores?", a: "Yes. We prepare the listings, handle submission and guide you through the review process." },
      { q: "Can you take over an existing app?", a: "Yes. We review the codebase, fix outstanding issues and continue development from there." },
    ],
  },

  "saas-solutions": {
    slug: "saas-solutions",
    title: "SaaS Solutions",
    icon: Layers,
    tagline: "Scalable multi-tenant platforms with billing, auth and analytics built in from day one.",
    description:
      "We help founders and businesses turn an idea into a production-ready SaaS product, covering architecture, subscriptions, dashboards and everything needed to onboard customers.",
    highlights: ["Multi-tenant architecture", "Subscription billing", "Built to scale"],
    features: [
      { icon: Layers, title: "Multi-tenant architecture", text: "Secure data isolation and flexible workspaces for every customer." },
      { icon: CreditCard, title: "Subscription billing", text: "Plans, trials, invoices and payments with Stripe and other gateways." },
      { icon: Users, title: "Roles & permissions", text: "Granular access control for teams, admins and customers." },
      { icon: TrendingUp, title: "Analytics dashboards", text: "Usage and revenue insights that help you make better decisions." },
      { icon: Workflow, title: "APIs & integrations", text: "Public APIs and webhooks so customers can connect your product to theirs." },
      { icon: Lock, title: "Enterprise security", text: "SSO-ready auth, audit logs and encryption for demanding customers." },
    ],
    tech: [
      T("Next.js", "nextdotjs", "000000", true),
      T("TypeScript", "typescript", "3178C6"),
      T("Node.js", "nodedotjs", "5FA04E"),
      T("PostgreSQL", "postgresql", "4169E1"),
      T("Redis", "redis", "FF4438"),
      T("Stripe", "stripe", "635BFF"),
      T("Docker", "docker", "2496ED"),
      T("Supabase", "supabase", "3FCF8E"),
    ],
    faqs: [
      { q: "Can you build my SaaS MVP quickly?", a: "Yes. We scope a focused MVP to validate your idea fast, then iterate based on real user feedback." },
      { q: "Will the product scale as I grow?", a: "We design the architecture and infrastructure to scale, so growth means adding capacity rather than rewriting." },
      { q: "Do you integrate payments?", a: "Yes: subscriptions, usage-based billing, invoices and tax handling through providers like Stripe." },
    ],
  },

  "ai-ml": {
    slug: "ai-ml",
    title: "AI & ML",
    icon: Brain,
    tagline: "Practical AI that automates routine work and turns your data into decisions.",
    description:
      "From LLM-powered assistants to predictive models, we design AI features that solve real business problems and ship them with the monitoring and guardrails production needs.",
    highlights: ["LLM-powered assistants", "Workflow automation", "Private and secure by design"],
    features: [
      { icon: MessageSquare, title: "Chatbots & assistants", text: "Conversational AI trained on your content to support customers and teams." },
      { icon: Workflow, title: "Workflow automation", text: "Remove repetitive tasks with intelligent document, email and data processing." },
      { icon: TrendingUp, title: "Predictive analytics", text: "Forecast demand, churn and risk with models built on your own data." },
      { icon: Cpu, title: "Computer vision", text: "Image and video analysis for inspection, recognition and search." },
      { icon: Brain, title: "Custom model training", text: "Fine-tuned and custom models when off-the-shelf APIs aren't enough." },
      { icon: ShieldCheck, title: "Responsible AI", text: "Privacy, evaluation and guardrails so outputs are accurate and safe." },
    ],
    tech: [
      T("OpenAI", "openai", "000000", true),
      T("LangChain", "langchain", "1C3C3C", true),
      T("PyTorch", "pytorch", "EE4C2C"),
      T("TensorFlow", "tensorflow", "FF6F00"),
      T("Python", "python", "3776AB"),
      T("Hugging Face", "huggingface", "FFD21E"),
      T("FastAPI", "fastapi", "009688"),
      T("Docker", "docker", "2496ED"),
    ],
    faqs: [
      { q: "Do I need a lot of data?", a: "Not always. Many use cases work with pre-trained models and a small amount of your own data." },
      { q: "Is my data kept private?", a: "Yes. We design for privacy, using private deployments or enterprise APIs where needed." },
      { q: "How do you measure AI quality?", a: "We define success metrics up front, then use evaluation sets and monitoring to track accuracy over time." },
    ],
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: PenTool,
    tagline: "Research-led digital experiences that are intuitive, accessible and memorable.",
    description:
      "We turn customer needs and business goals into clear user journeys, polished interfaces and reusable design systems that help digital products feel effortless to use.",
    highlights: ["Research-backed decisions", "Accessible interfaces", "Reusable design systems"],
    features: [
      { icon: Search, title: "User research", text: "Understand your audience, their needs and the problems your product should solve." },
      { icon: Workflow, title: "Journey mapping", text: "Map key tasks and remove friction from the experiences your customers rely on." },
      { icon: Layers, title: "Wireframes & prototypes", text: "Explore layouts and interactions early with prototypes your team can test." },
      { icon: PenTool, title: "Visual interface design", text: "Create cohesive, polished interfaces that reflect your brand and product." },
      { icon: ShieldCheck, title: "Accessible by design", text: "Use inclusive patterns and clear interactions for a wider range of users." },
      { icon: Code2, title: "Developer handoff", text: "Deliver specifications and components that help engineering implement designs accurately." },
    ],
    tech: [
      T("Figma", "figma", "F24E1E"),
      T("FigJam", "figma", "F24E1E"),
      T("Storybook", "storybook", "FF4785"),
      T("React", "react", "61DAFB"),
      T("Next.js", "nextdotjs", "000000", true),
      T("TypeScript", "typescript", "3178C6"),
    ],
    faqs: [
      { q: "Can you improve the experience of an existing product?", a: "Yes. We review the current experience, identify usability issues and prioritize improvements based on user needs and business goals." },
      { q: "Do you deliver clickable prototypes?", a: "Yes. We create interactive prototypes to help your team validate flows and gather feedback before development." },
      { q: "Will the designs work on mobile and desktop?", a: "Yes. We design responsive experiences and document how layouts adapt across common screen sizes." },
    ],
  },

  "cloud-devops": {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    icon: Cloud,
    tagline: "Reliable cloud infrastructure and delivery pipelines built to scale with your product.",
    description:
      "We help teams deploy confidently with secure cloud architecture, automated delivery workflows and observability that keeps services dependable as they grow.",
    highlights: ["Automated deployments", "Secure cloud foundations", "Reliable, observable systems"],
    features: [
      { icon: Cloud, title: "Cloud architecture", text: "Design infrastructure around your workload, reliability goals and growth plans." },
      { icon: Workflow, title: "CI/CD automation", text: "Build repeatable pipelines that test and deliver changes with less manual effort." },
      { icon: ShieldCheck, title: "Infrastructure security", text: "Apply least-privilege access, secure configuration and practical safeguards." },
      { icon: Gauge, title: "Monitoring & observability", text: "Track system health and performance with metrics, logs and useful alerts." },
      { icon: Rocket, title: "Deployment strategy", text: "Use safe release practices that reduce downtime and make rollbacks predictable." },
      { icon: Lock, title: "Backup & recovery", text: "Plan backups and recovery procedures to protect data and business continuity." },
    ],
    tech: [
      T("Amazon Web Services", "amazonaws", "232F3E"),
      T("Google Cloud", "googlecloud", "4285F4"),
      T("Microsoft Azure", "microsoftazure", "0078D4"),
      T("Docker", "docker", "2496ED"),
      T("Kubernetes", "kubernetes", "326CE5"),
      T("Terraform", "terraform", "844FBA"),
      T("GitHub Actions", "githubactions", "2088FF"),
      T("Linux", "linux", "FCC624"),
    ],
    faqs: [
      { q: "Can you work with our current cloud provider?", a: "Yes. We can assess and improve infrastructure on AWS, Google Cloud, Azure and other platforms." },
      { q: "Can you automate our existing deployments?", a: "Yes. We can build or improve CI/CD pipelines to run checks and deploy releases consistently." },
      { q: "Do you provide ongoing cloud support?", a: "Yes. Support can include monitoring, incident response, maintenance and ongoing infrastructure improvements." },
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES);