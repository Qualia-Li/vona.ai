import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
      },
      {
        protocol: "https",
        hostname: "serpapi.com",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/meet",
        destination: "https://calendly.com/quanlai/30min",
        permanent: true,
      },
      {
        source: "/demo",
        destination:
          "https://www.loom.com/share/bca84bcf13634344ae1e50d8acf19b71?sid=e8cea14f-ba95-45de-b909-5f8a4c358eda",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/((?!_next).*)",
        destination: "https://enception-ai.webflow.io/:path*",
      },
    ];
  },
};

export default nextConfig;
