import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { singleItemRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    singleItemRemote.list().then(({ data }) => {
      setList(data.map(({ id, barcode, ...res }) => ({ label: barcode, value: id, ...res })))
    })
  }, [])

  useEffect(() => {
    getlist()
  }, [getlist])

  return (
    <MySelect
      {...props}
      ref={ref}
      datasource={[
        {
          label: '编号01',
          name: '编号01',
          value: 1,
          singleItemId: 1,
          classificationName: '西服',
          classification: 'XIFU',
          retailPrice: 100,
        },
      ]}
      placeholder="请选择ND单品编号"
    />
  )
})
