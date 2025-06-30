import { Avatar, Box, Center, Flex, Title } from '@mantine/core'
import React, { useContext } from 'react'

import useData from '@/hooks/useData'

import FansContext from '@/components/GlobalContext'

import { Credit as CreditType, Fan, Sheet } from '@/api/types'
import useLongPress from '@/hooks/useLongPress'
import { useNavigate } from 'react-router-dom'

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
  const isHow = f.type === 'illustrator' && f.fanId === 'yuanhow'
  const isHarlosError = f.type === 'pm' && f.fanId === 'harlos_0517'
  const isHarlos404 = f.type === 'website' && f.fanId === 'harlos_0517'
  const { triggerEasterEgg } = useContext(FansContext)
  const navigate = useNavigate()

  const [easterError, setEasterError] = React.useState(false)
  if (easterError) throw new Error('哈洛斯因為連續 48 小時沒睡所以壞掉了！重新整理來復活他！')

  const { ref, isActive } = useLongPress(() => {
    if (isHow) triggerEasterEgg?.()
    if (isHarlosError) setEasterError(true)
    if (isHarlos404) navigate('/wherethefuckami')
  }, { threshold: 5000 })

  const classNames = isHow || isHarlosError || isHarlos404
    ? isActive ? 'easter-egg-avatar active' : 'easter-egg-avatar'
    : ''

  return <Box flex="120px 0 0">
    <Center style={{ flexDirection: 'column' }} ta="center">
      <Avatar
        className={classNames}
        ref={ref}
        src={f.smallAvatarUrl}
        alt={f.name}
        radius="xl"
        size="xl"
        mb="md"
      />
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
