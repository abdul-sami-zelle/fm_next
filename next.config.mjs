/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fmapi.myfurnituremecca.com',
        pathname: '/**', // allow all paths from this host
      },
    ],
  },
};

export default nextConfig;
