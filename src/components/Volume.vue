<script setup lang="ts">
import VolumeButton from '@playerify/components/Volume/VolumeButton.vue'
import VolumeSlider from '@playerify/components/Volume/VolumeSlider.vue'
import { defineProps, ref, watch } from 'vue'

const volume = defineModel('volume')
const muted = defineModel('muted')

defineProps({
  disabled: { type: Boolean, default () { return false } },
  volumeButtonColor: { type: String, default () { return 'default' } },
  volumeOffButtonColor: { type: String, default () { return 'default' } },
  btnRounded: { type: String, default () { return 'sm' } },
  volumeSliderColor: { type: String, default () { return 'primary' } },
  permanentVolumeSlider: { type: Boolean, default () { return false } },
})

const volumePrevious = ref(volume.value)

watch(() => volume.value, () => {
  if (volume.value > 0) {
    muted.value = false
    volumePrevious.value = volume.value
  } else {
    muted.value = true
  }
})

watch(() => muted.value, () => {
  volume.value = muted.value ? 0 : volumePrevious.value
})
</script>

<template>
  <template v-if="permanentVolumeSlider">
    <VolumeButton
      v-model:muted="muted"
      :disabled="disabled"
      :btn-rounded="btnRounded"
      :volume-button-color="volumeButtonColor"
      :volume-off-button-color="volumeOffButtonColor"
    />
    <VolumeSlider v-model:volume="volume" style="width: calc(100% - 3em); max-width: 20em;" />
  </template>

  <VMenu v-else open-on-hover :close-on-content-click="false" transition="slide-x-transition" location="end">
    <template #activator="{ props }">
      <VolumeButton
        v-model:muted="muted"
        :disabled="disabled"
        :btn-rounded="btnRounded"
        :volume-button-color="volumeButtonColor"
        :volume-off-button-color="volumeOffButtonColor"
        :props="props"
      />
    </template>

    <div style="min-width: 200px; width: 100%" class="ml-3">
      <VolumeSlider v-model:volume="volume" style="margin: 0 10px" />
    </div>
  </VMenu>
</template>