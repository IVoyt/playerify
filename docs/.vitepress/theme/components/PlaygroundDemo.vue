<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PlaylistItem } from '@playerify/types'

const sources: { [key:string]: { src: string, name: string }[] } = {
  audio: [
    {
      src: 'https://freemusicarchive.org/track/dream-diary/stream',
      name: 'Pamela Yuen - Dream Diary'
    },
    {
      src: 'https://freemusicarchive.org/track/tranquility-3/stream',
      name: 'Free The Muses - Tranquility'
    },
    {
      src: 'https://freemusicarchive.org/track/morning-coffe-vibemp3/stream',
      name: 'YuraSoop - Morning Coffe Vibe'
    }
  ],
  video: [
    {
      src: 'https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4',
      name: 'Big Buck Bunny'
    },
    {
      src: 'https://archive.org/download/Sintel/sintel-2048-surround_512kb.mp4',
      name: 'Sintel'
    },
    {
      src: 'https://archive.org/download/ElephantsDream/ed_hd_512kb.mp4',
      name: 'Elephant\'s Dream'
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Coffee_Run_-_Blender_Open_Movie-full_movie.webm/Coffee_Run_-_Blender_Open_Movie-full_movie.webm.1080p.vp9.webm',
      name: 'Coffee Run'
    }
  ]
}

const playlist: PlaylistItem[] = []
for (const group of Object.keys(sources)) {
  sources[group].forEach((item: { src: string, name: string }) => {
    playlist.push(item)
  })
}

const playButtonColor = ref('default')
const pauseButtonColor = ref('primary')
const volumeButtonColor = ref('default')
const volumeOffButtonColor = ref('default')
const playlistVariant = ref('default')
const playlistButtonColor = ref('default')
const playbackRateButtonColor = ref('default')
const settingsButtonColor = ref('default')
const fullscreenButtonColor = ref('orange')

const debug = ref(false)
const hidePlaylist = ref(false)
const hidePlaylistButton = ref(false)
const hideFileName = ref(false)
const hideDuration = ref(false)
const hideMainControls = ref(false)
const hideExtraControls = ref(false)
const hidePrevTrackButton = ref(false)
const hideNextTrackButton = ref(false)
const hidePlayButton = ref(false)
const hideVolumeButton = ref(false)
const hidePlaybackRateButton = ref(false)
const hideFullscreenButton = ref(false)
const hideAllControls = ref(false)
const hideProgress = ref(false)
const coverImageOriginalSize = ref(true)
const permanentVolumeSlider = ref(true)

const autoplayNextTrack = ref(true)
const defaultRewind = ref(10)
const defaultVolume = ref(0.8)
const btnRounded = ref('sm')
const progressRounded = ref('sm')

const frameWidth = ref('100%')
const frameHeight = ref('')
const coverImage = ref('')

