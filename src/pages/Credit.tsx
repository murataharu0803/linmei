import { Avatar, Box, Center, Flex, Modal, Text, Title } from '@mantine/core'
import React, { useContext } from 'react'

import useData from '@/hooks/useData'

import FansContext from '@/components/GlobalContext'

import { Credit as CreditType, Fan, Sheet } from '@/api/types'
import { useDisclosure } from '@mantine/hooks'

const types = {
  pm: '企劃管理',
  video: '影片剪輯',
  music: '音樂',
  website: '網頁開發',
  illustrator: '網站繪圖',
  gather: '素材蒐集/意見提供',
  offline: '線下聚會規劃',
  writer: '文手',
  participant: '企劃參與',
}

const CreditItem: React.FC<CreditType & Fan> = f => {
  const [opened, { open, close }] = useDisclosure(false)

  return f.message
    ? <Box key={f.id} flex="120px 0 0">
      <Center onClick={open} style={{ flexDirection: 'column', cursor: 'pointer' }} ta="center">
        <Avatar src={f.smallAvatarUrl} alt={f.name} radius="xl" size="xl" mb="md"/>
        <Title order={6} textWrap="balance">{f.name}</Title>
      </Center>
      <Modal
        withCloseButton={false}
        closeOnClickOutside
        opened={opened}
        onClose={close}
        centered
        zIndex={10001}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        radius="md"
        styles={{
          content: { flexBasis: '100%', weight: '60vw', height: '60lvh' },
        }}
      >
        <Flex direction="row" justify="center" align="center">
          <Avatar src={f.smallAvatarUrl} alt={f.name} radius="xl" size="xl" mr="md"/>
          <Title order={6} textWrap="balance">{f.type} - {f.name}</Title>
        </Flex>
        <Text mb="md" ta="center">{f.message}</Text>
      </Modal>
    </Box>
    : <Box key={f.id} flex="120px 0 0">
      <Center style={{ flexDirection: 'column' }} ta="center">
        <Avatar src={f.smallAvatarUrl} alt={f.name} radius="xl" size="xl" mb="md"/>
        <Title order={6} textWrap="balance">{f.name}</Title>
      </Center>
    </Box>
}

const Credit: React.FC = () => {
  const { getFan } = useContext(FansContext)
  const credits = useData(Sheet.CREDITS).map(c => ({ ...c, ...getFan(c.fanId) }))

  const section = (type: keyof typeof types) => {
    const fs = credits.filter(credit => credit.type === type)
    return <Box>
      <Center mb="xl"><Title order={2} ta="center">{types[type]}</Title></Center>
      <Flex justify="center" align="start" mb="sm" wrap="wrap" gap="xl">
        {fs.map(f => <CreditItem key={`${f.id}-${f.type}`} {...f} />)}
      </Flex>
    </Box>
  }

  return <Flex justify="center" align="center" direction="column" gap="6rem">
    <Flex>{section('pm')}</Flex>
    <Flex gap="6rem" wrap="wrap" justify="center">
      {section('video')}
      {section('music')}
    </Flex>
    <Flex gap="6rem" wrap="wrap" justify="center">
      {section('website')}
      {section('illustrator')}
      {section('writer')}
    </Flex>
    <Flex>{section('offline')}</Flex>
    <Flex>{section('gather')}</Flex>
    <Flex>{section('participant')}</Flex>
  </Flex>
}

export default Credit
