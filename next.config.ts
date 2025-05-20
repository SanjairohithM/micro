import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.grainger.com"], // Simple way (Next.js 12+)
    // OR use remotePatterns (Next.js 13+ recommended)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.grainger.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;