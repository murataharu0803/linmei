import { colorsTuple, createTheme, MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import '@mantine/core/styles.css'

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
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}  defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
