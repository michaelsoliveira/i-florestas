"use strict";

var withFonts = require('next-fonts');

var withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.ENVIRONMENT === 'development'
});

var nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placeimg.com', 'www.revixpert.ch']
  } // output: 'standalone',

});
module.exports = withFonts(nextConfig);