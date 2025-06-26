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
  creatorName: string
  creatorLink: string
  mediaUrl: string
  mediaLink: string
  comissioner: string
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

export interface Credit {
  type: string
  fanId: string
}

export enum Sheet {
  WISHES = 'WISHES',
  FANS = 'FANS',
  ARTS = 'ARTS',
  PHOTOS = 'PHOTOS',
  VIDEOS = 'VIDEOS',
  CREDITS = 'CREDITS',
}

export interface DataTypeMap {
  [Sheet.WISHES]: Wish
  [Sheet.FANS]: Fan
  [Sheet.ARTS]: Art
  [Sheet.PHOTOS]: Photo
  [Sheet.VIDEOS]: Video
  [Sheet.CREDITS]: Credit
}
