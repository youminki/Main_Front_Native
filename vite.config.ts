import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import svgr from '@svgr/rollup';
import type { ServerOptions } from 'https';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

function getHttpsConfig(): ServerOptions | undefined {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    console.warn('배포 환경에서는 HTTPS 설정을 비활성화합니다.');
    return undefined; // 배포 환경에서는 HTTP 사용
  }

  try {
    // 로컬 개발 환경용 인증서
    return {
      key: fs.readFileSync(path.resolve(dirName, 'cert/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(dirName, 'cert/localhost.pem')),
    };
  } catch (error) {
    console.warn(
      '로컬 개발 환경에서 HTTPS 인증서를 불러오지 못했습니다. 기본 HTTP로 대체합니다.',
      error
    );
    return undefined; // HTTP로 대체
  }
}

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    https: getHttpsConfig(),
    host: true,
    port: 5173, // 기본 포트 설정
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
