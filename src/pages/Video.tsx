import { AspectRatio, Box, Center, Divider, Image, Title } from '@mantine/core'
import React from 'react'

import useData from '@/hooks/useData'

import { Sheet, Video as VideoType } from '@/api/types'
import YoutubePlayer from 'react-player/youtube'

const VideoItem: React.FC<VideoType> = v => {
  const [showVideo, setShowVideo] = React.useState(false)

  return <>
    <Center my="xl">
      <Title order={2}>{v.title}</Title>
    </Center>
    <AspectRatio my="xl" ratio={16 / 9}>
      <Box
        pos="relative"
        w="100%"
        h="100%"
        style={{ borderRadius: '16px', overflow: 'hidden' }}
      >
        <YoutubePlayer
          url={v.embedUrl}
          controls={false}
          color="transparent"
          width="100%"
          height="100%"
          volume={0.5}
          style={{
            opacity: showVideo ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
          }}
          config={{
            playerVars: { enablejsapi: 1, volume: 0 },
          }}
        />
        <Image
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          src={v.coverImageUrl}
          alt="Song Cover"
          sizes="cover"
          onClick={() => setShowVideo(true)}
          style={{
            cursor: 'pointer',
            opacity: showVideo ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: showVideo ? 'none' : 'auto',
          }}
        />
      </Box>
    </AspectRatio>
    {v.description && <>
      <Box
        component='pre'
        dangerouslySetInnerHTML={{ __html: v.description }}
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      />
    </>}
    {v.credit && <>
      <Title order={3} mt="xl">Credits</Title>
      <Box
        component='pre'
        dangerouslySetInnerHTML={{ __html: v.credit }}
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      />
    </>}
  </>
}


const Video: React.FC = () => {
  const videos = useData(Sheet.VIDEOS).filter(v => v.type === 'video')

  return <Box ta="center">
    {videos.map((v, i) => <>
      {!!i && <Divider my="4rem" />}
      <VideoItem key={v.embedUrl} {...v} />
    </>)}
  </Box>
}

export default Video
