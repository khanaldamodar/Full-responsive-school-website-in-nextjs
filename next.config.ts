import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    // Enable type checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enable linting during build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
