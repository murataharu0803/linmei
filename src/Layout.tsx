import {
  Affix,
  AppShell,
  BackgroundImage,
  Box,
  Container,
  LoadingOverlay,
  Overlay,
} from '@mantine/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Drawer from '@/components/Drawer'
import NavTabs from '@/components/NavTabs'

import { getData } from '@/api'
import { Fan, Sheet } from '@/api/types'
import mainImage from '@/assets/main.webp'
import main2Image from '@/assets/main2.webp'
import main3Image from '@/assets/main3.webp'
import GlobalContext from '@/components/GlobalContext'
import { useDisclosure } from '@mantine/hooks'

const Layout: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure()

  const path = useLocation().pathname

  const loadingRequests = useRef(0)
  const [showLoading, setShowLoading] = useState(false)

  const triggerLoad = useCallback(() => {
    if (loadingRequests.current === 0)
      setShowLoading(true)
    loadingRequests.current ++
  }, [])

  const triggerLoadFinish = useCallback(() => {
    if (loadingRequests.current > 1) loadingRequests.current --
    else {
      loadingRequests.current = 0
      setShowLoading(false)
    }
  }, [])

  const [fans, setFans] = useState<Fan[]>([])
  const [mainLoading, setMainLoading] = useState(true)
  const [image, setImage] = useState(main3Image)

  const triggerEasterEgg = useCallback(() => {
    setImage(prevImage => {
      if (prevImage === mainImage) return main2Image
      else if (prevImage === main2Image) return main3Image
      else return mainImage
    })
  }, [])

  const getFan = useCallback((fanId: string) =>
    fans.find(fan => fan.id === fanId)
      || { id: fanId, name: fanId, avatar: '', smallAvatarUrl: '' } as Fan,
  [fans])

  useEffect(() => {
    setMainLoading(true)
    getData(Sheet.FANS).then(responseData => {
      if (!responseData) {
        console.error('No data found for table: FANS')
        return
      } else if (!Array.isArray(responseData)) {
        console.error('Data for table FANS is not an array')
        return
      } else setFans(responseData)
      setMainLoading(false)
    })
  }, [])

  return <Box
    pos="relative"
    h="100lvh"
    style={{ overflow: 'hidden' }}
    flex={0}
  >
    <Affix
      position={{ top: 0, right: 0, bottom: 0, left: 0 }}
      zIndex={-1}
      style={{ pointerEvents: mainLoading ? 'auto' : 'none' }}
    >
      <BackgroundImage
        w="100%"
        h="100lvh"
        src={image}
        inset={0}
        style={{ backgroundPosition: '46%' }}
      />
    </Affix>
    <Affix
      position={{ top: 0, right: 0, bottom: 0, left: 0 }}
      zIndex={12000}
      style={{ pointerEvents: mainLoading ? 'auto' : 'none' }}
    >
      <Overlay
        py="xl"
        opacity={mainLoading ? 1 : 0}
        style={{ transition: 'opacity 0.2s ease-in-out' }}
      >
        <LoadingOverlay
          visible={mainLoading}
          overlayProps={{
            color: '#362f36',
            backgroundOpacity: mainLoading ? 1 : 0,
            blur: 10,
          }}
        />
      </Overlay>
    </Affix>
    <AppShell
      header={{ height: 80, offset: true }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="0"
      withBorder={false}
      styles={{
        header: { backgroundColor: 'transparent' },
        navbar: { backgroundColor: '#362f36', opacity: 0.95, overflow: 'auto' },
      }}
    >
      <AppShell.Header zIndex={1000}>
        <NavTabs opened={opened} toggle={toggle} close={close} />
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Drawer opened={opened} toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main
        bg={path === '/' ? 'transparent' : '#23232588'}
        style={{
          backdropFilter: path === '/' ? 'none' : 'blur(10px)',
          overflow: 'auto',
        }}
        pos="relative"
        h="100lvh"
      >
        <Affix
          position={{ top: 0, right: 0, bottom: 0, left: 0 }}
          style={{ pointerEvents: mainLoading ? 'auto' : 'none' }}
        >
          <Overlay
            py="xl"
            h="100lvh"
            opacity={showLoading ? 1 : 0}
            style={{
              transition: 'opacity 0.2s ease-in-out',
              pointerEvents: showLoading ? 'auto' : 'none',
            }}
          >
            <LoadingOverlay
              visible={showLoading}
              overlayProps={{
                color: 'grey',
                backgroundOpacity: showLoading ? 0.25 : 0,
                blur: 10,
              }}
            />
          </Overlay>
        </Affix>
        <Box pt="md" pb="60px">
          <Container>
            <GlobalContext.Provider
              value={{ getFan, triggerLoad, triggerLoadFinish, triggerEasterEgg }}
            >
              <Outlet />
            </GlobalContext.Provider>
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  </Box>
}

export default Layout
