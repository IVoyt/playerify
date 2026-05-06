import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'Playerify',
  description: 'Audio/Video player for Vuetify 3',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  base: '/playerify/',
  lang: 'en-US',

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: {
        '@playerify': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
    ssr: {
      noExternal: ['vuetify'/*, '@vueuse/core'*/],
    },
    optimizeDeps: {
      include: ['vuetify', '@vueuse/core'],
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'API Reference', link: '/api-reference' },
      { text: 'Examples', link: '/examples' },
      { text: 'Playground', link: '/playground' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'API Reference', link: '/api-reference' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Examples', link: '/examples' },
          { text: 'Playground', link: '/playground' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IVoyt/playerify' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Igor Voytovich'
    },
  },
})