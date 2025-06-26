import { AspectRatio, Box, Center, Image, Title } from '@mantine/core'
import React from 'react'

import useData from '@/hooks/useData'

import { Sheet } from '@/api/types'
import ReactPlayer from 'react-player'

const Video: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(false)
  const videos = useData(Sheet.VIDEOS).filter(v => v.type === 'video')

  return <Box ta="center">
    {videos.map(v => <>
      <Center>
        <Title order={2}>{v.title}</Title>
      </Center>
      <AspectRatio my="xl" ratio={16 / 9}>
        <Box
          pos="relative"
          w="100%"
          h="100%"
          style={{ borderRadius: '16px', overflow: 'hidden' }}
        >
          <ReactPlayer
            url={v.embedUrl}
            controls={false}
            color="transparent"
            width="100%"
            height="100%"
            style={{
              opacity: showVideo ? 1 : 0,
              transition: 'opacity 0.2s ease-in-out',
            }}
            config={{ youtube: {
              playerVars: { enablejsapi: 1 },
            } }}
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
    </>)}
  </Box>
}

export default Video
