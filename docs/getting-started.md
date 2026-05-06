# Getting Started

## Installation

Install the package using your preferred package manager:

```bash
# npm
npm i playerify

# pnpm
pnpm i playerify
```

## Prerequisites

Playerify requires the following peer dependencies:

- Vue 3.x
- Vuetify 3.x or 4.x
- @mdi/js 7.x (for icons)

Install them if you haven't already:

```bash
pnpm i vue vuetify @mdi/js
```

## Plugin Registration

Register the Playerify plugin in your main entry file (e.g., `main.js` or `main.ts`):

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { aliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import PlayerifyPlugin from 'playerify'
import 'playerify/style.css'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi: mdiSvg },
  },
})

app.use(vuetify)
app.use(PlayerifyPlugin)

app.mount('#app')
```

## Basic Usage

### Audio Player

```vue
<script setup lang="ts">
const src = 'https://www.w3schools.com/tags/horse.mp3'
</script>

<template>
  <Playerify
    :src="src"
    type="audio"
    :show-file-name="true"
    :show-duration="true"
  />
</template>
```

### Video Player

```vue
<script setup lang="ts">
const src = 'https://www.w3schools.com/tags/mov_bbb.mp4'
</script>

<template>
  <Playerify
    :src="src"
    type="video"
    video-width="320"
    video-height="200"
    :show-file-name="true"
    :show-duration="true"
  />
</template>
```

## TypeScript Support

Playerify includes TypeScript definitions. Import types directly:

```typescript
import PlayerifyPlugin, { PlayerType } from 'playerify'

// PlayerType enum: PlayerType.AUDIO or PlayerType.VIDEO
```