<script setup lang="ts">
import { formatDuration } from '@playerify/utils'

const currentTime = defineModel('currentTime')

defineProps({
  disabled: { type: Boolean, default: false },
  endBuffer: { type: Number },
  duration: { type: Number },
  waiting: { type: Boolean },
  progressRounded: { type: String, default: 'sm' },
  progressSliderColor: { type: String, default: 'primary' },
  progressColor: { type: String, default: 'primary' },
  bufferColor: { type: String, default: 'secondary' },
  showDuration: { type: Boolean, default: true },
})
</script>

<template>
  <div class="slider-buffer-container">
    <VSlider
        v-model="currentTime"
        :disabled="disabled"
        :color="progressSliderColor"
        min="0"
        :max="duration"
        :hide-details="true"
        track-color="transparent"
        :thumb-label="showDuration ? false : 'always'"
        class="play-slider"
    >
      <template #thumb-label="{ modelValue }">
        {{ formatDuration(!waiting ? modelValue : null) }}
      </template>
    </VSlider>

    <VProgressLinear
        v-if="!disabled"
        v-model="currentTime"
        :buffer-value="endBuffer"
        :color="progressColor"
        :buffer-color="bufferColor"
        :max="duration"
        :indeterminate="waiting"
        :rounded="progressRounded"
        height="6"
        class="buffer-bar"
    />
  </div>

  <span v-if="showDuration" class="media-progress-duration">
    {{ formatDuration(!waiting ? currentTime : null) }} / {{ formatDuration(!waiting ? duration : null) }}
  </span>
</template>

<style lang="scss" scoped>
.slider-buffer-container {
  position: relative;
  width: 100%;
  height: 40px; /* Adjust based on your theme */
  display: flex;
  align-items: center;
}

.buffer-bar {
  position: absolute;
  top: unset !important;
  left: 0;
  z-index: 0;
  border-radius: 4px;
}

.play-slider {
  position: absolute;
  left: 0;
  z-index: 1;
  width: 100%;
  margin: 0;
}

.media-progress-duration {
  text-wrap: nowrap;
  margin-left: 10px;
}
</style>