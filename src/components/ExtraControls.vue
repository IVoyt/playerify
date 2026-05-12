<script setup lang="ts">
import { computed, ComputedRef, defineProps, ref, watch } from 'vue'
import { ExtrasMenuItem, ExtrasSubmenuItem } from '@playerify/types'

const media = defineModel('media')
const loop = defineModel('loop')
const isPictureInPicture = defineModel('isPictureInPicture')
const openPlaylist = defineModel('openPlaylist')

const props = defineProps({
  disabled: { type: Boolean, default () { return false } },
  hidePlaylistButton: { type: Boolean, default () { return false } },
  hidePlaybackRateButton: { type: Boolean, default () { return false } },
  hideExtrasButton: { type: Boolean, default () { return false } },
  hideFullscreenButton: { type: Boolean, default () { return false } },
  supportsPictureInPicture: { type: Boolean, default () { return false } },
  playlistButtonColor: { type: String, default () { return 'default' } },
  playbackRateButtonColor: { type: String, default () { return 'default' } },
  extrasButtonColor: { type: String, default () { return 'default' } },
  fullscreenButtonColor: { type: String, default () { return 'default' } },
  isVideo: { type: Boolean, default () { return false } },
  btnRounded: { type: String, default () { return 'sm' } },
})

const emits = defineEmits(['toggle-fullscreen', 'toggle-picture-in-picture'])

const playbackRate = ref(1)

const menu = ref(true)
const activator = ref()
const activeMenuGroup = ref(null)
const menuMoving = ref(false)
const menuItems = ref([])

const groups: ComputedRef<Array<ExtrasMenuItem>> = computed(() => (() => {
  const _groups = []
  if (!props.hidePlaybackRateButton) {
    _groups.push(
      {
        name: 'PlaybackRate',
        btnColor: props.playbackRateButtonColor,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-6 -7 36 36"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 19.364a9 9 0 1 1 12.728 0M16 9l-4 4" /></svg>',
        submenu: [
          { title: '0.5x', value: 0.5 },
          { title: '0.75x', value: 0.75 },
          { title: '1x', value: 1 },
          { title: '1.5x', value: 1.5 },
          { title: '2x', value: 2 },
        ],
      }
    )
  }

  if (!props.hideExtrasButton) {
    _groups.push(
      {
        name: 'Extras',
        btnColor: props.extrasButtonColor,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-6 -7 36 36"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" /></g></svg>',
        submenu: (() => {
          const loopItem = {
            title: 'Loop',
            value: loop.value,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12V9a3 3 0 0 1 3-3h13m-3-3l3 3l-3 3m3 3v3a3 3 0 0 1-3 3H4m3 3l-3-3l3-3"/></svg>',
            active: false
          }

          const pipItem = {
            title: 'Picture in Picture',
            value: isPictureInPicture.value,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M14 15a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z"/></g></svg>',
            active: isPictureInPicture.value
          }
          const subMenu = [loopItem]

          if (props.isVideo && props.supportsPictureInPicture) {
            subMenu.push(pipItem)
          }

          return subMenu
        })()
      }
    )
  }
  return _groups
})())
let closeTimeout = -1
let movingTimeout = -1
function activate ({ currentTarget }, group) {
  clearTimeout(closeTimeout)

  clearTimeout(movingTimeout)
  if (menu.value) {
    menuMoving.value = true
    movingTimeout = window.setTimeout(() => menuMoving.value = false, 300)
  }

  activator.value = currentTarget
  menuItems.value = group.submenu
  activeMenuGroup.value = group.name
  menu.value = true
}
function onListEnter () {
  clearTimeout(closeTimeout)
}
function delayedClose () {
  clearTimeout(closeTimeout)
  closeTimeout = window.setTimeout(() => {
    menu.value = false
    activeMenuGroup.value = null
  }, 600)
}
function extraMenuAction(group: string, item: ExtrasSubmenuItem) {
  if (group === 'PlaybackRate') {
    playbackRate.value = item.value
  }
  if (group === 'Extras') {
    if (item.title === 'Loop') {
      loop.value = !loop.value
    }
    if (item.title === 'Picture in Picture') {
      emits('toggle-picture-in-picture')
      isPictureInPicture.value = !isPictureInPicture.value
    }
    item.active = !item.active
  }
}

const isItemActive = (item: ExtrasSubmenuItem) => {
  return item?.active || (activeMenuGroup.value === 'PlaybackRate' && playbackRate.value === item.value)
}

watch(() => playbackRate.value, () => {
  media.value.playbackRate = playbackRate.value
})
</script>

<template>
  <VBtnGroup variant="elevated" elevation="2" density="compact" :rounded="btnRounded" :disabled="disabled">
    <VBtn
      v-if="!hidePlaylistButton"
      size="36"
      @click="openPlaylist = !openPlaylist"
    >
      <VIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17a3 3 0 1 0 6 0a3 3 0 1 0-6 0m6 0V4h4m-8 1H3m0 4h10m-4 4H3" /></svg>
      </VIcon>
    </VBtn>
    <VBtn
      v-for="group in groups"
      :key="group.name"
      :text="group.name"
      :color="group.btnColor"
      size="36"
      @focus="activate($event, group)"
      @mouseenter="activate($event, group)"
      @mouseleave="delayedClose()"
    >
      <VIcon>
        <span v-html="group.icon" />
      </VIcon>
    </VBtn>
    <VBtn
      v-if="isVideo && !hideFullscreenButton"
      :color="fullscreenButtonColor"
      size="36"
      @click="emits('toggle-fullscreen')"
    >
      <VIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="2 2 20 20"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2m-8 0H6a2 2 0 0 1-2-2v-2m0-8V6a2 2 0 0 1 2-2h2" /></svg>
      </VIcon>
    </VBtn>
  </VBtnGroup>

  <VMenu
    v-model="menu"
    persistent
    :activator="activator"
    :close-on-content-click="false"
    :content-class="{ 'menu-move-transition': menuMoving }"
    location="bottom end"
    offset="4"
    viewport-margin="0"
  >
    <VList
      class="py-1"
      density="compact"
      rounded="lg"
      border
      :lines="false"
      @mouseenter="onListEnter()"
      @mouseleave="delayedClose()"
    >
      <VListItem v-for="item in menuItems" :active="isItemActive(item)" color="primary" @click="extraMenuAction(activeMenuGroup, item)">
        <template #prepend>
          <template v-if="item?.icon">
            <VIcon>
              <span v-html="item.icon" />
            </VIcon>
          </template>
        </template>

        <span>{{ item.title }}</span>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style lang="scss" scoped>
:deep(.menu-move-transition) {
  transition: 0.2s ease-out;
  transition-property: left, top;
}
</style>