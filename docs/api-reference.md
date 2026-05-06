# API Reference

## Playerify Component

The main media player component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | String (required) | - | Media source URL |
| type | String | - | 'audio' or 'video' |
| mimeType | String | - | MIME type override |
| videoWidth | String | '100%' | Video width |
| videoHeight | String | '' | Video height |
| playButtonColor | String | 'default' | Vuetify color for play button |
| pauseButtonColor | String | 'default' | Vuetify color for pause button |
| volumeButtonColor | String | 'default' | Vuetify color for volume button |
| volumeOffButtonColor | String | 'default' | Vuetify color for muted volume button |
| playbackRateButtonColor | String | 'default' | Vuetify color for playback rate button |
| settingsButtonColor | String | 'default' | Vuetify color for settings button |
| btnRounded | String | 'sm' | Button roundness (none, sm, md, lg, xl, pill, circle) |
| progressRounded | String | 'sm' | Progress bar roundness |
| progressSliderColor | String | 'primary' | Progress slider color |
| volumeSliderColor | String | 'primary' | Volume slider color |
| defaultVolume | Number | 0.8 | Initial volume (0-1) |
| progressColor | String | 'primary' | Progress bar color |
| bufferColor | String | 'secondary' | Buffer bar color |
| showFileName | Boolean | true | Show filename |
| showDuration | Boolean | true | Show time/duration |
| permanentVolumeSlider | Boolean | true | Always show volume slider |
| debug | Boolean | false | Show debug YAML output |

### Events

The component uses `v-model` patterns for reactive state. Use `useMediaControls` from `@vueuse/core` for programmatic control.

## Volume Component

Internal volume control component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| volumeButtonColor | String | 'default' | Button color |
| volumeOffButtonColor | String | 'default' | Muted button color |
| btnRounded | String | 'sm' | Button roundness |
| volumeSliderColor | String | 'primary' | Slider color |
| permanentVolumeSlider | Boolean | false | Always show slider |

### v-model

- `volume` (Number) - Current volume level (0-1)
- `muted` (Boolean) - Muted state

## ExtraActions Component

Internal component for playback rate and settings.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| playbackRateButtonColor | String | 'default' | Button color |
| settingsButtonColor | String | 'default' | Button color |
| btnRounded | String | 'sm' | Button roundness |

### v-model

- `media` (HTMLMediaElement) - Reference to audio/video element
- `loop` (Boolean) - Loop playback state

## PlayerType Enum

```typescript
enum PlayerType {
  AUDIO = 'audio',
  VIDEO = 'video'
}
```