import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import MySelect from './mySelect'
import { requestForVolumerList } from '@/pages/measure/appoint/action'

export default forwardRef((props, ref) => {
  const [list, setList] = useState([])

  const getlist = useCallback(async () => {
    let opts = props.params ? props.params : {}
    if ('fetchApi' in props && props.fetchApi) {
      props.fetchApi(opts).then(({ data }) => {
        setList(
          data.map(({ volumer_Id, volumer_Name, ...res }) => ({
            label: volumer_Name,
            value: volumer_Id,
            ...res,
          }))
        )
      })
    } else {
      requestForVolumerList(opts).then(({ data }) => {
        if (data)
          setList(
            data
              .filter(item => item.volumer_Name)
              .map(({ volumer_Id, volumer_Name, ...res }) => ({
                label: volumer_Name,
                value: volumer_Id,
                ...res,
              }))
          )
      })
    }
  }, [props])

  useEffect(() => {
    getlist()
  }, [])

  return <MySelect {...props} ref={ref} datasource={list} placeholder="请选择着装顾问" />
})
