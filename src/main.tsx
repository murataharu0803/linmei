import { colorsTuple, createTheme, Loader, MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import AppRouter from '@/AppRouter'
import Loading from '@/Loading'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './assets/global.sass'

const theme = createTheme({
  colors: {
    linmei: colorsTuple('#cb523d'),
    red: colorsTuple('#e04946'),
    pink: colorsTuple('#fb687e'),
    yellow: colorsTuple('#f9c076'),
    purple: colorsTuple('#e2c2cd'),
    grape: colorsTuple('#362f36'),
    dark: colorsTuple(Array.from({ length: 10 }, (_, i) => i > 5 ? '#232325' : '#F8FAFA')),
  },
  primaryColor: 'linmei',
  radius: {
    0: '0px',
  },
  fontFamily: '"LXGW WenKai TC", cursive',
  fontFamilyMonospace: '"LXGW WenKai TC", cursive',
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: {
          ...Loader.defaultLoaders,
          custom: Loading,
        },
        type: 'custom',
      },
    }),
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}  defaultColorScheme="dark">
      <AppRouter><App /></AppRouter>
    </MantineProvider>
  </React.StrictMode>,
)
