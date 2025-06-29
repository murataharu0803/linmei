import {
  Anchor,
  Box,
  Button,
  Card,
  Center,
  Collapse,
  Grid,
  Image,
  Loader,
  Space,
  Text,
  Title,
} from '@mantine/core'
import React, { useCallback, useEffect, useState } from 'react'

import useData from '@/hooks/useData'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

import { Archive, Sheet, topics } from '@/api/types'
import Filter from '@/components/Filter'
import { useDisclosure } from '@mantine/hooks'

const ArchiveItem: React.FC<Archive> = archieve => {
  return <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Anchor href={archieve.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={`https://img.youtube.com/vi/${archieve.id}/mqdefault.jpg`}
            height={180}
            alt={archieve.title}
          />
        </Anchor>
      </Card.Section>
      <Space h="xs" />
      <Text lineClamp={2}>
        {archieve.title}
      </Text>
    </Card>
  </Grid.Col>
}

const ArchiveItemMemo = React.memo(ArchiveItem)

const Archieves: React.FC = () => {
  const archieves = useData(Sheet.ARCHIVES)
  const subTopics = Object.keys(topics).map(key => {
    const videos = archieves.filter(a => a.topic === key)
    return [
      ...new Set(videos.map(a => `${topics[a.topic]}${a.subTopic ? `/${a.subTopic}` : ''}`)),
    ].sort()
  }).flat()

  const members = [...new Set(archieves.flatMap(a => a.otherMembers))].filter(Boolean)
  const customTags = [...new Set(archieves.flatMap(a => a.customTags))].filter(Boolean)

  const [filteredVideos, setFilteredVideos] = useState<Archive[]>(archieves)
  const [hasMore, setHasMore] = useState(true)
  const [isFiltering, setIsFiltering] = useState(false)
  const [opened, { toggle }] = useDisclosure(false)

  const handleSetFilteredVideos = useCallback((videos: Archive[]) => {
    setIsFiltering(true)
    setTimeout(() => {
      setFilteredVideos(videos)
      setCount(30) // Set count after filtering
      setIsFiltering(false)
    }, 500)
  }, [])

  const [count, setCount] = useState(30)

  const handleIntersection = useCallback(() => {
    setTimeout(() => {
      setCount(prev => Math.min(prev + 30, filteredVideos.length))
    }, 500)
  }, [filteredVideos.length])

  const sentinelRef = useIntersectionObserver(handleIntersection)

  useEffect(() => {
    setFilteredVideos(archieves)
    setCount(30)
  }, [archieves])

  useEffect(() => {
    if (filteredVideos.length <= count) setHasMore(false)
    else setHasMore(true)
  }, [filteredVideos, count])

  return <Box pos="relative">
    <Center>
      <Title order={2}>直播紀錄</Title>
      <Button pos="absolute" left={0} onClick={toggle}>篩選器</Button>
    </Center>
    <Collapse in={opened}>
      <Filter
        subTopics={subTopics}
        members={members}
        customTags={customTags}
        allVideos={archieves}
        setFilteredVideos={handleSetFilteredVideos}
      />
    </Collapse>
    <Grid justify="start" align="start" my="xl" gutter="xl">
      {!isFiltering && filteredVideos.slice(0, count).map(archieve =>
        <ArchiveItemMemo key={archieve.id} {...archieve} />,
      )}
    </Grid>
    <Center h="240px" ref={sentinelRef}>
      {hasMore && <Loader size="xl" />}
    </Center>
  </Box>
}

export default Archieves
