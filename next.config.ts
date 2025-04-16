import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports:["@chakra-ui/react"],
  },
  /* config options here */
};

export default nextConfig;
