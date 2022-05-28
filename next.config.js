/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  images: {
    domains: ["assets.coingecko.com"]
  },
  async redirects() {
    return [
      {
        source: "/tracker",
        destination: "/tracker/coins",
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
