import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nested under Ether template — force Turbopack to this app only
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
