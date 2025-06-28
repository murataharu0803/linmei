import { useContext, useEffect, useState } from 'react'

import { getData } from '@/api'
import { DataTypeMap, Sheet } from '@/api/types'
import GlobalContext from '@/components/GlobalContext'

const useData = <Name extends Sheet>(table: Name) => {
  const [data, setData] = useState<DataTypeMap[Name][]>([])
  const ctx = useContext(GlobalContext)
  const triggerLoad = ctx?.triggerLoad
  const triggerLoadFinish = ctx?.triggerLoadFinish

  useEffect(() => {
    triggerLoad?.()
    getData(table).then(responseData => {
      if (!responseData) console.error(`No data found for table: ${table}`)
      if (!Array.isArray(responseData)) console.error(`Data for table ${table} is not an array`)
      setData(responseData)
      triggerLoadFinish?.()
    })
  }, [table, triggerLoad, triggerLoadFinish])

  return data
}

export default useData
