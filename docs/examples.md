# Examples

## Basic Audio Player

Simple audio player with default settings:

```vue
<script setup lang="ts">
const playlist = [
  { src: 'https://www.w3schools.com/tags/horse.mp3', name: 'Horse', cover: 'https://example.com/cover.jpg' }
]
</script>

<template>
  <Playerify :playlist="playlist" />
</template>
```

## Basic Video Player

Simple video player:

```vue
<script setup lang="ts">
const playlist = [
  { src: 'https://www.w3schools.com/tags/mov_bbb.mp4', name: 'Big Buck Bunny', cover: 'https://example.com/poster.jpg' }
]
</script>

<template>
  <Playerify :playlist="playlist" />
</template>
```

## Simple URL Array

Use a simple array of URLs (names auto-generated):

```vue
<script setup lang="ts">
const playlist = [
  'https://www.w3schools.com/tags/horse.mp3',
  'https://www.w3schools.com/tags/mov_bbb.mp4',
]
</script>

<template>
  <Playerify :playlist="playlist" :show-playlist="true" />
</template>
```

## Custom Colors

Customize button and slider colors:

```vue
<script setup lang="ts">
const playlist = [
  { src: 'https://www.w3schools.com/tags/mov_bbb.mp4', name: 'Video', cover: 'https://example.com/poster.jpg' }
]
</script>

<template>
  <Playerify
    :playlist="playlist"
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
const playlist = [
  { src: 'https://www.w3schools.com/tags/mov_bbb.mp4', name: 'Custom Video', cover: 'https://example.com/poster.jpg' }
]
</script>

<template>
  <Playerify
    :playlist="playlist"
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
    :show-file-name="true"
    :show-duration="true"
    :permanent-volume-slider="true"
    :debug="false"
  />
</template>
```

## TypeScript Usage

```vue
<script setup lang="ts">
import type { PlaylistItem } from 'playerify'

const playlist: PlaylistItem[] = [
  { src: 'https://www.w3schools.com/tags/horse.mp3', name: 'Horse', cover: 'https://example.com/cover.jpg' },
  { src: 'https://www.w3schools.com/tags/mov_bbb.mp4', name: 'Video', cover: 'https://example.com/poster.jpg' },
]
</script>

<template>
  <Playerify :playlist="playlist" :show-playlist="true" />
</template>
```