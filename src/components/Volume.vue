<script setup lang="ts">
import VolumeButton from '@playerify/components/Volume/VolumeButton.vue'
import VolumeSlider from '@playerify/components/Volume/VolumeSlider.vue'
import { computed, defineProps, ref, watch } from 'vue'

import { useListen } from '@playerify/composables/useEventBus'

import { useDisplay } from 'vuetify'

const { width } = useDisplay()

const volume = defineModel('volume')
const muted = defineModel('muted')

const props = defineProps({
  disabled: { type: Boolean, default () { return false } },
  hideVolumeButton: { type: Boolean, default () { return false } },
  volumeButtonColor: { type: String, default () { return 'default' } },
  volumeOffButtonColor: { type: String, default () { return 'default' } },
  btnRounded: { type: String, default () { return 'sm' } },
  volumeSliderColor: { type: String, default () { return 'primary' } },
  permanentVolumeSlider: { type: Boolean, default () { return false } },
})

const containerWidth = ref<number|null>(null)
useListen('playerify--container-resize', (newWidth: number) => {
  containerWidth.value = newWidth
})
const permanentVolumeSlider = computed(() => {
  const windowWidthGt660 = width.value > 660
  const containerWidthGt660 = containerWidth.value > 660
  return props.permanentVolumeSlider && windowWidthGt660 && containerWidthGt660
})

const floatingSliderMenu = ref(false)

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

watch(() => permanentVolumeSlider.value, () => {
  if (!permanentVolumeSlider.value) {
    floatingSliderMenu.value = true
  }
})
</script>

<template>
  <template v-if="permanentVolumeSlider">
    <VolumeButton
      v-model:muted="muted"
      :disabled="disabled"
      :hide-volume-button="hideVolumeButton"
      :btn-rounded="btnRounded"
      :volume-button-color="volumeButtonColor"
      :volume-off-button-color="volumeOffButtonColor"
    />
    <VolumeSlider
      v-model:volume="volume"
      :volume-slider-color="volumeSliderColor"
      style="width: calc(100% - 3em); max-width: 20em;"
    />
  </template>

  <VMenu
    v-else
    v-model="floatingSliderMenu"
    :offset="[-20,-30]"
    open-on-hover
    :close-on-content-click="false"
    transition="slide-x-transition"
    location="top"
  >
    <template #activator="{ props }">
      <VolumeButton
        v-model:muted="muted"
        :disabled="disabled"
        :hide-volume-button="hideVolumeButton"
        :btn-rounded="btnRounded"
        :volume-button-color="volumeButtonColor"
        :volume-off-button-color="volumeOffButtonColor"
        :props="props"
      />
    </template>

    <div class="floating-volume ml-3 elevation-2 rounded-lg" style="background: rgb(var(--v-theme-surface))">
      <VolumeSlider
        v-model:volume="volume"
        :volume-slider-color="volumeSliderColor"
        floating
      />
    </div>
  </VMenu>
</template>

<style lang="scss" scoped>
  .floating-volume {
    width: 30px;
  }
</style>