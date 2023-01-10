import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import px2rem from 'postcss-pxtorem';
import { defineConfig } from 'vite';

import { dependencies } from './package.json';
import uiConfig from './src/ui.config.json';

// 打包时，生成一些基础的构建信息到 build.json
if (process.env.VITE_MODE !== 'local') {
  fs.writeFileSync(
    path.join(__dirname, './public/build.json'),
    JSON.stringify({
      version: `${Date.now()}`,
    }),
  );
}

const vendorList = ['react', 'react-router-dom', 'react-dom'];

function renderChunks(deps: Record<string, string>) {
  let chunks: Record<string, string[]> = {};
  Object.keys(deps).forEach((key) => {
    if (vendorList.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 4010,
  },
  define: {
    VITE_MODE: `"${process.env.VITE_MODE}"`,
  },
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    react(),
  ],
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[local]_[hash:base64:6]',
    },
    postcss: {
      plugins: [
        autoprefixer(),
        px2rem({
          rootValue: uiConfig.width / uiConfig.base_num,
          unitPrecision: 5,
          propList: ['*'],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 1,
          // exclude: /node_modules/i,
        }),
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#2153D3' },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2015',
    sourcemap: false,
    rollupOptions: {
      output: {
        // 抽离公共模块代码
        manualChunks: {
          vendor: vendorList,
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
