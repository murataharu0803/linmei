export interface Video {
  coverImageUrl: string
  embedUrl: string
  videoUrl?: string
  title: string
  description: string
  lyrics: string
  credit: string
  type: string
}

export interface Wish {
  fanId: string
  message: string
}

export interface Fan {
  id: string
  name: string
  avatarUrl?: string
  smallAvatarUrl?: string
}

export interface Art {
  fanId: string
  creatorName?: string
  creatorLink?: string
  thumbnailUrl: string
  mediaUrl: string
  mediaLink?: string
  description: string
}

export interface Photo {
  event: string
  location: string
  time: string // Date
  photoUrl: string
  thumbnailUrl: string
  description: string
  cameraManId: string
}

export interface Archive {
  title: string
  id: string
  publishedAt: string // Date
  schedultesAt: string // Date
  startAt: string // Date
  endAt: string // Date
  D: number // Day
  H: number // Hour
  M: number // Minute
  S: number // Second
  link: string
  duration: number // in seconds
  host: string
  isMembership: boolean
  type: 'vod' | 'shorts' | 'video'
  topic: 'debut' | 'game' | 'chatting' | 'superchat' | 'karaoke' |
    'drawing' | 'music' | 'other' | 'meme' | 'watchalong' |
    'clip' | 'cooking' | 'announcement' | 'outfit'
  subTopic: string
  otherMembers: string[]
  customTags: string[]
}

export interface Signature {
  signatureUrl: string
  fanId: string
}

export interface Credit {
  type: string
  fanId: string
  message: string
}

export enum Sheet {
  WISHES = 'WISHES',
  FANS = 'FANS',
  ARTS = 'ARTS',
  PHOTOS = 'PHOTOS',
  ARCHIVES = 'ARCHIVES',
  SIGNATURES = 'SIGNATURES',
  VIDEOS = 'VIDEOS',
  CREDITS = 'CREDITS',
}

export interface DataTypeMap {
  [Sheet.WISHES]: Wish
  [Sheet.FANS]: Fan
  [Sheet.ARTS]: Art
  [Sheet.PHOTOS]: Photo
  [Sheet.ARCHIVES]: Archive
  [Sheet.SIGNATURES]: Signature
  [Sheet.VIDEOS]: Video
  [Sheet.CREDITS]: Credit
}
