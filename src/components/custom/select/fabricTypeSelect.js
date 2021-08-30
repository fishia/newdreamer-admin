import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { fabricRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    fabricRemote.listClassification().then(({ data }) => {
      setList(data.map(item => ({ label: item, value: item })))
    })
  }, [])

  useEffect(() => {
    getlist()
  }, [getlist])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择面料类型" />
})
