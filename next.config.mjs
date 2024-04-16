/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Add redirects to ensure challenge content is shown on app load.
    return [
      {
        source: "/",
        destination: "/warehouse/packing",
        permanent: true,
      },
      {
        source: "/warehouse",
        destination: "/warehouse/packing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
