<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import type { PlaylistItemInternal } from '@playerify/types'
import { formatDuration } from '@playerify/utils'

const currentMedia = defineModel<PlaylistItemInternal>('media')
const openPlaylist = defineModel('openPlaylist')
const playlistGroup = ref(['Playlist'])

defineProps({
  playlist: { type: Array<PlaylistItemInternal>, default () { return [] } },
  playlistVariant: { type: String, default () { return 'elevated' } },
})

watch(() => openPlaylist.value, () => {
  openPlaylist.value
    ? playlistGroup.value = ['Playlist']
    : playlistGroup.value = []
})
</script>

<template>
  <audio ref="media" hidden="hidden" />
  <VSlideXTransition>
    <VCard :variant="playlistVariant">
      <VList v-model:opened="playlistGroup" :lines="false" density="compact" nav>
        <VListItem>Playlist</VListItem>
        <VListGroup value="Playlist" :fluid="true">
          <VDivider />
          <VListItem
            v-for="(item, i) in playlist"
            :key="i"
            :value="item"
            color="primary"
            :active="item.src === currentMedia?.src"
            @click="currentMedia = item"
          >
            <template #prepend>
              <VIcon v-if="item.type === 'audio'">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0-6 0m10 0a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/><path d="M9 17V4h10v13M9 8h10"/></g></svg>
              </VIcon>

              <VIcon v-else-if="item.type === 'video'">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4-2v16m8-16v16M4 8h4m-4 8h4m-4-4h16m-4-4h4m-4 8h4"/></svg>
              </VIcon>

              <VIcon v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2m-5-4v.01"/><path d="M12 14a1.5 1.5 0 1 0-1.14-2.474"/></g></svg>
              </VIcon>
            </template>

            <VListItemTitle>{{ item.name }}</VListItemTitle>

            <template #append>
              <VProgressCircular v-if="!item.loaded" size="24" width="1" indeterminate />
              <span v-else>
                {{ formatDuration(item?.duration || 0) }}
              </span>
            </template>
          </VListItem>
        </VListGroup>
      </VList>
    </VCard>
  </VSlideXTransition>
</template>

<style lang="scss" scoped>

</style>