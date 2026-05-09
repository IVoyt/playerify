<script setup lang="ts">
import { defineProps } from 'vue'

const volume = defineModel('volume', { default: 0 })

defineProps({
  volumeButtonColor: { type: String, default () { return 'default' } },
  volumeOffButtonColor: { type: String, default () { return 'default' } },
  btnRounded: { type: String, default () { return 'sm' } },
  volumeSliderColor: { type: String, default () { return 'primary' } },
})
</script>

<template>
  <div class="volume-slider d-flex align-center justify-space-between">
    <VSlider v-model="volume" :color="volumeSliderColor" max="1" :step="0.01" :hide-details="true" :thumb-label="false" />

    <span class="ml-3" style="width: 3em; text-wrap: nowrap">{{ (volume * 100).toFixed() }} %</span>
  </div>
</template>

<style lang="scss">
  .volume-slider {
    max-width: 300px;
  }
</style>