import { Box, Center, Image } from '@mantine/core'
import React from 'react'

import useData from '@/hooks/useData'

import { Sheet } from '@/api/types'

const Signatures: React.FC = () => {
  const sigs = useData(Sheet.SIGNATURES)

  return <Box ta="center" style={{ filter: 'invert()' }}>
    {sigs.map(sig => <Center key={sig.fanId} mih="80lvh">
      <Image
        key={sig.fanId}
        src={sig.signatureUrl}
        alt={`Signature of ${sig.fanId}`}
        w="auto"
        h="auto"
        maw="100%"
        mah="80lvh"
        style={{ filter:
          'drop-shadow(1px -1px 3px rgba(255, 255, 255, 0.4)) ' +
          'drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.4)) ' +
          'drop-shadow(-1px -1px 3px rgba(255, 255, 255, 0.4)) ' +
          'drop-shadow(-1px 1px 3px rgba(255, 255, 255, 0.4)) ' +
          'drop-shadow(0 0 1rem white)',
        }}
      />
    </Center>)}
  </Box>
}

export default Signatures
