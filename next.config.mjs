/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "daisyui.com",
      },
      {
        hostname: "api.multiavatar.com",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
