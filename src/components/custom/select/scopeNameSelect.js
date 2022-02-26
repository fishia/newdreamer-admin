import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { taskScopeRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    let opts = props.params ? props.params : {}
    taskScopeRemote.list({ enabled: true, ...opts }).then(({ data }) => {
      setList(data.map(({ id, name }) => ({ label: name, value: id })))
    })
  }, [])

  useEffect(() => {
    getlist()
  }, [getlist])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择适用范围" />
})
