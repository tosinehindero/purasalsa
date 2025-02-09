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
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add custom headers for admin routes only
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // This example relaxes the script-src and style-src directives by allowing 'unsafe-inline'.
            // Adjust this value as needed to balance functionality and security.
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;


  