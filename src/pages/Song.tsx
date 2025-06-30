import { AspectRatio, Box, Center, Image, Title } from '@mantine/core'
import React from 'react'

import useData from '@/hooks/useData'

import { Sheet } from '@/api/types'
import YoutubePlayer from 'react-player/youtube'

const Song: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(false)
  const videos = useData(Sheet.VIDEOS)
  const music = videos.filter(v => v.type === 'music')[0]
  const title = music?.title || ''
  const description = music?.description || ''
  const lyrics = music?.lyrics || ''
  const credit = music?.credit || ''

  return <Box ta="center">
    <Center>
      <Title order={2}>{title}</Title>
    </Center>
    {music && <AspectRatio my="xl" ratio={16 / 9}>
      <Box
        pos="relative"
        w="100%"
        h="100%"
        style={{ borderRadius: '16px', overflow: 'hidden' }}
      >
        <YoutubePlayer
          url={music.embedUrl}
          controls={false}
          color="transparent"
          width="100%"
          height="100%"
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
          src={music.coverImageUrl}
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
    </AspectRatio>}
    {lyrics && <>
      <Title order={3} mt="xl">歌詞</Title>
      <Box
        component='pre'
        dangerouslySetInnerHTML={{ __html: lyrics }}
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      />
    </>}
    {description && <>
      <Box
        component='pre'
        dangerouslySetInnerHTML={{ __html: description }}
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      />
    </>}
    {credit && <>
      <Title order={3} mt="xl">Credits</Title>
      <Box
        component='pre'
        dangerouslySetInnerHTML={{ __html: credit }}
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      />
    </>}
  </Box>
}

export default Song
