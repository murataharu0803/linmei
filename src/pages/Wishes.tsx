import { Avatar, Box, Center, Divider, Flex, Title } from '@mantine/core'
import React, { useContext } from 'react'

import FansContext from '@/components/GlobalContext'
import useData from '@/hooks/useData'

import { Sheet } from '@/api/types'

const Wishes: React.FC = () => {
  const wishes = useData(Sheet.WISHES)
  const { getFan } = useContext(FansContext)

  const parseEmoji = (content: string) => content.replace(
    /:([0-9]{19}):/g,
    '<span class="emoji-container"><img class="emoji"\
src="https://storage.googleapis.com/linmei-15030.firebasestorage.app/assets/emojis/$1.webp"\
></span>',
  )

  return <Box>
    <Center>
      <Title order={2}>畢業祝福</Title>
    </Center>
    {wishes.map((wish, index) => {
      const fan = getFan(wish.fanId)
      return <>
        {!!index && <Divider my="3rem" />}
        <Box key={index} my="xl">
          <Flex justify="start" align="center" mb="xs">
            <Avatar src={fan.smallAvatarUrl} alt={fan.id} radius="xl" size="lg" mr="md"/>
            <Title order={3}>{fan.name}</Title>
          </Flex>
          <Box
            component='pre'
            dangerouslySetInnerHTML={{ __html: parseEmoji(wish.message) }}
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          />
        </Box>
      </>
    })}
  </Box>
}

export default Wishes
