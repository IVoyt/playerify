# Playerify

---

Audio/Video player for [Vuetify3](https://vuetifyjs.com)

## Status
*Beta*

## Requirements
- Vue 3.x
- Vuetify.js 3.x

## Features
- Vuetify components
- Audio/Video Playback
- Playback Progress
- Playback Speed
- Playback Loop
- Volume control
- Control buttons customization (color, rounded)

## Installation
Install package
```bash
# npm
npm i playerify

# or pnpm
pnpm i playerify
```

Register the plugin in your main.js (main.ts)
```typescript
import PlayerifyPlugin from 'playerify'
import 'playerify/style.css'
app.use(PlayerifyPlugin);
```
Should be something like this

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { aliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify);

// add this line
import PlayerifyPlugin from 'playerify';
import 'playerify/style.css';
app.use(PlayerifyPlugin);

// Mount vue app
app.mount('#app')
```

## Usage

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
      play-button-color="green"
      volume-off-button-color="red"
      playback-rate-button-color="blue"
  />
</template>
```

## Feedback
Found a bug or have ideas on improvement? Feel free to [create a ticket](https://github.com/IVoyt/playerify/issues/new).

## TODO
* [ ] replace default fullscreen UI
* [ ] customizable control buttons
* [ ] cover image

## Licence
[MIT](./LICENSE)
