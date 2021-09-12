import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { fabricRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    fabricRemote.list({ ...props.params }).then(({ data }) => {
      setList(data.map(item => ({ label: item.fabric_Id, value: item.id })))
    })
  }, [props.params.fabric_Classsification])

  useEffect(() => {
    getlist()
  }, [getlist])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择面料" />
})
