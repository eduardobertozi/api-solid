/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    environmentMatchGlobs: [
      [
        './src/http/controllers/**',
        './prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
    dir: './src',
  },
})
