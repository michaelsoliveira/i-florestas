const nextConfig = {
  publicRuntimeConfig: {
    // remove private variables from processEnv
    processEnv: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes('NEXT_PUBLIC_')
      )
    ),
  },
  env: {
    PUBLIC_API_URL: () => {
      if (process.env.NODE_ENV === 'development') return 'http://localhost:3333'

      return 'https://bomanejo.online/backend'
    },
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
