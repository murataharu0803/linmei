import React from 'react'

import NavTabs from '@/components/NavTabs'
import { BackgroundImage, Container, Overlay } from '@mantine/core'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return <BackgroundImage
    src="https://picsum.photos/1920/1080"
    pos="relative"
  >
    <NavTabs />
    <Overlay
      color="#000"
      backgroundOpacity={0.5}
      pos="relative"
      mih="calc(100vh - 76px)"
      py="xl"
    >
      <Container>
        <Outlet />
      </Container>
    </Overlay>
  </BackgroundImage>
}

export default Layout
