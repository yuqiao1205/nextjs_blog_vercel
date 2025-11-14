import type { NextConfig } from "next";

const nextConfig: NextConfig = {  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "font-src 'self' github.githubassets.com *.githubusercontent.com data:;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
