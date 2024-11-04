/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.output.chunkLoadTimeout = 30000; // 30 seconds timeout
      return config;
    },
  };
  
  export default nextConfig;
  