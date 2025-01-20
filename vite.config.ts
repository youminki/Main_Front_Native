import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // 상대 경로를 명시
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true, // 디버깅을 위해 sourcemap 활성화
  },
  resolve: {
    alias: {
      "@": "/src", // 경로 별칭 설정
    },
  },
});
