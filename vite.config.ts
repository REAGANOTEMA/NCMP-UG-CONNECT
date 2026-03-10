import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite Configuration for NCMP – Uganda
export default defineConfig({
  server: {
    host: true, // allows access from network devices
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});