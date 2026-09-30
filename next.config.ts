import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/how-much-does-a-funeral-cost-in-2024-statebystate-breakdown",
        destination: "/blog/how-much-does-a-funeral-cost-in-2026-state-by-state-breakdown",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
