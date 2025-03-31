// eslint-disable-next-line import/no-unresolved -- unsure
import withVercelToolbar from "@vercel/toolbar/plugins/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental",
  },
  webpack: (config, { isServer, webpack }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default withVercelToolbar()(nextConfig);
