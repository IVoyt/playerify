# API Reference

## Playerify Component

The main media player component.

### Props

| Prop | Type | Default     | Description |
|------|------|-------------|-------------|
| playlist | string[] \| PlaylistItem[] | []      | Array of playlist items - either URLs (string[]) or objects |
| coverImage | String | ''          | Default cover image URL (falls back to playlist item cover) |
| coverImageOriginalSize | Boolean | true      | Use original cover image size (false scales to frame dimensions) |
| type | String | 'video'     | 'audio' or 'video' |
| hideAllControls | Boolean | false     | Hide all controls |
| hideProgress | Boolean | false     | Hide progress bar |
| hideMainControls | Boolean | false    | Hide main controls (play, volume) |
| hideExtraControls | Boolean | false    | Hide extra controls (playlist, settings, fullscreen) |
| hidePlayButton | Boolean | false     | Hide play/pause button |
| hideVolumeButton | Boolean | false    | Hide volume button |
| hidePlaylistButton | Boolean | false  | Hide playlist button |
| hidePlaybackRateButton | Boolean | false | Hide playback rate option in extras menu |
| hideExtrasButton | Boolean | false    | Hide extras menu button |
| hideFullscreenButton | Boolean | false | Hide fullscreen button |
| hideFileName | Boolean | false       | Hide filename |
| hideDuration | Boolean | false       | Hide time/duration |
| playlistVariant | String | 'elevated'  | Playlist variant (text, flat, elevated, tonal, outlined) |
| playlistButtonColor | String | 'default'   | Vuetify color for playlist button |
| frameWidth | String | '100%'       | Frame width |
| frameHeight | String | ''          | Frame height |
| playButtonColor | String | 'default'   | Vuetify color for play button |
| pauseButtonColor | String | 'default'   | Vuetify color for pause button |
| volumeButtonColor | String | 'default'   | Vuetify color for volume button |
| volumeOffButtonColor | String | 'default'  | Vuetify color for muted volume button |
| playbackRateButtonColor | String | 'default' | Vuetify color for playback rate button |
| extrasButtonColor | String | 'default'   | Vuetify color for extras button |
| fullscreenButtonColor | String | 'default'  | Vuetify color for fullscreen button |
| btnRounded | String | 'sm'        | Button roundness (none, sm, md, lg, xl, pill, circle) |
| progressRounded | String | 'sm'        | Progress bar roundness |
| progressSliderColor | String | 'primary'   | Progress slider color |
| volumeSliderColor | String | 'primary'   | Volume slider color |
| defaultRewind | Number | 10          | Seconds to skip on left/right arrow keys (1-60) |
| defaultVolume | Number | 0.8         | Initial volume (0-1) |
| progressColor | String | 'primary'   | Progress bar color |
| bufferColor | String | 'secondary' | Buffer bar color |
| fileName | String | ''          | Custom file name to display (falls back to source URL basename) |
| permanentVolumeSlider | Boolean | true   | Always show volume slider |
| debug | Boolean | false       | Show debug YAML output |

> **Note:** `hideAllControls="true"` is intended for video content only.<br>It overrides all other hide-* props — they will all be hidden regardless of their individual values.

### Playlist Item Type

Import the type from the package:

```typescript
import type { PlaylistItem, controlActionMenuItem } from 'playerify'

const playlist: PlaylistItem[] = [
  { src: 'https://example.com/audio.mp3', name: 'Audio', cover: 'https://example.com/cover.jpg' },
  { src: 'https://example.com/video.mp4', name: 'Video', cover: 'https://example.com/poster.jpg' },
]
```

You can also use a simple array of URLs:
```typescript
const playlist: string[] = [
  'https://example.com/audio.mp3',
  'https://example.com/video.mp4',
]
```

### controlActionMenuItem Type

Used for extras menu items (Loop, Picture in Picture):

```typescript
type controlActionMenuItem = {
  title: string
  value: any
  icon?: string
  active?: boolean
}
```

## PlayerType Enum

```typescript
enum PlayerType {
  AUDIO = 'audio',
  VIDEO = 'video'
}
```