# API Reference

## Playerify Component

The main media player component.

### Props

| Prop | Type | Default     | Description |
|------|------|-------------|-------------|
| playlist | string[] \| PlaylistItem[] | []      | Array of playlist items - either URLs (string[]) or objects |
| coverImage | String | ''          | Default cover image URL (falls back to playlist item cover) |
| type | String | 'video'     | 'audio' or 'video' |
| showPlaylist | Boolean | false      | Show playlist panel |
| playlistVariant | String | 'elevated'  | Playlist variant (text, flat, elevated, tonal, outlined) |
| playlistButtonColor | String | 'default'   | Vuetify color for playlist button |
| videoWidth | String | '100%'      | Video width |
| videoHeight | String | ''          | Video height |
| playButtonColor | String | 'default'   | Vuetify color for play button |
| pauseButtonColor | String | 'default'   | Vuetify color for pause button |
| volumeButtonColor | String | 'default'   | Vuetify color for volume button |
| volumeOffButtonColor | String | 'default'   | Vuetify color for muted volume button |
| playbackRateButtonColor | String | 'default'   | Vuetify color for playback rate button |
| settingsButtonColor | String | 'default'   | Vuetify color for settings button |
| fullscreenButtonColor | String | 'default'   | Vuetify color for fullscreen button |
| btnRounded | String | 'sm'        | Button roundness (none, sm, md, lg, xl, pill, circle) |
| progressRounded | String | 'sm'        | Progress bar roundness |
| progressSliderColor | String | 'primary'   | Progress slider color |
| volumeSliderColor | String | 'primary'   | Volume slider color |
| defaultRewind | Number | 10          | Seconds to skip on left/right arrow keys (1-60) |
| defaultVolume | Number | 0.8         | Initial volume (0-1) |
| progressColor | String | 'primary'   | Progress bar color |
| bufferColor | String | 'secondary' | Buffer bar color |
| fileName | String | ''          | Custom file name to display (falls back to source URL basename) |
| showFileName | Boolean | true        | Show filename |
| showDuration | Boolean | true        | Show time/duration |
| permanentVolumeSlider | Boolean | true        | Always show volume slider |
| debug | Boolean | false       | Show debug YAML output |

### Playlist Item Type

Import the type from the package:

```typescript
import type { PlaylistItem } from 'playerify'

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

## PlayerType Enum

```typescript
enum PlayerType {
  AUDIO = 'audio',
  VIDEO = 'video'
}
```