const generatedCode = computed(() => {
  const props = [
    `:playlist="${JSON.stringify(playlist)}"`,
    `:hide-playlist-button="${hidePlaylistButton.value}"`,
    `:autoplay-next-track="${autoplayNextTrack.value}"`,
    `:cover-image="${coverImage.value}"`,
    `:cover-image-original-size="${coverImageOriginalSize.value}"`,
    `:frame-width="${frameWidth.value}"`,
    `:frame-height="${frameHeight.value}"`,
    `:hide-all-controls="${hideAllControls.value}"`,
    `:hide-progress="${hideProgress.value}"`,
    `:hide-main-controls="${hideMainControls.value}"`,
    `:hide-extra-controls="${hideExtraControls.value}"`,
    `:hide-prev-track-button="${hidePrevTrackButton.value}"`,
    `:hide-next-track-button="${hideNextTrackButton.value}"`,
    `:hide-play-button="${hidePlayButton.value}"`,
    `:hide-volume-button="${hideVolumeButton.value}"`,
    `:hide-playback-rate-button="${hidePlaybackRateButton.value}"`,
    `:hide-fullscreen-button="${hideFullscreenButton.value}"`,
    `:hide-file-name="${hideFileName.value}"`,
    `:hide-duration="${hideDuration.value}"`,
    `play-button-color="${playButtonColor.value}"`,
    `pause-button-color="${pauseButtonColor.value}"`,
    `volume-button-color="${volumeButtonColor.value}"`,
    `volume-off-button-color="${volumeOffButtonColor.value}"`,
    `playlist-button-color="${playlistButtonColor.value}"`,
    `playlist-variant="${playlistVariant.value}"`,
    `playback-rate-button-color="${playbackRateButtonColor.value}"`,
    `extras-button-color="${settingsButtonColor.value}"`,
    `fullscreen-button-color="${fullscreenButtonColor.value}"`,
    `btn-rounded="${btnRounded.value}"`,
    `progress-rounded="${progressRounded.value}"`,
    `default-rewind="${defaultRewind.value}"`,
    `default-volume="${defaultVolume.value}"`,
    `:permanent-volume-slider="${permanentVolumeSlider.value}"`,
    `:debug="${debug.value}"`,
  ]

  return `<Playerify\n  ${props.join('\n  ')}\n/>`
})

