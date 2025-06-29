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
import { useDisclosure } from '@mantine/hooks'
import React, { useContext, useRef } from 'react'

import FansContext from '@/components/GlobalContext'
import useData from '@/hooks/useData'

import { Photo, Sheet } from '@/api/types'

const MeetPhoto: React.FC<Photo> = ({ photoUrl, thumbnailUrl, cameraManId, description }) => {
  const { getFan } = useContext(FansContext)
  const cameraMan = getFan(cameraManId)
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
      src={thumbnailUrl}
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
        content: { flexBasis: '100%', height: '100%', backgroundColor: 'transparent' },
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
        <Image
          onLoad={onLoad}
          mah="100%"
          maw="100%"
          w="auto"
          h="auto"
          radius="lg"
          src={photoUrl}
        />
        <Box
          pos="absolute"
          bottom={offsetY || 0}
          left={offsetX || 0}
          opacity={offsetY !== null && offsetX !== null ? 1 : 0}
          p="lg"
        >
          <Text>{description}</Text>
        </Box>
      </Center>
    </Modal>
  </Grid.Col>
}

const Meet: React.FC = () => {
  const photos = useData(Sheet.PHOTOS)

  return <Box>
    <Center>
      <Title order={2}>烏梅線下聚會</Title>
    </Center>
    <Grid justify="center" align="start" my="xl" gutter="xl">
      {photos.map(photo => <MeetPhoto key={photo.photoUrl} {...photo} />)}
    </Grid>
  </Box>
}

export default Meet
