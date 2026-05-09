import { PlaylistItem, PlaylistItemInternal } from "@playerify/types";
import { reactify } from '@vueuse/core'
import { Ref, ref } from "vue";
import YAML from 'yaml'

const getFileNameFromSrc = (src: string): string|undefined => {
  return src.split('/').at(-1)
}

const formatDuration = (seconds: number|null): string => {
  if (seconds === null) {
    return '--:--'
  }
  return new Date(1000 * seconds).toISOString().slice(14, 19)
}

const isFloat = (n: number|string) => {
  return typeof n === 'number' && !Number.isNaN(n) && !Number.isInteger(n)
}

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

const processPlaylist = (playlist: string[]|PlaylistItem[]): Array<PlaylistItemInternal> => {
  const playList: Ref<Array<PlaylistItemInternal>> = ref(playlist.map((item: string|PlaylistItem): PlaylistItemInternal => {
    return typeof item === 'string'
      ? { src: item, name: getFileNameFromSrc(item) || '' }
      : { ...item }
  }))
  for (const item of playList.value) {
    if (!item.src) {
      continue
    }
    getDuration(item.src).then((result: { duration: number, type: string }) => {
      item.duration = result.duration
      item.type = result.type

      item.loaded = true
    })
  }

  return playList.value
}

async function getDuration(url: string): Promise<{ duration: number, type: string }> {
  return new Promise((resolve) => {
    const video = document.createElement('video')

    video.preload = 'metadata'
    video.src = url

    video.onloadeddata = () => {
      const isVideo = video.videoWidth > 0 && video.videoHeight > 0
      resolve({ duration: video.duration, type: isVideo ? 'video' : 'audio' })
    }
    video.onerror = (err) => console.log('getDuration err', err)
  })
}

export {
  getFileNameFromSrc,
  formatDuration,
  isFloat,
  stringify,
  processPlaylist
}