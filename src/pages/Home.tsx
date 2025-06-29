import { Center, Space, Title } from '@mantine/core'
import React from 'react'

const Home: React.FC = () => {
  return <Center h="75lvh" w="100%" style={{ flexDirection: 'column' }}>
    <Space flex={1} />
    <Title order={2}>林梅畢業快樂！</Title>
  </Center>
}

export default Home
