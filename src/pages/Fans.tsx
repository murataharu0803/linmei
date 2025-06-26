import { Avatar, Box, Center, Grid, Title } from '@mantine/core'
import React from 'react'

import useData from '@/hooks/useData'

import { Sheet } from '@/api/types'

const Fans: React.FC = () => {
  const fans = useData(Sheet.FANS)

  return <Box>
    <Center mb="xl">
      <Title order={2}>烏梅們</Title>
    </Center>
    <Grid justify="center" align="start" mb="md" gutter="xl">
      {fans.map(fan => (
        <Grid.Col span={1.5} key={fan.id}>
          <Avatar src={fan.smallAvatarUrl} alt={fan.name} radius="xl" size="xl" mb="md"/>
          <Center><Title order={6} ta="center" textWrap="balance">{fan.name}</Title></Center>
        </Grid.Col>
      ))}
    </Grid>
  </Box>
}

export default Fans
