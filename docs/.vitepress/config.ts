import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'Playerify',
  description: 'Audio/Video player for Vuetify 3',
  base: '/playerify/',
  lang: 'en-US',

  vite: {
    resolve: {
      alias: {
        '@playerify': fileURLToPath(new URL('../../src', import.meta.url)),
      },
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
      copyright: 'Copyright © 2024 Igor Voytovich'
    },
  },
})