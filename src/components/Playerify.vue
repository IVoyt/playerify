<script setup lang="ts">
import ExtraActions from '@playerify/components/ExtraActions.vue'
import Volume from '@playerify/components/Volume.vue'
import { reactify, useMediaControls } from '@vueuse/core'
import { computed, defineProps, reactive, shallowRef, useTemplateRef } from 'vue'
import { PlayerType } from '@playerify/enums'
import YAML from 'yaml'

const props = defineProps({
  src: { type: String, required: true },
  type: { type: String },
  mimeType: { type: String },
  videoWidth: { type: String, default () { return '100%' } },
  videoHeight: { type: String, default () { return '' } },
  playButtonColor: { type: String, default () { return 'default' } },
  pauseButtonColor: { type: String, default () { return 'default' } },
  volumeButtonColor: { type: String, default () { return 'default' } },
  volumeOffButtonColor: { type: String, default () { return 'default' } },
  playbackRateButtonColor: { type: String, default () { return 'default' } },
  settingsButtonColor: { type: String, default () { return 'default' } },
  fullscreenButtonColor: { type: String, default () { return 'default' } },
  btnRounded: { type: String, default () { return 'sm' } },
  progressRounded: { type: String, default () { return 'sm' } },
  progressSliderColor: { type: String, default () { return 'primary' } },
  volumeSliderColor: { type: String, default () { return 'primary' } },
  defaultRewind: { type: Number, default () { return 10 } },
  defaultVolume: { type: Number, default () { return 0.8 } },
  progressColor: { type: String, default () { return 'primary' } },
  bufferColor: { type: String, default () { return 'secondary' } },
  fileName: { type: String, default () { return '' } },
  showFileName: { type: Boolean, default () { return true } },
  showDuration: { type: Boolean, default () { return true } },
  permanentVolumeSlider: { type: Boolean, default () { return true } },
  debug: { type: Boolean, default () { return false } },
})

const defaultVolume = computed(() => {
  if (props.defaultVolume > 1) {
    return 1
  }
  if (props.defaultVolume < 0) {
    return 0
  }

  return props.defaultVolume
})

const defaultRewind = computed(() => {
  let value = props.defaultRewind
  if (isFloat(value)) {
    value = parseInt(value.toFixed())
  }
  if (value > 60) {
    return 60
  }
  if (value < 0) {
    return 1
  }

  return value
})

function isFloat(n: number|string) {
  return typeof n === 'number' && !Number.isNaN(n) && !Number.isInteger(n)
}

const computedFileName = computed(() => props.fileName || props.src.split('/').at(-1))

const stringify = reactify(
    (input: any) => YAML.stringify(input, (k, v) => {
      if (typeof v === 'function') {
        return undefined
      }
      return v
    }, {
      singleQuote: true,
      flowCollectionPadding: false,
    }),
)

const media = useTemplateRef('media')
const loop = shallowRef(false)

const controls = useMediaControls(media, {
  src: {
    src: props.src
  },
})

const {
  playing,
  buffered,
  currentTime,
  duration,
  waiting,
  volume,
  muted,
} = controls
const text = stringify(reactive(controls))
volume.value = defaultVolume.value
const endBuffer = computed(() => buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0)
function formatDuration(seconds: number) {
  return new Date(1000 * seconds).toISOString().slice(14, 19)
}

function toggleFullscreen () {
  if (props.type !== PlayerType.VIDEO) {
    return
  }

  if (!document.fullscreenElement) {
    media.value.requestFullscreen()
  } else {
    document.exitFullscreen?.()
  }
}
</script>

<template>
  <div
    class="outline-none"
    :tabindex="0"
    autofocus
    @keydown.prevent.space="playing = !playing"
    @keydown.right="currentTime += defaultRewind"
    @keydown.left="currentTime -= defaultRewind"
  >
    <div class="mt-5 relative rounded-md shadow overflow-hidden text-center">
      <template v-if="type === PlayerType.AUDIO">
        <audio
          ref="media"
          class="w-full block"
          :loop="loop"
          @click="playing = !playing"
        />
      </template>
      <template v-else>
        <video
          ref="media"
          class="w-full block"
          :width="videoWidth"
          :height="videoHeight"
          :loop="loop"
          @click="playing = !playing"
        />
      </template>
      <div v-if="showFileName">
        {{ computedFileName }}
      </div>
      <!--      <div>-->
      <!--        Unable to load src-->
      <!--      </div>-->
    </div>

    <div class="w-100 d-flex align-center">
      <div class="slider-buffer-container">
        <VSlider
          v-model="currentTime"
          :color="progressSliderColor"
          min="0"
          :max="duration"
          :hide-details="true"
          track-color="transparent"
          :thumb-label="showDuration ? false : 'always'"
          class="play-slider"
        >
          <template #thumb-label="{ modelValue }">
            {{ formatDuration(modelValue) }}
          </template>
        </VSlider>

        <VProgressLinear
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

      <span v-if="showDuration" class="media-progress-duration">{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span>
    </div>

    <div class="d-flex flex-row">
      <VBtn size="32" :color="playing ? pauseButtonColor : playButtonColor" :rounded="btnRounded" @click="playing = !playing">
        <VIcon>
          <template v-if="playing">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="icon-tabler" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="6" height="16" rx="2" /><rect x="14" y="4" width="6" height="16" rx="2" /></g></svg>
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5v14a2 2 0 0 0 2.75 1.84L20 13.74a2 2 0 0 0 0-3.5L7.75 3.14A2 2 0 0 0 5 4.89" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </template>
        </VIcon>
      </VBtn>
      <Volume
        v-model:volume="volume"
        v-model:muted="muted"
        :volume-button-color="volumeButtonColor"
        :volume-off-button-color="volumeOffButtonColor"
        :volume-slider-color="volumeSliderColor"
        :btn-rounded="btnRounded"
        :permanent-volume-slider="permanentVolumeSlider"
      />

      <div class="ml-auto extra-actions">
        <ExtraActions
          v-model:media="media"
          v-model:loop="loop"
          :btn-rounded="btnRounded"
          :playback-rate-button-color="playbackRateButtonColor"
          :settings-button-color="settingsButtonColor"
          :fullscreen-button-color="fullscreenButtonColor"
          :is-video="type === PlayerType.VIDEO"
          @toggle-fullscreen="toggleFullscreen"
        />
      </div>
    </div>
  </div>
  <pre v-if="debug" class="code-block" lang="yaml">{{ text }}</pre>
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

.extra-actions {
  width: 140px;
  display: flex;
  justify-content: flex-end;
}

.volume-slider {
  width: calc(100% - 50px);
  max-width: 300px;
}
</style>