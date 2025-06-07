import { Route, Routes } from 'react-router-dom'

import Layout from '@/Layout'

import routes from '@/routes'

function App() {
  return <Routes>
    <Route path="/" element={<Layout />}>
      {routes.map(route => (
        <Route
          key={route.name}
          path={route.path}
          element={route.component}
        />
      ))}
    </Route>
  </Routes>
}

export default App
