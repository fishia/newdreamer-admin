import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { styleRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    styleRemote.listItemType().then(({ data }) => {
      setList(data.filter(item => item).map(item => ({ label: item, value: item })))
    })
  }, [])

  useEffect(() => {
    getlist()
  }, [getlist])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择商品类型" />
})
