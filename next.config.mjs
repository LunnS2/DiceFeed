import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    // Add custom alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(process.cwd(), 'styles'),
    };

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  }
}

export default nextConfig;
