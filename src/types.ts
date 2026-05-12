type PlaylistItem = { src: string, name?: string, cover?: string }
type PlaylistItemInternal = {
  src: string,
  name: string,
  cover?: string,
  duration?: number,
  loaded?: boolean,
  type?: string
}

type ExtrasMenuItem = {
  name: string,
  btnColor: string,
  icon: string,
  submenu: ExtrasSubmenuItem[]
}
type ExtrasSubmenuItem = {
  title: string,
  value: any,
  icon?: string,
  active?: boolean
}

export type { PlaylistItem, PlaylistItemInternal, ExtrasMenuItem, ExtrasSubmenuItem }