<script setup lang="ts">
import { ComponentPublicInstance, defineProps, useTemplateRef } from 'vue'

const volume = defineModel('volume', { default: 0 })

defineProps({
  floating: { type: Boolean, default () { return false } },
  volumeSliderColor: { type: String, default () { return 'primary' } },
})

const slider = useTemplateRef<ComponentPublicInstance>('slider')

function blurSlider() {
  slider.value?.$el.querySelector('.v-slider-thumb').blur()
}
</script>

<template>
  <div class="volume-slider d-flex align-center justify-space-between">
    <VSlider
      ref="slider"
      v-model="volume"
      :focused="false"
      :color="volumeSliderColor"
      max="1"
      :step="0.01"
      :hide-details="true"
      :thumb-label="floating ? 'always' : false"
      :thumb-size="floating ? 16 : 0"
      :direction="floating ? 'vertical' : 'horizontal'"
      :class="floating ? 'floating' : ''"
      @mouseup="blurSlider"
    >
      <template #thumb-label>
        {{ (volume * 100).toFixed() }}
      </template>

      <template #append>
        <span v-if="!floating" style="width: 3em; text-wrap: nowrap">{{ (volume * 100).toFixed() }} %</span>
      </template>
    </VSlider>
  </div>
</template>

<style lang="scss" scoped>
  .v-slider.floating :deep(> .v-input__control) {
    min-height: 150px;
  }
</style>