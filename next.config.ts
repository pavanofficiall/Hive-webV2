import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'hive.nexaworks.tech',
          },
        ],
        destination: 'https://usehive.tech/:path*',
        permanent: true,
      },
    ]
  },
};

export default withNextIntl(nextConfig);
