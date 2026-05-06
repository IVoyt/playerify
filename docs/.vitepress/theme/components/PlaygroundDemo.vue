<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlayerType } from '@playerify'

const mediaType = ref<'audio' | 'video'>('video')
const audioSrc = 'https://www.w3schools.com/tags/horse.mp3'
const videoSrc = 'https://www.w3schools.com/tags/mov_bbb.mp4'

const src = computed(() => mediaType.value === 'audio' ? audioSrc : videoSrc)

const playButtonColor = ref('primary')
const pauseButtonColor = ref('primary')
const volumeButtonColor = ref('default')
const volumeOffButtonColor = ref('default')
const playbackRateButtonColor = ref('default')
const settingsButtonColor = ref('default')

const showFileName = ref(true)
const showDuration = ref(true)
const permanentVolumeSlider = ref(true)

const defaultVolume = ref(0.8)
const btnRounded = ref('sm')
const progressRounded = ref('sm')

const generatedCode = computed(() => {
  const props = [
    `:src="${mediaType.value === 'audio' ? audioSrc : videoSrc}"`,
    `type="${mediaType.value}"`,
    `play-button-color="${playButtonColor.value}"`,
    `pause-button-color="${pauseButtonColor.value}"`,
    `volume-button-color="${volumeButtonColor.value}"`,
    `volume-off-button-color="${volumeOffButtonColor.value}"`,
    `playback-rate-button-color="${playbackRateButtonColor.value}"`,
    `settings-button-color="${settingsButtonColor.value}"`,
    `btn-rounded="${btnRounded.value}"`,
    `progress-rounded="${progressRounded.value}"`,
    `default-volume="${defaultVolume.value}"`,
    `:show-file-name="${showFileName.value}"`,
    `:show-duration="${showDuration.value}"`,
    `:permanent-volume-slider="${permanentVolumeSlider.value}"`,
  ]

  return `<Playerify\n  ${props.join('\n  ')}\n/>`
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="6">
        <VCard class="pa-4">
          <VCardTitle>Player</VCardTitle>
          <Playerify
            :src="src"
            :type="mediaType"
            :play-button-color="playButtonColor"
            :pause-button-color="pauseButtonColor"
            :volume-button-color="volumeButtonColor"
            :volume-off-button-color="volumeOffButtonColor"
            :playback-rate-button-color="playbackRateButtonColor"
            :settings-button-color="settingsButtonColor"
            :btn-rounded="btnRounded"
            :progress-rounded="progressRounded"
            :default-volume="defaultVolume"
            :show-file-name="showFileName"
            :show-duration="showDuration"
            :permanent-volume-slider="permanentVolumeSlider"
          />
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard class="pa-4">
          <VCardTitle>Controls</VCardTitle>

          <VSwitch
            v-model="showFileName"
            label="Show File Name"
            class="mb-2"
          />
          <VSwitch
            v-model="showDuration"
            label="Show Duration"
            class="mb-2"
          />
          <VSwitch
            v-model="permanentVolumeSlider"
            label="Permanent Volume Slider"
            class="mb-4"
          />

          <VSelect
            v-model="mediaType"
            :items="['audio', 'video']"
            label="Media Type"
            class="mb-2"
          />

          <VSelect
            v-model="btnRounded"
            :items="['none', 'sm', 'md', 'lg', 'xl', 'pill', 'circle']"
            label="Button Rounded"
            class="mb-2"
          />

          <VSelect
            v-model="progressRounded"
            :items="['none', 'sm', 'md', 'lg', 'xl']"
            label="Progress Rounded"
            class="mb-4"
          />

          <VSlider
            v-model="defaultVolume"
            label="Default Volume"
            min="0"
            max="1"
            step="0.1"
            class="mb-4"
          />

          <VTextField
            v-model="playButtonColor"
            label="Play Button Color"
            class="mb-2"
          />
          <VTextField
            v-model="pauseButtonColor"
            label="Pause Button Color"
            class="mb-2"
          />
          <VTextField
            v-model="volumeButtonColor"
            label="Volume Button Color"
            class="mb-2"
          />
          <VTextField
            v-model="volumeOffButtonColor"
            label="Volume Off Button Color"
            class="mb-2"
          />
          <VTextField
            v-model="playbackRateButtonColor"
            label="Playback Rate Button Color"
            class="mb-2"
          />
          <VTextField
            v-model="settingsButtonColor"
            label="Settings Button Color"
            class="mb-2"
          />
        </VCard>
      </VCol>
    </VRow>

    <VCard class="pa-4 mt-4">
      <VCardTitle>Generated Code</VCardTitle>
      <VTextarea
        :model-value="generatedCode"
        readonly
        auto-grow
        variant="outlined"
      />
    </VCard>
  </div>
</template>