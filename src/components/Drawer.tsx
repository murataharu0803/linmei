import { Tabs } from '@mantine/core'
import React, { memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import routes from '@/routes'

import styles from './Drawer.module.sass'

type DrawerProps = {
  opened?: boolean
  toggle?: () => void
}

const Drawer: React.FC<DrawerProps> = ({ toggle }) => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const currentRoute = routes.find(route => currentPath === route.path)

  return <Tabs
    className={styles['drawer']}
    value={currentRoute?.key}
    onChange={value => {
      toggle?.()
      navigate(
        routes.find(route => route.key === value)?.path || '/',
        { viewTransition: true },
      )
    }}
    orientation="vertical"
    px="md"
  >
    <Tabs.List
      display="flex"
      style={{ alignItems: 'center' }}
      w="100%"
    >
      {routes.map(route => (
        <Tabs.Tab key={route.key} value={route.key} w="100%" p="md" my="xs">
          {route.name}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  </Tabs>
}

export default memo(Drawer)
