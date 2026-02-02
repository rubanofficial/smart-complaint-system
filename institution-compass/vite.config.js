import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: 8081,          // 👈 same port browser uses
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 8081,        // 👈 IMPORTANT
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
