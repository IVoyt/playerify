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


Install them if you haven't already:

```bash
pnpm i vue vuetify
```

## Plugin Registration

Register the Playerify plugin in your main entry file (e.g., `main.js` or `main.ts`):

```typescript
import { createApp } from "vue";
import App from "./App.vue";
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
})

app.use(vuetify)
app.use(PlayerifyPlugin)

app.mount('#app')
```

## Basic Usage

### Audio Player

```vue
<script setup lang="ts">
const playlist = [
  { src: 'https://www.w3schools.com/tags/horse.mp3', name: 'Horse', cover: 'https://example.com/cover.jpg' }
]
</script>

<template>
  <Playerify
    :playlist="playlist"
  />
</template>
```

### Video Player

```vue
<script setup lang="ts">
const playlist = [
  { src: 'https://www.w3schools.com/tags/mov_bbb.mp4', name: 'Big Buck Bunny', cover: 'https://example.com/poster.jpg' }
]
</script>

<template>
  <Playerify
    :playlist="playlist"
    frame-width="320"
    frame-height="200"
  />
</template>
```

### Playlist

The `playlist` prop accepts both simple string URLs and playlist item objects:

**Simple URLs (auto-named):**
```vue
<script setup lang="ts">
const playlist = [
  'https://example.com/audio1.mp3',
  'https://example.com/audio2.mp3',
]
</script>

<template>
  <Playerify :playlist="playlist" />
</template>
```

**Full objects (with custom properties):**
```vue
<script setup lang="ts">
const playlist = [
  { src: 'https://example.com/audio1.mp3', name: 'Track 1', cover: 'https://example.com/cover1.jpg' },
  { src: 'https://example.com/audio2.mp3', name: 'Track 2', cover: 'https://example.com/cover2.jpg' },
  { src: 'https://example.com/video.mp4', name: 'Video', cover: 'https://example.com/poster.jpg' },
]
</script>

<template>
  <Playerify
    :playlist="playlist"
    playlist-variant="elevated"
    playlist-button-color="primary"
  />
</template>
```

#### Playlist Item Properties

| Property   | Type     | Description                                        |
|------------|----------|----------------------------------------------------|
| `src`      | string   | Media source URL (required)                        |
| `name`     | string   | Display name (optional, auto-generated)            |
| `cover`    | string   | Cover image URL for audio/video display (optional) |