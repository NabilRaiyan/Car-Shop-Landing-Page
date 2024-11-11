/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // hostname should be a string
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'tinyurl.com', // each hostname should have its own object
        port: '',
      },
    ],
  },
};

export default nextConfig;
