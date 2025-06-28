import { BackgroundImage, Container, Flex, Overlay } from '@mantine/core'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import NavTabs from '@/components/NavTabs'

import mainImage from '@/assets/main2.webp'

const Layout: React.FC = () => {
  const path = useLocation().pathname

  return <BackgroundImage src={mainImage}>
    <Flex
      pos="relative"
      direction="column"
      h="100vh"
      style={{ overflow: 'hidden' }}
      flex={0}
    >
      <NavTabs />
      <Overlay
        color="#000"
        backgroundOpacity={path === '/' ? 0 : 0.5}
        pos="relative"
        py="xl"
        style={{ overflow: 'auto' }}
        flex={1}
      >
        <Container>
          <Outlet />
        </Container>
      </Overlay>
    </Flex>
  </BackgroundImage>
}

export default Layout
