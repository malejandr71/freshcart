import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://ecommerce.routemisr.com/**/**")],
  },
};

export default nextConfig;
