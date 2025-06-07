import { Overlay, Space, Tabs, Title } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import routes from '@/routes'

import styles from './NavTabs.module.sass'

const NavTabs: React.FC = () => {
  const navigate = useNavigate()
  const currentPath = window.location.pathname
  const cuurentRoute = routes.find(route => currentPath === route.path)

  return <Tabs
    className={styles['nav-tabs']}
    value={cuurentRoute?.key}
    onChange={value => navigate(routes.find(route => route.key === value)?.path || '/')}
    pos="relative"
  >
    <Overlay
      color="#000"
      backgroundOpacity={0.2}
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

export default NavTabs
