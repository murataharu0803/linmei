import { Center, Text } from '@mantine/core'
import React, { useEffect } from 'react'

const Fanfic: React.FC = () => {
  useEffect(() => {
    window.open(
      'https://vocus.cc/article/685cc7d2fd89780001d7037f',
      '_blank',
      'noopener,noreferrer',
    )
  }, [])

  return <Center h="60vh"><Text>開啟新分頁中...</Text></Center>
}

export default Fanfic
