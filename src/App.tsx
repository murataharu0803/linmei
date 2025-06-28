import { Button, Center, CopyButton, Text, Title } from '@mantine/core'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Layout from '@/Layout'
import routes from '@/routes'
import { Helmet } from '@dr.pogodin/react-helmet'

const App = () => {
  const navigate = useNavigate()
  const path = useSearchParams()[0].get('path') || ''

  useEffect(() => {
    if (routes.some(route => route.path === path))
      navigate(path || '/', { replace: true })
  })

  return <>
    <Helmet>
      <title>林梅畢業紀念網站</title>
      <link rel="canonical" href="https://linmei.page/" />
      <meta charSet="utf-8" />
      <meta name="林梅畢業紀念非官方網站" content="烏梅獻給台灣 VTuber 林梅的畢業禮物。" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#cb523d" />
      <meta name="description" content="烏梅獻給台灣 VTuber 林梅的畢業禮物。" />
      <meta name="keywords" content="林梅,畢業,VTuber,烏梅,畢業,林梅畢業紀念" />
      <meta name="author" content="哈洛斯 Harlos" />
      <meta property="og:title" content="林梅畢業紀念非官方網站" />
      <meta property="og:description" content="烏梅獻給台灣 VTuber 林梅的畢業禮物。" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://linmei.page/" />
      <meta property="og:image" content="https://linmei.page/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="林梅畢業紀念非官方網站" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="林梅畢業紀念非官方網站" />
      <meta name="twitter:description" content="烏梅獻給台灣 VTuber 林梅的畢業禮物。" />
      <meta name="twitter:image" content="https://linmei.page/og-image.png" />
      <meta name="twitter:site" content="@Harlos_Music" />
      <meta name="twitter:creator" content="@Harlos_Music" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
      <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Helmet>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        const fullErrorMessage = error instanceof Error
          ? error.stack || error.message
          : String(error)
        const is404 = error.message === '404'
        if (is404) {
          return <Center w="100vw" h="100vh" pos="absolute" style={{ flexDirection: 'column' }}>
            <Title order={1} mb="md">你來錯地方了啦！</Title>
            <Title order={2} mb="md">梅有的東西就是梅有</Title>
            <Button
              onClick={() => {
                resetErrorBoundary()
                navigate(path || '/', { replace: true })
              }}
              mt="md"
            >
              回到首頁
            </Button>
            <Helmet>
              <meta name="robots" content="noindex, nofollow" />
            </Helmet>
          </Center>
        } else {
          return <Center w="100vw" h="100vh" pos="absolute" style={{ flexDirection: 'column' }}>
            <Title order={1} mb="md">欸，網站又壞了啦</Title>
            <Title order={2} mb="md">叫哈洛斯出來負責啦</Title>
            <Text size="lg" mb="md">反正把下面這段複製給他就好了</Text>
            <Text
              size="xs"
              component='pre'
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
              mb="md"
            >
              {fullErrorMessage}
            </Text>
            <CopyButton value={fullErrorMessage} timeout={10000}>
              {({ copied, copy }) => (
                <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                  {copied ? '好了啦複製了啦' : '看不懂，反正複製就對了'}
                </Button>
              )}
            </CopyButton>
            <Text size="sm" mt="md">奇怪為甚麼我說又...?</Text>
            <Button onClick={resetErrorBoundary} mt="md">再重新整理一次</Button>
            <Helmet>
              <meta name="robots" content="noindex, nofollow" />
            </Helmet>
          </Center>
        }
      }}
    >
      <Layout />
      <Helmet>
        <meta name="robots" content="index, follow" />
      </Helmet>
    </ErrorBoundary>
  </>
}

export default App
