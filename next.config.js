import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: '@import "@/styles/main.scss";',
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
