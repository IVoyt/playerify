<script setup lang="ts">
import BaseControls from "@playerify/components/BaseControls.vue";
import ExtraControls from '@playerify/components/ExtraControls.vue'
import Playlist from '@playerify/components/Playlist.vue'
import Progress from "@playerify/components/Progress.vue";
import { useMediaControls, UseMediaControlsReturn } from '@vueuse/core'
import { computed, reactive, Ref, ref, shallowRef, useTemplateRef, watch } from 'vue'
import { PlayerType } from '@playerify/enums'
import { PlaylistItem, PlaylistItemInternal } from '@playerify/types'
import { isFloat, stringify, processPlaylist } from '@playerify/utils'

const props = defineProps({
  type: { validator: (value: PlayerType) => Object.values(PlayerType).includes(value) },
  showPlaylist: { type: Boolean, default: false },
  playlist: { type: Array<string|PlaylistItem>, default: () => [] },
  playlistVariant: { type: String, default: 'elevated' },
  playlistButtonColor: { type: String, default: 'default' },
  videoWidth: { type: String, default: '100%' },
  videoHeight: { type: String, default: '' },
  playButtonColor: { type: String, default: 'default' },
  pauseButtonColor: { type: String, default: 'default' },
  volumeButtonColor: { type: String, default: 'default' },
  volumeOffButtonColor: { type: String, default: 'default' },
  playbackRateButtonColor: { type: String, default: 'default' },
  settingsButtonColor: { type: String, default: 'default' },
  fullscreenButtonColor: { type: String, default: 'default' },
  btnRounded: { type: String, default: 'sm' },
  progressRounded: { type: String, default: 'sm' },
  progressSliderColor: { type: String, default: 'primary' },
  volumeSliderColor: { type: String, default: 'primary' },
  defaultRewind: { type: Number, default: 10, validator: (value: number) => value > 0 && value <= 60 },
  defaultVolume: { type: Number, default: 0.8 },
  progressColor: { type: String, default: 'primary' },
  bufferColor: { type: String, default: 'secondary' },
  fileName: { type: String, default: '' },
  showFileName: { type: Boolean, default: true },
  showDuration: { type: Boolean, default: true },
  permanentVolumeSlider: { type: Boolean, default: true },
  debug: { type: Boolean, default: false },
})

const openPlaylist = ref(props.showPlaylist)

const defaultType = ref(props.type)

const currentFileName = ref('')
const currentMedia: Ref<PlaylistItemInternal|null> = ref(null)
const currentType = ref(defaultType.value || 'audio')

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

const media = useTemplateRef('media')
const loop = shallowRef(false)

function loadSrc () {
  const newControls = useMediaControls(media, {
    src: currentMedia.value?.src
  })

  // Copy all properties but keep error handling
  Object.assign(controls.value, newControls)

  currentFileName.value = currentMedia.value?.name || ''

  if (typeof defaultType.value === 'undefined') {
    currentType.value = currentMedia.value?.type || ''
  }
}

const controls: Ref<UseMediaControlsReturn> = ref({ error: '', ...useMediaControls(media) })
const text = computed(() => stringify(reactive(controls.value)))

const playerControls = ref(controls.value)
playerControls.value.waiting = true
playerControls.value.volume = defaultVolume.value

const endBuffer = computed(() => {
  return playerControls.value.buffered.length > 0
      ? playerControls.value.buffered[playerControls.value.buffered.length - 1][1]
      : 0
})

controls.value.error = 'No src or playlist provided'

watch(() => currentMedia.value, () => {
  if (media.value !== null) {
    // delete controls.value.error

    const { error, ...rest} = controls.value

    controls.value = rest
  }
}, { deep: true })

const playList: Ref<PlaylistItemInternal[]> = ref([])
watch(() => props.playlist, () => {
  playList.value = processPlaylist(props.playlist)
  if (playList.value.length) {
    currentMedia.value = playList.value[0]
  }
}, { deep: true, immediate: true })

function toggleFullscreen () {
  if (currentType.value !== PlayerType.VIDEO) {
    return
  }

  if (!document.fullscreenElement) {
    media.value.requestFullscreen()
  } else {
    document.exitFullscreen?.()
  }
}

watch(() => currentMedia.value, () => {
  if (currentMedia.value) {
    loadSrc()
  }
}, { deep: true, immediate: true })
</script>

<template>

  <div class="outline-none" :tabindex="0">
    <VCard>
      <VCardText
        @keydown.prevent.space="playerControls.playing = !playerControls.playing"
        @keydown.right="playerControls.currentTime += defaultRewind"
        @keydown.left="playerControls.currentTime -= defaultRewind"
      >
        <div v-if="!currentMedia || currentMedia.src === ''" class="d-flex">
          <VProgressCircular indeterminate width="1" color="primary ma-auto" />
        </div>
        <div v-else class="mt-5 relative rounded-md shadow overflow-hidden text-center">
          <template v-if="currentType === PlayerType.AUDIO">
            <audio
              ref="media"
              :key="currentMedia.src"
              class="w-full block"
              :loop="loop"
              @click="playerControls.playing = !playerControls.playing"
            />
          </template>
          <template v-else>
            <video
              ref="media"
              :key="currentMedia.src"
              class="w-full block"
              :width="videoWidth"
              :height="videoHeight"
              :loop="loop"
              @click="playerControls.playing = !playerControls.playing"
            />
          </template>
          <div v-if="showFileName">
            {{ currentFileName }}
          </div>
          <!--      <div>-->
          <!--        Unable to load src-->
          <!--      </div>-->
        </div>

        <div class="w-100 d-flex align-center">
          <Progress
            v-model:current-time="playerControls.currentTime"
            :disabled="media === null"
            :end-buffer="endBuffer"
            :duration="playerControls.duration"
            :waiting="playerControls?.waiting ?? true"
            :progress-rounded="progressRounded"
            :progress-slider-color="progressSliderColor"
            :progress-color="progressColor"
            :buffer-color="bufferColor"
            :show-duration="showDuration"
          />
        </div>

        <div class="d-flex flex-row">
          <BaseControls
            v-model:playing="playerControls.playing"
            v-model:volume="playerControls.volume"
            v-model:muted="playerControls.muted"
            :disabled="media === null"
            :btn-rounded="btnRounded"
            :play-button-color="playButtonColor"
            :pause-button-color="pauseButtonColor"
            :volume-button-color="volumeButtonColor"
            :volume-off-button-color="volumeOffButtonColor"
            :volume-slider-color="volumeSliderColor"
            :permanent-volume-slider="permanentVolumeSlider"
          />

          <div class="ml-auto extra-actions">
            <ExtraControls
              v-model:media="media"
              v-model:loop="loop"
              v-model:open-playlist="openPlaylist"
              :disabled="media === null"
              :btn-rounded="btnRounded"
              :show-playlist="showPlaylist"
              :playlist-button-color="playlistButtonColor"
              :playback-rate-button-color="playbackRateButtonColor"
              :settings-button-color="settingsButtonColor"
              :fullscreen-button-color="fullscreenButtonColor"
              :is-video="currentMedia?.type === PlayerType.VIDEO"
              @toggle-fullscreen="toggleFullscreen"
            />
          </div>
        </div>

        <div v-if="showPlaylist" class="mt-3">
          <Playlist v-model:media="currentMedia" :playlist="playList" v-model:open-playlist="openPlaylist" :playlist-variant="playlistVariant" />
        </div>

        <pre v-if="debug" class="code-block" lang="yaml">{{ text }}</pre>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
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