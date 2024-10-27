import type { NextConfig } from "next"
import { isProduction } from './src/helpers/config'

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  reactStrictMode: isProduction
}

export default nextConfig
