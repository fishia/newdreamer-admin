import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { supplierRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    supplierRemote.list().then(({ data }) => {
      setList(data.map(({ id, supplierName }) => ({ label: supplierName, value: id })))
    })
  }, [])

  useEffect(() => {
    getlist()
  }, [getlist])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择供应商" />
})
