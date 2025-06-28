import { Fan } from '@/api/types'
import { createContext } from 'react'

interface GlobalContextProps {
  getFan: (fanId: string) => Fan
  triggerLoad?: () => void
  triggerLoadFinish?: () => void
}

const FansContext = createContext<GlobalContextProps>({
  getFan: (fanId: string) =>
    ({ id: fanId, name: fanId, avatar: '', smallAvatarUrl: '' } as Fan),
})

export default FansContext
