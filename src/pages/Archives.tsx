import {
  Anchor,
  Box,
  Card,
  Center,
  Grid,
  Image,
  Loader,
  Space,
  Text,
  Title,
} from '@mantine/core'
import React, { useState } from 'react'

import useData from '@/hooks/useData'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

import { Archive, Sheet } from '@/api/types'

const ArchiveItem: React.FC<Archive> = archieve => {
  return <Grid.Col span={4}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Anchor href={archieve.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={`https://img.youtube.com/vi/${archieve.id}/mqdefault.jpg`}
            height={160}
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

const Archieves: React.FC = () => {
  const archieves = useData(Sheet.ARCHIVES)

  const [count, setCount] = useState(30)
  const sentinelRef = useIntersectionObserver(() => {
    setTimeout(() => {
      setCount(prev => Math.min(prev + 30, archieves.length))
    }, 500)
  })

  return <Box>
    <Center>
      <Title order={2}>二創</Title>
    </Center>
    <Grid justify="center" align="start" my="xl" gutter="xl">
      {archieves.slice(0, count).map(archieve => <ArchiveItem key={archieve.id} {...archieve} />)}
    </Grid>
    <Center h="240px" ref={sentinelRef}>
      <Loader size="xl" />
    </Center>
  </Box>
}

export default Archieves
