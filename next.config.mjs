

const assetPrefix =
  process.env.NODE_ENV === "production"
    ? 'https://dahoon06.github.io'
    : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
