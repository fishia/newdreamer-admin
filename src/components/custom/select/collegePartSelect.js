import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { collegeInfoRemote } from '@/services/baseRemote'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    collegeInfoRemote.list({ parentId: props.parentId, enabled: true }).then(({ data }) => {
      setList(
        data.map(item => ({
          label: item.part,
          value: props.key ? item[props.key] : item.id,
          ...item,
        }))
      )
    })
  }, [])

  useEffect(() => {
    getlist()
  }, [getlist])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择校区" />
})
