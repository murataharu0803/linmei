import { Box, Center, Image, Text, TextInput } from '@mantine/core'
import React, { useState } from 'react'

import prizeImage from '@/assets/prize.webp'
import prizeLinmeiImage from '@/assets/prize_linmei.webp'

const Prize: React.FC = () => {
  const [name, setName] = useState('')

  const scrollRef = React.useRef<HTMLDivElement>(null)

  const isLinmei = name === '林梅'

  const scrollToEnd = () => {
    if (scrollRef.current)
      scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth })
  }

  return <Center ta="center" style={{ flexDirection: 'column' }}>
    <TextInput
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="請輸入你的名字"
      mb="xl"
      w="32ch"
      maw="100%"
    />
    <Box
      pos="relative"
      w="100vw"
      maw="99.4lvh"
      h="70lvh"
      style={{ overflowX: 'auto' }}
      ref={scrollRef}
    >
      <Box pos="absolute">
        <Image
          src={prizeImage}
          alt="prize"
          w="auto"
          h="70lvh"
          onLoad={scrollToEnd}
        />
        <Image
          pos="absolute"
          top={0}
          src={prizeLinmeiImage}
          alt="prize_linmei"
          w="auto"
          h="70lvh"
          opacity={isLinmei ? 1 : 0}
          style={{ transition: 'opacity 0.3s ease-in-out' }}
        />
        <Box pos="absolute" left="75.4%" top="35%" w="5%" c="black" ta="center">
          {isLinmei || <Text
            style={{
              fontSize: '2.5lvh',
              lineBreak: 'anywhere',
              writingMode: 'vertical-lr',
            }}
          >
            {name}
          </Text>}
        </Box>
      </Box>
    </Box>
  </Center>
}

export default Prize
