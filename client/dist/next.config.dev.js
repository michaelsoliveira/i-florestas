"use strict";

var nextConfig = {
  reactStrictMode: true,
  webpack: function webpack(config, _ref) {
    var isServer = _ref.isServer;

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'placeimg.com']
  }
};
module.exports = nextConfig;