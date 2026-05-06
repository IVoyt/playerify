# Examples

## Basic Audio Player

Simple audio player with default settings:

```vue
<script setup lang="ts">
const src = 'https://www.w3schools.com/tags/horse.mp3'
</script>

<template>
  <Playerify
    :src="src"
    type="audio"
  />
</template>
```

## Basic Video Player

Simple video player:

```vue
<script setup lang="ts">
const src = 'https://www.w3schools.com/tags/mov_bbb.mp4'
</script>

<template>
  <Playerify
    :src="src"
    type="video"
  />
</template>
```

## Custom Colors

Customize button and slider colors:

```vue
<script setup lang="ts">
const src = 'https://www.w3schools.com/tags/mov_bbb.mp4'
</script>

<template>
  <Playerify
    :src="src"
    type="video"
    play-button-color="green"
    pause-button-color="teal"
    volume-button-color="cyan"
    volume-off-button-color="red"
    playback-rate-button-color="blue"
    settings-button-color="purple"
    fullscreen-button-color="orange"
    progress-slider-color="indigo"
    volume-slider-color="amber"
    progress-color="deep-purple"
    buffer-color="grey-lighten-2"
  />
</template>
```

## Advanced Configuration

All props enabled:

```vue
<script setup lang="ts">
const src = 'https://www.w3schools.com/tags/mov_bbb.mp4'
</script>

<template>
  <Playerify
    :src="src"
    type="video"
    video-width="640"
    video-height="360"
    play-button-color="primary"
    pause-button-color="success"
    volume-button-color="warning"
    volume-off-button-color="error"
    playback-rate-button-color="info"
    settings-button-color="secondary"
    fullscreen-button-color="orange"
    btn-rounded="lg"
    progress-rounded="md"
    progress-slider-color="primary"
    volume-slider-color="secondary"
    default-rewind="15"
    default-volume="0.5"
    progress-color="primary"
    buffer-color="grey-lighten-2"
    file-name="My Custom Video"
    :show-file-name="true"
    :show-duration="true"
    :permanent-volume-slider="true"
    :debug="false"
  />
</template>
```

## TypeScript Usage

Using the PlayerType enum:

```vue
<script setup lang="ts">
import { PlayerType } from 'playerify'

const audioSrc = 'https://www.w3schools.com/tags/horse.mp3'
const videoSrc = 'https://www.w3schools.com/tags/mov_bbb.mp4'
const mediaType = PlayerType.VIDEO
</script>

<template>
  <Playerify
    :src="videoSrc"
    :type="mediaType"
  />
</template>
```