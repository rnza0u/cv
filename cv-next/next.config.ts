import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: process.env.NODE_ENV === 'development'
}

export default nextConfig
