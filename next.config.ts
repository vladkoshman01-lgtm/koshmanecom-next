import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  output: "export",
  experimental: {
    // Своя 404 для невідомих адрес при кількох кореневих layout-ах
    globalNotFound: true,
  },
};

export default nextConfig;
