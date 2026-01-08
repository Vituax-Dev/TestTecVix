import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
    host: true,
    proxy: {
      // toda requisição a /cepaberto será redirecionada...
      "/cepaberto": {
        target: "https://www.cepaberto.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          // transforma /cepaberto/02517150 em /api/v3/cep?cep=02517150
          path.replace(/^\/cepaberto\/(.+)$/, "/api/v3/cep?cep=$1"),
      },
    },
  },
  preview: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["@mui/icons-material"],
  },
  build: {
    sourcemap: false,
  },
});
