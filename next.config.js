module.exports = {
  future: { webpack5: true },
  images: {
    domains: ['raw.communitydragon.org'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, module: false };

    return config;
  },
};
