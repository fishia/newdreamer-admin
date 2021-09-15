import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { singleItemRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    singleItemRemote.list({ classification: props.classification }).then(({ data }) => {
      setList(data.map(({ id, barcode, ...res }) => ({ label: barcode, value: id, ...res })))
    })
  }, [props.classification])

  useEffect(() => {
    getlist()
  }, [getlist])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择ND单品编号" />
})
