/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import viteConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    dir: './src',
  },
  plugins: [viteConfigPaths()],
})
