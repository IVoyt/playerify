import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import alias from '@rollup/plugin-alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [
        fileURLToPath(new URL('./src/i18n/locales/**', import.meta.url)),
      ],
    }),
    vuetify({
      autoImport: { labs: true },
    }),
    Components({
      dirs: ['src/components'],
      dts: true,
    }),
    svgLoader(),
  ],
  define: { 'process.env': {} },
  resolve: {
    tsconfigPaths:true,
    preserveSymlinks: true,
    alias: {
      '@playerify': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'esbuild',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Playerify',
      formats: ['es', 'umd'],
      fileName: 'playerify'
    },
    cssCodeSplit: false,
    rolldownOptions: {
      plugins: [
        alias({
          entries: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
          ]
        })
      ],
      external: ['vue', 'vuetify', '@vueuse/core', '@vueuse/shared'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          '@vueuse/core': '_VueuseCore'
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset'
          if (name === 'style.css') return 'playerify.css'
          return name
        }
      }
    },
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    include: [
      'vue',
      '@playerify/components/Playerify.vue',
    ],
    entries: [
      './src/**/*.vue',
    ],
  },
})