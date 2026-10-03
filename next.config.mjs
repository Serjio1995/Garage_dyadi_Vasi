/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  experimental: { optimizePackageImports: ["framer-motion", "three", "@react-three/fiber", "gsap"] },
  async headers() {
    return [{ source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
};
