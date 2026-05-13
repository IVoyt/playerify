<script setup lang="ts">
import BaseControls from '@playerify/components/BaseControls.vue'
import ExtraControls from '@playerify/components/ExtraControls.vue'
import Playlist from '@playerify/components/Playlist.vue'
import Progress from '@playerify/components/Progress.vue'
import { useElementSize, useMediaControls, UseMediaControlsReturn } from '@vueuse/core'
import {
  ComponentPublicInstance,
  computed,
  reactive,
  Ref,
  ref,
  shallowRef,
  useTemplateRef,
  watch
} from 'vue'
import { PlayerType } from '@playerify/enums'
import { PlaylistItem, PlaylistItemInternal } from '@playerify/types'
import { isFloat, stringify, processPlaylist } from '@playerify/utils'
import { useEvent, useListen } from '@playerify/composables/useEventBus'

const props = defineProps({
  type: { validator: (value: PlayerType) => Object.values(PlayerType).includes(value) },
  coverImage: { type: String },
  coverImageOriginalSize: { type: Boolean, default: true },
  playlist: { type: Array<string|PlaylistItem>, default: () => [] },
  playlistVariant: { type: String, default: 'elevated' },
  playlistButtonColor: { type: String, default: 'default' },
  frameWidth: { type: String, default: '100%' },
  frameHeight: { type: String, default: '' },
  hideFileName: { type: Boolean, default: false },
  hideDuration: { type: Boolean, default: false },
  hideAllControls: { type: Boolean, default: false },
  hideProgress: { type: Boolean, default: false },
  hideMainControls: { type: Boolean, default: false },
  hideExtraControls: { type: Boolean, default: false },
  hidePlayButton: { type: Boolean, default: false },
  hidePrevTrackButton: { type: Boolean, default: false },
  hideNextTrackButton: { type: Boolean, default: false },
  hideVolumeButton: { type: Boolean, default: false },
  hidePlaylistButton: { type: Boolean, default: false },
  hidePlaybackRateButton: { type: Boolean, default: false },
  hideExtrasButton: { type: Boolean, default: false },
  hideFullscreenButton: { type: Boolean, default: false },
  playButtonColor: { type: String, default: 'default' },
  pauseButtonColor: { type: String, default: 'default' },
  volumeButtonColor: { type: String, default: 'default' },
  volumeOffButtonColor: { type: String, default: 'default' },
  playbackRateButtonColor: { type: String, default: 'default' },
  extrasButtonColor: { type: String, default: 'default' },
  fullscreenButtonColor: { type: String, default: 'default' },
  btnRounded: { type: String, default: 'md' },
  progressRounded: { type: String, default: 'sm' },
  progressSliderColor: { type: String, default: 'primary' },
  volumeSliderColor: { type: String, default: 'primary' },
  defaultRewind: { type: Number, default: 10, validator: (value: number) => value > 0 && value <= 60 },
  defaultVolume: { type: Number, default: 0.8 },
  progressColor: { type: String, default: 'primary' },
  bufferColor: { type: String, default: 'secondary' },
  permanentVolumeSlider: { type: Boolean, default: true },
  debug: { type: Boolean, default: false },
})

const openPlaylist = ref(!props.hidePlaylistButton)

const defaultType = ref(props.type)

const currentFileName = ref('')
const currentMedia: Ref<PlaylistItemInternal|null> = ref(null)
const currentType = ref(defaultType.value || 'audio')
const currentCoverImage = ref(props.coverImage)

