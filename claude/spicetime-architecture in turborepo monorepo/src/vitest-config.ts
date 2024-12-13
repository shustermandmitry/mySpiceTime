// tools/vitest-config/src/index.ts
import { defineConfig, mergeConfig } from 'vitest/config'
import type { UserConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default function createVitestConfig(options: UserConfig = {}) {
  return mergeConfig(
    defineConfig({
      plugins: [react(), tsconfigPaths()],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
          exclude: [
            'node_modules/',
            'src/test/setup.ts',
            '**/*.d.ts',
            '**/*.config.*',
            '**/types/*'
          ]
        },
        reporters: ['default', 'html'],
        watch: false,
        passWithNoTests: true,
        mockReset: true,
        clearMocks: true,
        restoreMocks: true,
      }
    }),
    options
  )
}
