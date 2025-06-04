import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_APP_URL,
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
};

export default nextConfig;
