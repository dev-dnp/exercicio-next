import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains : ["cdn.dummyjson.com"]
  },

   experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
