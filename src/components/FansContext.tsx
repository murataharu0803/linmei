import { Fan } from '@/api/types'
import { createContext } from 'react'

interface FansContextProps {
  getFan: (fanId: string) => Fan
}

const FansContext = createContext<FansContextProps>({
  getFan: (fanId: string) =>
    ({ id: fanId, name: fanId, avatar: '', smallAvatarUrl: '' } as Fan),
})

export default FansContext
