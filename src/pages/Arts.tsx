import {
  Avatar,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Grid,
  Image,
  Modal,
  Text,
  Title,
} from '@mantine/core'
import React, { useContext, useRef } from 'react'
import FilePlayer from 'react-player/file'

import useData from '@/hooks/useData'

import { Art as ArtType, Sheet } from '@/api/types'
import FansContext from '@/components/GlobalContext'
import { useDisclosure } from '@mantine/hooks'

const ArtItem: React.FC<ArtType> = art => {
  const { getFan } = useContext(FansContext)
  const cameraMan = getFan(art.fanId)
  const [opened, { open, close }] = useDisclosure(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const [offsetX, setOffsetX] = React.useState<number | null>(null)
  const [offsetY, setOffsetY] = React.useState<number | null>(null)

  const onLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const containerBox = imageContainerRef.current?.getBoundingClientRect()
    const imageBox = event.currentTarget.getBoundingClientRect()
    if (containerBox && imageBox) {
      const containerWidth = containerBox.width
      const containerHeight = containerBox.height
      const imageWidth = imageBox.width
      const imageHeight = imageBox.height

      // Calculate the offset to center the image in the container
      const xOffset = (containerWidth - imageWidth) / 2
      const yOffset = (containerHeight - imageHeight) / 2
      setOffsetX(xOffset)
      setOffsetY(yOffset)
    }
  }

  return <Grid.Col span={{ base: 12, xs: 6, sm: 4 }} h={240}>
    <BackgroundImage
      src={art.thumbnailUrl}
      onClick={open}
      className="photo-thumbnail"
      h="100%"
      radius="md"
    >
      <Flex className='camera-man' justify="start" align="center" mb="xs">
        <Avatar
          src={cameraMan.smallAvatarUrl}
          alt={cameraMan.name}
          radius="xl"
          size="sm"
          m="sm"
        />
        <Center>
          <Title order={6} ta="center" textWrap="balance">{cameraMan.name}</Title>
        </Center>
      </Flex>
    </BackgroundImage>
    <Modal
      withCloseButton={false}
      closeOnClickOutside
      opened={opened}
      onClose={close}
      centered
      zIndex={10001}
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      styles={{
        content: {
          flexBasis: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        body: { height: '100%', padding: 0 },
      }}
    >
      <Center
        ref={imageContainerRef}
        pos="relative"
        style={{ zIndex: 10010 }}
        mah="100%"
        maw="100%"
        w="auto"
        h="100%"
      >
        <Box pos="absolute" inset="0" onClick={close}/>
        {art.mediaUrl.endsWith('.mp4')
          ? <FilePlayer
            width="auto"
            height="100%"
            onLoad={onLoad}
            url={art.mediaUrl}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
          : <Image
            onLoad={onLoad}
            mah="100%"
            maw="100%"
            w="auto"
            h="auto"
            radius="lg"
            src={art.mediaUrl}
          />
        }
        <Box
          pos="absolute"
          bottom={offsetY || 0}
          left={offsetX || 0}
          opacity={offsetY !== null && offsetX !== null ? 1 : 0}
          p="lg"
        >
          <Text>{art.description}</Text>
        </Box>
      </Center>
    </Modal>
  </Grid.Col>
}

const Arts: React.FC = () => {
  const arts = useData(Sheet.ARTS)

  return <Box>
    <Center>
      <Title order={2}>二創</Title>
    </Center>
    <Grid justify="center" align="start" my="xl" gutter="xl">
      {arts.map(art => <ArtItem key={art.mediaUrl} {...art} />)}
    </Grid>
  </Box>
}

export default Arts
