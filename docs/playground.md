# Playground

Interactive configuration generator for the Playerify component.

<ClientOnly>
  <PlaygroundDemo />
</ClientOnly>

## Configuration Options

### Media Type

- `audio` - Audio player
- `video` - Video player (default)

### Button Styling

| Prop                       | Values | Default |
|----------------------------|-------|---------|
| btn-rounded                | none, sm, md, lg, xl, pill, circle | sm |
| play-button-color          | Vuetify color name or hex | primary |
| pause-button-color         | Vuetify color name or hex | primary |
| volume-button-color        | Vuetify color name or hex | default |
| volume-off-button-color    | Vuetify color name or hex | default |
| playback-rate-button-color | Vuetify color name or hex | default |
| settings-button-color      | Vuetify color name or hex | default |
| fullscreen-button-color    | Vuetify color name or hex | default |

### Progress Styling

| Prop | Values | Default |
|------|-------|---------|
| progress-rounded | none, sm, md, lg, xl | sm |
| progress-slider-color | Vuetify color name or hex | primary |
| volume-slider-color | Vuetify color name or hex | primary |
| progress-color | Vuetify color name or hex | primary |
| buffer-color | Vuetify color name or hex | secondary |

### Display Options

| Prop                    | Type          | Default |
|-------------------------|---------------|---------|
| default-rewind          | number (1-60) | 10      |
| default-volume          | number (0-1)  | 0.8     |
| file-name          | string        |     |
| show-file-name          | boolean       | true    |
| show-duration           | boolean       | true    |
| permanent-volume-slider | boolean       | true    |
