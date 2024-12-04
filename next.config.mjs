/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.output.chunkLoadTimeout = 30000; // 30 seconds timeout
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "purasalsa-assets.s3.us-east-1.amazonaws.com", // Replace with your S3 bucket's domain
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set the limit (e.g., 10 MB)
    },
  },
};

export default nextConfig;


  