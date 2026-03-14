import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// NCMP Uganda Connect - Vite Config
export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 8080,
    strictPort: true,

    hmr: {
      overlay: false
    }
  },

  preview: {
    host: true,
    port: 8080
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },

  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
});