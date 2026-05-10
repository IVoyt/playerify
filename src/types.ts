type PlaylistItem = { src: string, name?: string, cover?: string }
type PlaylistItemInternal = {
  src: string,
  name: string,
  cover?: string,
  duration?: number,
  loaded?: boolean,
  type?: string
}

export type { PlaylistItem, PlaylistItemInternal }