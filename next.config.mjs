/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.hollandviptransfers.com',
          },
        ],
        destination: 'https://hollandviptransfers.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
