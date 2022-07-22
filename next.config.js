/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['reqres.in'],
  },
  "extensions": [".ts", ".tsx", ".js"]
}

module.exports = nextConfig