const activeTab = ref('controls')
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard class="pa-4">
          <VCardTitle>Player</VCardTitle>
          <Playerify
            :playlist="playlist"
            :hide-playlist-button="hidePlaylistButton"
            :autoplay-next-track="autoplayNextTrack"
            :cover-image="coverImage"
            :cover-image-original-size="coverImageOriginalSize"
            :frame-width="frameWidth"
            :frame-height="frameHeight"
            :hide-all-controls="hideAllControls"
            :hide-progress="hideProgress"
            :hide-main-controls="hideMainControls"
            :hide-extra-controls="hideExtraControls"
            :hide-prev-track-button="hidePrevTrackButton"
            :hide-next-track-button="hideNextTrackButton"
            :hide-play-button="hidePlayButton"
            :hide-volume-button="hideVolumeButton"
            :hide-playback-rate-button="hidePlaybackRateButton"
            :hide-fullscreen-button="hideFullscreenButton"
            :hide-file-name="hideFileName"
            :hide-duration="hideDuration"
            :hide-playlist="hidePlaylist"
            :play-button-color="playButtonColor"
            :pause-button-color="pauseButtonColor"
            :volume-button-color="volumeButtonColor"
            :volume-off-button-color="volumeOffButtonColor"
            :playlist-button-color="playlistButtonColor"
            :playback-rate-button-color="playbackRateButtonColor"
            :extras-button-color="settingsButtonColor"
            :fullscreen-button-color="fullscreenButtonColor"
            :btn-rounded="btnRounded"
            :progress-rounded="progressRounded"
            :default-rewind="defaultRewind"
            :default-volume="defaultVolume"
            :permanent-volume-slider="permanentVolumeSlider"
            :debug="debug"
          />
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard class="pa-4">
          <VCardTitle>Config Builder</VCardTitle>

          <VTabs v-model="activeTab">
            <VTab value="controls">
              Controls
            </VTab>
            <VTab value="appearance">
              Appearance
            </VTab>
            <VTab value="behavior">
              Behavior
            </VTab>
          </VTabs>

          <VWindow v-model="activeTab">
            <VWindowItem value="controls">
              <VCard>
                <VCardText>
                  <VRow>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hideAllControls"
                        color="primary"
                        label="Hide All Controls"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hideProgress"
                        color="primary"
                        label="Hide Progress"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hideMainControls"
                        color="primary"
                        label="Hide Main Controls"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hideExtraControls"
                        color="primary"
                        label="Hide Extra Controls"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hidePrevTrackButton"
                        color="primary"
                        label="Hide Prev Track Button"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hideNextTrackButton"
                        color="primary"
                        label="Hide Next Track Button"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hidePlayButton"
                        color="primary"
                        label="Hide Play Button"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hideVolumeButton"
                        color="primary"
                        label="Hide Volume Button"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hidePlaybackRateButton"
                        color="primary"
                        label="Hide Playback Rate"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hideFullscreenButton"
                        color="primary"
                        label="Hide Fullscreen"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="hidePlaylistButton"
                        color="primary"
                        label="Hide Playlist Button"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VWindowItem>

            <VWindowItem value="appearance">
              <VCard>
                <VCardText>
                  <VRow>
                    <VCol cols="12" md="4">
                      <VSwitch
                        v-model="debug"
                        color="primary"
                        label="Debug"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VSwitch
                        v-model="hideFileName"
                        color="primary"
                        label="Hide File Name"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VSwitch
                        v-model="hideDuration"
                        color="primary"
                        label="Hide Duration"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VSwitch
                        v-model="hidePlaylist"
                        color="primary"
                        label="Hide Playlist"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VSwitch
                        v-model="permanentVolumeSlider"
                        color="primary"
                        label="Permanent Volume Slider"
                        class="mb-4"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>

                  <VDivider />

                  <VRow>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="coverImage"
                        label="Cover Image"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="coverImageOriginalSize"
                        color="primary"
                        label="Cover Image Original Size"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>

                  <VDivider />

                  <VRow>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="frameWidth"
                        label="Frame Width"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="frameHeight"
                        label="Frame Height"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>

                  <VDivider />

                  <VRow>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="playButtonColor"
                        label="Play Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="pauseButtonColor"
                        label="Pause Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="volumeButtonColor"
                        label="Volume Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="volumeOffButtonColor"
                        label="Volume Off Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="playlistButtonColor"
                        label="Playlist Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="playlistVariant"
                        label="Playlist Variant"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="playbackRateButtonColor"
                        label="Playback Rate Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="settingsButtonColor"
                        label="Extras Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="fullscreenButtonColor"
                        label="Fullscreen Button Color"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>

                  <VDivider />

                  <VRow>
                    <VCol cols="12" md="6">
                      <VSelect
                        v-model="btnRounded"
                        :items="['none', 'sm', 'md', 'lg', 'xl', 'pill', 'circle']"
                        label="Button Rounded"
                        class="mb-2"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VSelect
                        v-model="progressRounded"
                        :items="['none', 'sm', 'md', 'lg', 'xl']"
                        label="Progress Rounded"
                        class="mb-4"
                        variant="outlined"
                        density="comfortable"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VWindowItem>

            <VWindowItem value="behavior">
              <VCard>
                <VCardText>
                  <VRow>
                    <VCol cols="12" md="6">
                      <VSlider
                        v-model="defaultRewind"
                        color="primary"
                        label="Default Rewind"
                        min="1"
                        max="60"
                        step="1"
                        class="mt-6"
                        thumb-label="always"
                        :hide-details="true"
                      />
                    </VCol>

                    <VCol cols="12" md="6">
                      <VSlider
                        v-model="defaultVolume"
                        color="primary"
                        label="Default Volume"
                        min="0"
                        max="1"
                        step="0.1"
                        class="mt-6"
                        thumb-label="always"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>

                  <VRow>
                    <VCol cols="12" md="6">
                      <VSwitch
                        v-model="autoplayNextTrack"
                        color="primary"
                        label="Autoplay next track"
                        class="mb-2"
                        :hide-details="true"
                      />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VCol>
    </VRow>

    <VCard class="pa-4 mt-4">
      <VExpansionPanels>
        <VExpansionPanel>
          <VExpansionPanelTitle>
            <template #actions="{ expanded }">
              <svg v-if="expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 13l8-3l8 3" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 11l8 3l8-3" /></svg>
            </template>

            <VCardTitle>Generated Code</VCardTitle>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VTextarea
              :model-value="generatedCode"
              readonly
              auto-grow
              variant="outlined"
            />
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCard>
  </div>
</template>