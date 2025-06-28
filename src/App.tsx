import { useEffect } from 'react'
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import FansContext from '@/components/FansContext'
import useData from '@/hooks/useData'
import Layout from '@/Layout'
import routes from '@/routes'

import { Fan, Sheet } from '@/api/types'

const App = () => {
  const navigate = useNavigate()
  const path = useSearchParams()[0].get('path') || ''

  useEffect(() => {
    if (routes.some(route => route.path === path))
      navigate(path || '/', { replace: true })
  })

  const fans = useData(Sheet.FANS)
  const getFan = (fanId: string) =>
    fans.find(fan => fan.id === fanId)
      || { id: fanId, name: fanId, avatar: '', smallAvatarUrl: '' } as Fan

  return <FansContext.Provider value={{ getFan }}>
    <Layout />
  </FansContext.Provider>
}

export default App
