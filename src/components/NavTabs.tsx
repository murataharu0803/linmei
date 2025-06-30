import { Burger, Center, Image, Overlay, Space, Tabs, Title } from '@mantine/core'
import React, { memo, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import routes from '@/routes'

import styles from './NavTabs.module.sass'

import logo from '@/assets/logo.png'

type NavTabsProps = {
  opened?: boolean
  toggle?: () => void
  close?: () => void
}

const NavTabs: React.FC<NavTabsProps> = ({ opened, toggle, close }) => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const currentRoute = routes.find(route => currentPath === route.path)

  const [hide, setHide] = useState(false)
  const hideTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const trigger = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current)
      hideTimeout.current = null
    }
    setHide(false)
    hideTimeout.current = setTimeout(() => {
      setHide(true)
    }, 2000)
  }

  useEffect(() => {
    hideTimeout.current = setTimeout(() => {
      setHide(true)
    }, 2000)
    window.addEventListener('touchstart', trigger)
    return () => {
      window.removeEventListener('touchstart', trigger)
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
        hideTimeout.current = null
      }
    }
  }, [])

  return <Tabs
    className={styles['nav-tabs']}
    value={currentRoute?.key}
    onChange={value => navigate(
      routes.find(route => route.key === value)?.path || '/',
      { viewTransition: true },
    )}
    h="100%"
    pos="sticky"
    top={0}
    style={{ zIndex: 1000, transition: 'opacity 0.2s ease-in-out' }}
    opacity={hide && !opened ? 0 : 1}
    onMouseMove={trigger}
  >
    <Overlay
      color="#362f36"
      backgroundOpacity={opened ? 0.95 : 0.5}
      style={{ transition: 'background-color 0.2s ease-in-out' }}
      pos="relative"
      blur={10}
      h="100%"
    >
      <Center h="100%" px="xl" py="lg">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" p={0} flex={1}/>
        <Title order={2} px="lg">
          <NavLink to="/" viewTransition onClick={close}>
            <Image src={logo} alt="林梅" h="50px" />
          </NavLink>
        </Title>
        <Space flex="1 0 0" />
        <Tabs.List
          display="flex"
          visibleFrom="sm"
          style={{ alignItems: 'center' }}
        >
          {routes.filter(r => r.path !== '/').map(route =>
            <Tabs.Tab key={route.key} value={route.key}>
              {route.name}
            </Tabs.Tab>,
          )}
        </Tabs.List>
      </Center>
    </Overlay>
  </Tabs>
}

export default memo(NavTabs)
