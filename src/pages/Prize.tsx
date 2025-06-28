import { Box, Flex, Image, Input, Text } from '@mantine/core'
import React, { useState } from 'react'

import prizeImage from '@/assets/prize.webp'

const Prize: React.FC = () => {
  const [name, setName] = useState('')

  return <Box ta="center">
    <Flex justify="center" align="center" direction="column" mb="xl">
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="請輸入你的名字"
        mb="xl"
        w="50%"
      />
      <Box pos="relative">
        <Image src={prizeImage} alt="prize" w="auto" h="60vh" />
        <Box pos="absolute" left="75.5%" top="31%" w="5%" c="black" ta="center">
          <Text
            style={{
              lineBreak: 'anywhere',
              writingMode: 'vertical-lr',
              letterSpacing: '0.25ch',
            }}
          >
            {name}
          </Text>
        </Box>
      </Box>
    </Flex>
  </Box>
}

export default Prize
