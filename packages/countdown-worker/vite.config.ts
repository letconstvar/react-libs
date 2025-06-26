import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'CountdownWorker',
      fileName: format => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
      },
    },
  },
})
