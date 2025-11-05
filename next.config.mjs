/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'fmapi.myfurnituremecca.com',
  //       hostname: 'https://devapi.myfurnituremecca.com/',
  //       pathname: '/**', // allow all paths from this host
  //     },
  //   ],
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fmapi.myfurnituremecca.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'devapi.myfurnituremecca.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ashleyfurniture.scene7.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.crescentcare.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
