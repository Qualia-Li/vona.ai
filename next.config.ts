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
        hostname: "styles.redditmedia.com",
      },
      {
        protocol: "https",
        hostname: "www.redditstatic.com",
      },
      // Allow images from any domain for OG images
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
    ];
  },

};

export default nextConfig;
