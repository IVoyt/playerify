# Playground

Interactive configuration generator for the Playerify component.

<ClientOnly>
  <PlaygroundDemo />
</ClientOnly>

## Configuration Options

### Button Styling

| Prop                       | Values                                  | Default    |
|----------------------------|-----------------------------------------|------------|
| btn-rounded                | none, sm, md, lg, xl, pill, circle      | sm         |
| play-button-color          | Vuetify color name or hex               | primary    |
| pause-button-color         | Vuetify color name or hex               | primary    |
| volume-button-color        | Vuetify color name or hex               | default    |
| volume-off-button-color    | Vuetify color name or hex               | default    |
| playlist-button-color      | Vuetify color name or hex               | default    |
| playlist-variant           | text, flat, elevated, tonal, outlined   | elevated   |
| playback-rate-button-color | Vuetify color name or hex               | default    |
| extras-button-color        | Vuetify color name or hex               | default    |
| fullscreen-button-color    | Vuetify color name or hex               | default    |
| hide-all-controls          | boolean                                 | false      |
| hide-progress              | boolean                                 | false      |
| hide-main-controls         | boolean                                 | false      |
| hide-extra-controls        | boolean                                 | false      |
| hide-play-button           | boolean                                 | false      |
| hide-volume-button         | boolean                                 | false      |
| hide-playlist-button       | boolean                                 | false      |
| hide-playback-rate-button  | boolean                                 | false      |
| hide-extras-button         | boolean                                 | false      |
| hide-fullscreen-button     | boolean                                 | false      |
| hide-file-name             | boolean                                 | false      |
| hide-duration              | boolean                                 | false      |
| hide-playlist              | boolean                                 | false      |

### Progress Styling

| Prop                  | Values                         | Default     |
|-----------------------|--------------------------------|-------------|
| progress-rounded      | none, sm, md, lg, xl           | sm          |
| progress-slider-color | Vuetify color name or hex      | primary     |
| volume-slider-color   | Vuetify color name or hex      | primary     |
| progress-color        | Vuetify color name or hex      | primary     |
| buffer-color          | Vuetify color name or hex      | secondary   |

### Display Options

| Prop                       | Type                 | Default |
|----------------------------|----------------------|---------|
| default-rewind             | number (1-60)        | 10      |
| default-volume             | number (0-1)         | 0.8     |
| file-name                  | string               |         |
| frame-width                | string               |         |
| frame-height               | string               |         |
| cover-image-original-size  | boolean              | true    |
| hide-playlist-button       | boolean              | false   |
| permanent-volume-slider    | boolean              | true    |

## Media Sources

All media files used in the Playground belong to their respective authors and are licensed under [Creative Commons](https://creativecommons.org/).

| Title               | Author               | Source             |
|---------------------|----------------------|--------------------|
| Big Buck Bunny      | Blender Foundation   | archive.org        |
| Sintel              | Blender Foundation   | archive.org        |
| Elephant's Dream    | Blender Foundation   | archive.org        |
| Coffee Run          | Blender Foundation   | Wikimedia Commons  |
| Dream Diary         | Pamela Yuen          | Free Music Archive |
| Tranquility         | Free The Muses       | Free Music Archive |
| Morning Coffee Vibe | YuraSoop             | Free Music Archive |
