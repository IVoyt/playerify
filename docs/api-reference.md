# API Reference

## Playerify Component

The main media player component.

### Props

| Prop | Type | Default     | Description |
|------|------|-------------|-------------|
| src | String (required) | -           | Media source URL |
| type | String | 'video'     | 'audio' or 'video' |
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

### Events

The component uses `v-model` patterns for reactive state. Use `useMediaControls` from `@vueuse/core` for programmatic control.

## PlayerType Enum

```typescript
enum PlayerType {
  AUDIO = 'audio',
  VIDEO = 'video'
}
```