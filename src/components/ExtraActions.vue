<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

const media = defineModel('media')
const loop = defineModel('loop')

const props = defineProps({
  playbackRateButtonColor: { type: String, default () { return 'default' } },
  settingsButtonColor: { type: String, default () { return 'default' } },
  fullscreenButtonColor: { type: String, default () { return 'default' } },
  isVideo: { type: Boolean, default () { return false } },
  btnRounded: { type: String, default () { return 'sm' } },
})

const emits = defineEmits(['toggle-fullscreen'])

const playbackRate = ref(1)

const menu = ref(false)
const activator = ref()
const activeMenuGroup = ref(null)
const menuMoving = ref(false)
const menuItems = ref([])
const groups = [
  {
    name: 'PlaybackRate',
    btnColor: props.playbackRateButtonColor,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 19.364a9 9 0 1 1 12.728 0M16 9l-4 4" /></svg>',
    submenu: [
      { title: '0.5x', value: 0.5 },
      { title: '0.75x', value: 0.75 },
      { title: '1x', value: 1 },
      { title: '1.5x', value: 1.5 },
      { title: '2x', value: 2 },
    ],
  },
  {
    name: 'Settings',
    btnColor: props.settingsButtonColor,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" /></g></svg>',
    submenu: [
      { title: 'Loop', value: loop.value },
    ],
  },
]
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
function extraMenuAction(group: string, value: any) {
  if (group === 'PlaybackRate') {
    playbackRate.value = value
  }
  if (group === 'Settings') {
    loop.value = !loop.value
  }
}

watch(() => playbackRate.value, () => {
  media.value.playbackRate = playbackRate.value
})
</script>

<template>
  <VBtn
    v-for="group in groups"
    :key="group.name"
    :text="group.name"
    :color="group.btnColor"
    :rounded="btnRounded"
    size="32"
    class="ml-3"
    @focus="activate($event, group)"
    @mouseenter="activate($event, group)"
    @mouseleave="delayedClose()"
  >
    <VIcon>
      <span v-html="group.icon" />
    </VIcon>
  </VBtn>

  <VMenu
    v-model="menu"
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
      @mouseenter="onListEnter()"
      @mouseleave="delayedClose()"
    >
      <VListItem v-for="item in menuItems" @click="extraMenuAction(activeMenuGroup, item.value)">
        <template #append>
          <template v-if="activeMenuGroup === 'PlaybackRate'">
            <VIcon v-if="playbackRate === item.value">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l5 5L20 7" /></svg>
            </VIcon>
          </template>
          <template v-if="activeMenuGroup === 'Settings'">
            <VIcon v-if="loop">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l5 5L20 7" /></svg>
            </VIcon>
          </template>
        </template>

        <span>{{ item.title }}</span>
      </VListItem>
    </VList>
  </VMenu>
  <VBtn
    v-if="isVideo"
    :rounded="btnRounded"
    :color="fullscreenButtonColor"
    size="32"
    class="ml-3"
    @click="emits('toggle-fullscreen')"
  >
    <VIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2m-8 0H6a2 2 0 0 1-2-2v-2m0-8V6a2 2 0 0 1 2-2h2" /></svg>
    </VIcon>
  </VBtn>
</template>

<style lang="scss" scoped>
:deep(.menu-move-transition) {
  transition: 0.2s ease-out;
  transition-property: left, top;
}
</style>