import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fynktech-website.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'huggingface.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'langchain.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pinecone.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastapi.tiangolo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'supabase.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'planetscale.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vapi.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'elevenlabs.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rime.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.speechmatics.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.llamaindex.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'weaviate.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qdrant.tech',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'n8n.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.make.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tray.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'playwright.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pptr.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'robotframework.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.uipath.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui.shadcn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nestjs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'argo-cd.readthedocs.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
