import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// NCMP Uganda Connect - Vite Config
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @ => src
    },
  },

  server: {
    host: true,       // network access
    port: 8080,
    strictPort: true, // fail if port is in use
    hmr: { overlay: false },
  },

  preview: {
    host: true,
    port: 8080,
  },

  build: {
    outDir: "dist",            // production output
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },

  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});