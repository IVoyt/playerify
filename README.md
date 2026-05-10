# Playerify

Audio/Video player for [Vuetify 3](https://vuetifyjs.com)

[![npm](https://img.shields.io/npm/v/playerify.svg)](https://www.npmjs.com/package/playerify)
[![npm](https://img.shields.io/npm/dw/playerify.svg)](https://www.npmjs.com/package/playerify)
[![GitHub](https://img.shields.io/github/license/ivoyt/playerify)](./LICENSE)

## Live Demo

[View Documentation & Demo](https://ivoyt.github.io/playerify)

## Requirements

- Vue 3.x
- Vuetify 3.x or 4.x


## Quick Start

```bash
npm i playerify
```

```typescript
// main.ts
import PlayerifyPlugin from 'playerify'
import 'playerify/style.css'
app.use(PlayerifyPlugin)
```

```vue
<!-- App.vue -->
<Playerify :src="src" type="video" />
```

## Features

- Audio & Video playback
- Progress tracking & seeking
- Playback speed control
- Volume control
- Loop mode
- Customizable button colors & rounded styles
- Fullscreen support
- TypeScript support

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Media URL |
| `type` | `'audio' \| 'video'` | `'audio'` | Media type |
| `video-width` | `string` | — | Video player width |
| `video-height` | `string` | — | Video player height |
| `play-button-color` | `string` | `'primary'` | Play button color |
| `pause-button-color` | `string` | `'primary'` | Pause button color |
| `volume-button-color` | `string` | — | Volume icon button color |
| `volume-off-button-color` | `string` | — | Mute icon button color |
| `playback-rate-button-color` | `string` | — | Speed button color |
| `settings-button-color` | `string` | — | Settings button color |
| `fullscreen-button-color` | `string` | — | Fullscreen button color |
| `progress-slider-color` | `string` | `'primary'` | Progress bar color |
| `volume-slider-color` | `string` | `'secondary'` | Volume slider color |
| `progress-color` | `string` | — | Played progress color |
| `buffer-color` | `string` | — | Buffered range color |
| `btn-rounded` | `string` | — | Button border radius |
| `progress-rounded` | `string` | — | Progress bar border radius |
| `default-rewind` | `number` | `10` | Rewind seconds |
| `default-volume` | `number` | `1` | Default volume |
| `show-file-name` | `boolean` | `false` | Show file name |
| `show-duration` | `boolean` | `false` | Show duration |
| `permanent-volume-slider` | `boolean` | `false` | Always show volume slider |
| `debug` | `boolean` | `false` | Enable debug logging |

## Full Documentation

See the [full documentation](https://playerify.ligamedia.dev) for installation, examples, and API reference.

## Credits

Playerify is built using [`useMediaControls`](https://vueuse.org/core/usemediacontrols/) from [VueUse](https://vueuse.org/) for media state management.

## Feedback

Found a bug or have ideas? [Create an issue](https://github.com/IVoyt/playerify/issues/new).

## TODO

* [x] playlist
* [ ] replace the default fullscreen UI
* [ ] customizable control buttons
* [ ] cover image

## License

[MIT](./LICENSE)
