<script setup lang="ts">
import Volume from '@playerify/components/Volume.vue'
import { PlayerType } from '@playerify/enums'

import { useEvent } from '@playerify/composables/useEventBus'

const playing = defineModel('playing')
const volume = defineModel('volume')
const muted = defineModel('muted')

defineProps({
  type: { validator: (value: PlayerType) => Object.values(PlayerType).includes(value) },
  disabled: { type: Boolean, default: false },
  disabledPrevTrackButton: { type: Boolean, default: false },
  disabledNextTrackButton: { type: Boolean, default: false },
  hidePlayButton: { type: Boolean, default: false },
  hidePrevTrackButton: { type: Boolean, default: false },
  hideNextTrackButton: { type: Boolean, default: false },
  hideVolumeButton: { type: Boolean, default: false },
  playButtonColor: { type: String, default: 'default' },
  pauseButtonColor: { type: String, default: 'default' },
  volumeButtonColor: { type: String, default: 'default' },
  volumeOffButtonColor: { type: String, default: 'default' },
  btnRounded: { type: String, default: 'sm' },
  volumeSliderColor: { type: String, default: 'primary' },
  defaultVolume: { type: Number, default: 0.8 },
  permanentVolumeSlider: { type: Boolean, default: true },
})

function firstTrack() {
  useEvent('playerify--first-track')
}

function prevTrack() {
  useEvent('playerify--prev-track')
}

function nextTrack() {
  useEvent('playerify--next-track')
}

function lastTrack() {
  useEvent('playerify--last-track')
}
</script>

<template>
  <VBtnGroup class="mr-3" :rounded="btnRounded" :disabled="disabled" variant="elevated" elevation="2" density="compact">
    <VBtn v-if="!hidePrevTrackButton" :disabled="disabledPrevTrackButton" size="36" @click="prevTrack">
      <VIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 5v14l-8-7zM10 5v14l-8-7z" /></svg>
      </VIcon>
    </VBtn>
    <VBtn
      v-if="!hidePlayButton"
      size="36"
      :color="playing ? pauseButtonColor : playButtonColor"
      @click="playing = !playing"
    >
      <VIcon>
        <template v-if="playing">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="icon-tabler" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="6" height="16" rx="2" /><rect x="14" y="4" width="6" height="16" rx="2" /></g></svg>
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5v14a2 2 0 0 0 2.75 1.84L20 13.74a2 2 0 0 0 0-3.5L7.75 3.14A2 2 0 0 0 5 4.89" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </template>
      </VIcon>
    </VBtn>
    <VBtn v-if="!hideNextTrackButton" :disabled="disabledNextTrackButton" size="36" @click="nextTrack">
      <VIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v14l8-7zm11 0v14l8-7z" /></svg>
      </VIcon>
    </VBtn>
  </VBtnGroup>
  <Volume
    v-model:volume="volume"
    v-model:muted="muted"
    :disabled="disabled"
    :hide-volume-button="hideVolumeButton"
    :volume-button-color="volumeButtonColor"
    :volume-off-button-color="volumeOffButtonColor"
    :volume-slider-color="volumeSliderColor"
    :btn-rounded="btnRounded"
    :permanent-volume-slider="permanentVolumeSlider"
  />
</template>

<style lang="scss" scoped>
  .extra-controls {
    width: 140px;
    display: flex;
    justify-content: flex-end;
  }
</style>