const coverImageAttributes = computed(() => {
  const attributes: { width: string, height?: string } = { width: 'auto' }
  if (props.frameWidth && !props.coverImageOriginalSize) {
    attributes.width = props.frameWidth
  }
  if (props.frameHeight && !props.coverImageOriginalSize) {
    attributes.height = props.frameHeight
  }
  return attributes
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

  currentCoverImage.value = typeof props.coverImage === 'undefined'
    ? currentCoverImage.value = currentMedia.value?.cover || ''
    : props.coverImage
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

if (!props.playlist.length) {
  controls.value.error = 'No playlist provided'
}

watch(() => currentMedia.value, () => {
  if (media.value !== null) {
    const { error, ...rest } = controls.value

    controls.value = rest
  }
}, { deep: true })

const playList: Ref<PlaylistItemInternal[]> = ref([])
watch(() => props.playlist, () => {
  playList.value = processPlaylist(props.playlist)
  if (playList.value.length) {
    currentMedia.value = playList.value[0]

    // const notLoaded = playList.value.filter((item: PlaylistItemInternal) => !item.loaded)
    controls.value.error = 'Some files can\'t be loaded'
  }
}, { deep: true, immediate: true })

const trackIndex = computed(() => playList.value.findIndex(item => item.src === currentMedia.value?.src))
const prevTrackAvailable = computed(() => {
  return trackIndex.value > 0
})

const nextTrackAvailable = computed(() => {
  return trackIndex.value < (playList.value.length - 1)
})

useListen('playerify--prev-track', () => {
  if (prevTrackAvailable.value) {
    currentMedia.value = playList.value[trackIndex.value - 1]
  }
})
useListen('playerify--next-track', () => {
  if (nextTrackAvailable.value) {
    currentMedia.value = playList.value[trackIndex.value + 1]
  }
})

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

function togglePictureInPicture () {
  if (currentType.value !== PlayerType.VIDEO) {
    return
  }

  playerControls.value.togglePictureInPicture()
}

watch(() => currentMedia.value, () => {
  if (currentMedia.value) {
    loadSrc()
  }
}, { deep: true })

watch(() => props.coverImage, () => {
  currentCoverImage.value = props.coverImage
})

const playerContainer = useTemplateRef<ComponentPublicInstance>('playerContainer')
const { width: playerContainerWidth } = useElementSize(playerContainer)

watch(playerContainerWidth, () => {
  useEvent('playerify--container-resize', playerContainerWidth.value)
})
</script>

<template>
  <VCard ref="playerContainer">
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
          <div v-if="currentCoverImage" :class="coverImageOriginalSize ? 'cover-image' : ''">
            <VImg :src="currentCoverImage" v-bind="coverImageAttributes" class="ma-auto" />
          </div>
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
            :width="frameWidth"
            :height="frameHeight"
            :loop="loop"
            :poster="currentCoverImage"
            @click="playerControls.playing = !playerControls.playing"
          />
        </template>
        <div v-if="!hideFileName" :class="currentType === PlayerType.VIDEO ? 'mt-4' : ''">
          {{ currentFileName }}
        </div>
        <!--      <div>-->
        <!--        Unable to load src-->
        <!--      </div>-->
      </div>

      <div v-if="!hideAllControls && !hideProgress" class="w-100 d-flex align-center">
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
          :hide-duration="hideDuration"
        />
      </div>

      <div v-if="!hideAllControls" class="d-flex flex-row">
        <BaseControls
          v-if="!hideMainControls"
          v-model:playing="playerControls.playing"
          v-model:volume="playerControls.volume"
          v-model:muted="playerControls.muted"
          :disabled="media === null"
          :disabled-prev-track-button="!prevTrackAvailable"
          :disabled-next-track-button="!nextTrackAvailable"
          :hide-prev-track-button="hidePrevTrackButton"
          :hide-next-track-button="hideNextTrackButton"
          :hide-play-button="hidePlayButton"
          :hide-volume-button="hideVolumeButton"
          :btn-rounded="btnRounded"
          :play-button-color="playButtonColor"
          :pause-button-color="pauseButtonColor"
          :volume-button-color="volumeButtonColor"
          :volume-off-button-color="volumeOffButtonColor"
          :volume-slider-color="volumeSliderColor"
          :permanent-volume-slider="permanentVolumeSlider"
        />

        <div v-if="!hideExtraControls" class="ml-auto extra-actions">
          <ExtraControls
            v-model:media="media"
            v-model:loop="loop"
            v-model:is-picture-in-picture="playerControls.isPictureInPicture"
            v-model:open-playlist="openPlaylist"
            :disabled="media === null"
            :hide-playlist-button="hidePlaylistButton"
            :hide-playback-rate-button="hidePlaybackRateButton"
            :hide-extras-button="hideExtrasButton"
            :hide-fullscreen-button="hideFullscreenButton"
            :supports-picture-in-picture="playerControls.supportsPictureInPicture"
            :btn-rounded="btnRounded"
            :playlist-button-color="playlistButtonColor"
            :playback-rate-button-color="playbackRateButtonColor"
            :extras-button-color="extrasButtonColor"
            :fullscreen-button-color="fullscreenButtonColor"
            :is-video="currentMedia?.type === PlayerType.VIDEO"
            @toggle-fullscreen="toggleFullscreen"
            @toggle-picture-in-picture="togglePictureInPicture"
          />
        </div>
      </div>

      <div v-if="!hideAllControls && !hideExtraControls" class="mt-3">
        <Playlist v-model:media="currentMedia" v-model:open-playlist="openPlaylist" :playlist="playList" :playlist-variant="playlistVariant" />
      </div>

      <pre v-if="debug" class="code-block" lang="yaml">{{ text }}</pre>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.cover-image:deep(.v-img img) {
  object-fit: none;
}

.extra-actions {
  display: flex;
  justify-content: flex-end;
}
</style>