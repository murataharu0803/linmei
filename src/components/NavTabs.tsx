import { Overlay, Space, Tabs, Title } from '@mantine/core'
import React, { memo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import routes from '@/routes'

import styles from './NavTabs.module.sass'

const NavTabs: React.FC = () => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const currentRoute = routes.find(route => currentPath === route.path)
  const isHome = currentPath === '/'

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


  return <Tabs
    className={styles['nav-tabs']}
    value={currentRoute?.key}
    onChange={value => navigate(
      routes.find(route => route.key === value)?.path || '/',
      { viewTransition: true },
    )}
    pos="sticky"
    top={0}
    style={{ zIndex: 1000, transition: 'opacity 0.2s ease-in-out' }}
    opacity={isHome && hide ? 0 : 1}
    onMouseMove={trigger}
  >
    <Overlay
      color="#000"
      backgroundOpacity={isHome ? 0 : 0.2}
      pos="relative"
      blur={10}
    >
      <Tabs.List display="flex" px="xl" py="lg" style={{ alignItems: 'center' }}>
        <div><Title order={2}>林梅</Title></div>
        <Space flex="1 0 0" />
        {routes.map(route => (
          <Tabs.Tab key={route.key} value={route.key}>
            {route.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Overlay>
  </Tabs>
}

export default memo(NavTabs)
