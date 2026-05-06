<script setup lang="ts">
import { ref, computed } from 'vue'

const mediaType = ref<'audio' | 'video'>('video')

const sources = {
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

const selectedSource = ref(sources.video[0])

const playButtonColor = ref('default')
const pauseButtonColor = ref('primary')
const volumeButtonColor = ref('default')
const volumeOffButtonColor = ref('default')
const playbackRateButtonColor = ref('default')
const settingsButtonColor = ref('default')
const fullscreenButtonColor = ref('orange')

const customFileName = ref('')
const debug = ref(false)
const showFileName = ref(true)
const showDuration = ref(true)
const permanentVolumeSlider = ref(true)

const defaultRewind = ref(10)
const defaultVolume = ref(0.8)
const btnRounded = ref('sm')
const progressRounded = ref('sm')

const generatedCode = computed(() => {
  const props = [
    `:src="${selectedSource.value.src}"`,
    `type="${mediaType.value}"`,
    `play-button-color="${playButtonColor.value}"`,
    `pause-button-color="${pauseButtonColor.value}"`,
    `volume-button-color="${volumeButtonColor.value}"`,
    `volume-off-button-color="${volumeOffButtonColor.value}"`,
    `playback-rate-button-color="${playbackRateButtonColor.value}"`,
    `settings-button-color="${settingsButtonColor.value}"`,
    `fullscreen-button-color="${fullscreenButtonColor.value}"`,
    `btn-rounded="${btnRounded.value}"`,
    `progress-rounded="${progressRounded.value}"`,
    `default-rewind="${defaultRewind.value}"`,
    `default-volume="${defaultVolume.value}"`,
    `:file-name="${customFileName.value || selectedSource.value.name}"`,
    `:show-file-name="${showFileName.value}"`,
    `:show-duration="${showDuration.value}"`,
    `:permanent-volume-slider="${permanentVolumeSlider.value}"`,
    `:debug="${debug.value}"`,
  ]

  return `<Playerify\n  ${props.join('\n  ')}\n/>`
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard class="pa-4">
          <VCardTitle>Sources</VCardTitle>

          <VCardItem v-for="(items, type) in sources">
            <VCardText>{{ type }}</VCardText>
            <VBtn v-for="item in items" class="ma-2" @click="selectedSource = item; mediaType = type">
              {{ item.name }}
            </VBtn>
          </VCardItem>
        </VCard>

        <VCard class="pa-4">
          <VCardTitle>Player</VCardTitle>
          <Playerify
            :key="selectedSource.src"
            :src="selectedSource.src"
            :type="mediaType"
            :play-button-color="playButtonColor"
            :pause-button-color="pauseButtonColor"
            :volume-button-color="volumeButtonColor"
            :volume-off-button-color="volumeOffButtonColor"
            :playback-rate-button-color="playbackRateButtonColor"
            :settings-button-color="settingsButtonColor"
            :fullscreen-button-color="fullscreenButtonColor"
            :btn-rounded="btnRounded"
            :progress-rounded="progressRounded"
            :default-rewind="defaultRewind"
            :default-volume="defaultVolume"
            :file-name="customFileName || selectedSource.name"
            :show-file-name="showFileName"
            :show-duration="showDuration"
            :permanent-volume-slider="permanentVolumeSlider"
            :debug="debug"
          />
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard class="pa-4">
          <VCardTitle>Controls</VCardTitle>

          <VRow>
            <VCol cols="12" md="6">
              <VCard class="pa-4">
                <VSwitch
                  v-model="debug"
                  color="primary"
                  label="Debug"
                  class="mb-2"
                  :hide-details="true"
                />
                <VSwitch
                  v-model="showFileName"
                  color="primary"
                  label="Show File Name"
                  class="mb-2"
                  :hide-details="true"
                />
                <VSwitch
                  v-model="showDuration"
                  color="primary"
                  label="Show Duration"
                  class="mb-2"
                  :hide-details="true"
                />
                <VSwitch
                  v-model="permanentVolumeSlider"
                  color="primary"
                  label="Permanent Volume Slider"
                  class="mb-4"
                  :hide-details="true"
                />
                <VSlider
                  v-model="defaultRewind"
                  color="primary"
                  label="Default Rewind"
                  min="1"
                  max="60"
                  step="1"
                  class="mb-8"
                  thumb-label="always"
                  :hide-details="true"
                />
                <VSlider
                  v-model="defaultVolume"
                  color="primary"
                  label="Default Volume"
                  min="0"
                  max="1"
                  step="0.1"
                  class="mb-8"
                  thumb-label="always"
                  :hide-details="true"
                />

                <VSelect
                  v-model="mediaType"
                  :items="['audio', 'video']"
                  label="Media Type"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />

                <VSelect
                  v-model="btnRounded"
                  :items="['none', 'sm', 'md', 'lg', 'xl', 'pill', 'circle']"
                  label="Button Rounded"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />

                <VSelect
                  v-model="progressRounded"
                  :items="['none', 'sm', 'md', 'lg', 'xl']"
                  label="Progress Rounded"
                  class="mb-4"
                  variant="outlined"
                  density="comfortable"
                  :hide-details="true"
                />
              </VCard>
            </VCol>

            <VCol cols="12" md="6">
              <VCard class="pa-4">
                <VTextField
                  v-model="customFileName"
                  label="Custom File Name"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                  :hide-details="true"
                />

                <VDivider />

                <VTextField
                  v-model="playButtonColor"
                  label="Play Button Color"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />
                <VTextField
                  v-model="pauseButtonColor"
                  label="Pause Button Color"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />
                <VTextField
                  v-model="volumeButtonColor"
                  label="Volume Button Color"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />
                <VTextField
                  v-model="volumeOffButtonColor"
                  label="Volume Off Button Color"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />
                <VTextField
                  v-model="playbackRateButtonColor"
                  label="Playback Rate Button Color"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />
                <VTextField
                  v-model="settingsButtonColor"
                  label="Settings Button Color"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                />
                <VTextField
                  v-model="fullscreenButtonColor"
                  label="Fullscreen Button Color"
                  class="mb-2"
                  variant="outlined"
                  density="comfortable"
                  :hide-details="true"
                />
              </VCard>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <VCard class="pa-4 mt-4">
      <VCardTitle>Generated Code</VCardTitle>
      <VTextarea
        :model-value="generatedCode"
        readonly
        auto-grow
        variant="outlined"
      />
    </VCard>
  </div>
</template>