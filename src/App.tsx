import { Button, Center, CopyButton, Text, Title } from '@mantine/core'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Layout from '@/Layout'
import routes from '@/routes'

const App = () => {
  const navigate = useNavigate()
  const path = useSearchParams()[0].get('path') || ''

  useEffect(() => {
    if (routes.some(route => route.path === path))
      navigate(path || '/', { replace: true })
  })

  return <ErrorBoundary
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
        </Center>
      }
    }}
  >
    <Layout />
  </ErrorBoundary>
}

export default App
