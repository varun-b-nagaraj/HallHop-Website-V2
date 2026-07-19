import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The site has one compact Tailwind bundle. Inlining it removes the
    // render-blocking stylesheet request on a visitor's first page load.
    inlineCss: true,
  },
};

export default nextConfig;
