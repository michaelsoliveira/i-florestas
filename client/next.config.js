const withFonts = require('next-fonts');
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
})
const nextConfig = withPWA({
  rewrites: async () => {
    return [
      {
        source: "/ia/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/ia/:path*"
            : "/ia/",
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placeimg.com', 'www.revixpert.ch'],
  },
  output: 'standalone',
})

module.exports = withFonts(nextConfig)
