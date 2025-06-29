import { Avatar, Box, Center, Flex, Title } from '@mantine/core'
import React from 'react'

import useData from '@/hooks/useData'

import { Sheet } from '@/api/types'

const Fans: React.FC = () => {
  const fans = useData(Sheet.FANS)

  return <Box>
    <Center mb="xl">
      <Title order={2}>烏梅們</Title>
    </Center>
    <Flex justify="center" align="start" mb="md" gap="3rem" wrap="wrap">
      {fans.map(fan => (
        <Center key={fan.id} style={{ flexDirection: 'column' }} ta="center" w="100px">
          <Avatar src={fan.smallAvatarUrl} alt={fan.name} radius="xl" size="xl" mb="md"/>
          <Title order={6} ta="center" textWrap="balance">{fan.name}</Title>
        </Center>
      ))}
    </Flex>
  </Box>
}

export default Fans
