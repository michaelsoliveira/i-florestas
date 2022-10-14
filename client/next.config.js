const nextConfig = {
  publicRuntimeConfig: {
    // remove private variables from processEnv
    processEnv: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes('NEXT_PUBLIC_')
      )
    ),
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          child_process: false,
          fs: false,
          'builtin-modules': false,
          worker_threads: false,
        },
      }
    }
    // config.module.rules = config.module.rules.filter(r => !r.oneOf);

    // Add your own rules

    // config.module.rules.push({
    //   test: /\.scss$/i,
    //   use: ['style-loader', 'css-loader'],
    // })
    
    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'placeimg.com'],
  },
  output: 'standalone',
}

module.exports = nextConfig
