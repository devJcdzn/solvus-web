import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ["s3.dev.solvus.io"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
    responseLimit: false,
  },
};

export default nextConfig;
