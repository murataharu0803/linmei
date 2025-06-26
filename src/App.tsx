import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'

import Layout from '@/Layout'

import { Fan, Sheet } from '@/api/types'
import FansContext from '@/components/FansContext'
import useData from '@/hooks/useData'
import routes from '@/routes'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  const path = useSearchParams()[0].get('path') || ''

  useEffect(() => {
    console.log('App rendered with search:', path)
    if (routes.some(route => route.path === path))
      navigate(path || '/', { replace: true })
  })

  const fans = useData(Sheet.FANS)
  const getFan = (fanId: string) =>
    fans.find(fan => fan.id === fanId)
      || { id: fanId, name: fanId, avatar: '', smallAvatarUrl: '' } as Fan

  return <FansContext.Provider value={{ getFan }}><Routes>
    <Route path="/" element={<Layout />}>
      {routes.map(route => (
        <Route
          key={route.name}
          path={route.path}
          element={route.component}
        />
      ))}
    </Route>
  </Routes></FansContext.Provider>
}

export default App
