/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io'
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com'
      }
    ]
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;
