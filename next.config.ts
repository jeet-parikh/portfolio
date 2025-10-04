import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/gh/devicons/devicon@latest/icons/**",
      },
      {
        protocol: "https",
        hostname: "langchain.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "developer.apple.com",
        port: "",
        pathname: "/assets/elements/icons/**",
      },
    ],
  },
};

export default nextConfig;
