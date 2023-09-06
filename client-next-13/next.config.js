const withFonts = require('next-fonts');
const withPWA = require("next-pwa")({
  //reactStrictMode: true,
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
})
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placeimg.com', 'www.revixpert.ch'],
  },
  output: 'standalone',
})

//const nextConfigWithPWA = withPWA(nextConfig)

module.exports = withFonts(nextConfig)
