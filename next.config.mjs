/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Disable static optimization to avoid SSR issues with i18n
  },
};

export default nextConfig;
