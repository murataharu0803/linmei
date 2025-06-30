import loading from '@/assets/loading-256.gif'
import { Center, Image, MantineLoaderComponent } from '@mantine/core'
import { forwardRef } from 'react'

const LoadingImage = () => <Center>
  <Image
    src={loading}
    alt="Loading"
    width={256}
    height={256}
    style={{ zIndex: 20000 }}
    radius="lg"
  />
</Center>

export const Loading: MantineLoaderComponent = forwardRef(LoadingImage)

export default Loading
