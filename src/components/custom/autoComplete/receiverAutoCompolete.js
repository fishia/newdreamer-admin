import React from 'react'
import MyAutoComplete from './myAutoComplete'
import { requestForVolumerList } from '@/pages/measure/appoint/action'

//收货人
export default React.forwardRef((props, ref) => {
  const [list, setList] = React.useState([])

  const searchReciverSearch = React.useCallback(() => {
    let opts = props.params ? props.params : {}
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
  }, [props])

  React.useEffect(() => {
    searchReciverSearch()
  }, [searchReciverSearch])

  return <MyAutoComplete {...props} ref={ref} options={list} placeholder="请输入收货人" />
})
