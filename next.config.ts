import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"], // Add any image domains you'll use
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
};

export default nextConfig;
