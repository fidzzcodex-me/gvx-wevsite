/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "vercel.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
}

module.exports = nextConfig
