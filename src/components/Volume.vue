<script setup lang="ts">
import VolumeButton from '@playerify/components/Volume/VolumeButton.vue'
import VolumeSlider from '@playerify/components/Volume/VolumeSlider.vue'
import { computed, defineProps, ref, watch } from 'vue'

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

const permanentVolumeSlider = computed(() => props.permanentVolumeSlider && width.value > 660)

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

    <!--    <VCard style="background: rgb(var(&#45;&#45;v-theme-surface))" class="ml-3">-->
    <div style="background: rgb(var(--v-theme-surface))" class="ml-3 elevation-2">
      <!--      <VolumeSlider v-model:volume="volume" style="margin: 0 10px; height: 36px" />-->
      <VolumeSlider
        v-model:volume="volume"
        :volume-slider-color="volumeSliderColor"
        floating
      />
    </div>
    <!--    </VCard>-->
  </VMenu>
</template>