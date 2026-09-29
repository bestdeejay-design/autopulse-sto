/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/autopulse-sto",
  assetPrefix: "/autopulse-sto/",
  images: { unoptimized: true }
};

export default nextConfig;
