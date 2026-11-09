import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { appIcon } from './src/shared/appIcon.ts';

function favicon(command: 'serve' | 'build'): Plugin {
  const href = `./${appIcon(command === 'serve')}`;
  return {
    name: 'env-favicon',
    transformIndexHtml: () => [
      {
        tag: 'link',
        attrs: { rel: 'icon', type: 'image/png', href },
        injectTo: 'head',
      },
    ],
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), favicon(command)],
  base: './',
  test: {
    environment: 'node',
  },
}));
