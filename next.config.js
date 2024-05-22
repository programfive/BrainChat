/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '**',
    }, ],
  },
};

module.exports = nextConfig;