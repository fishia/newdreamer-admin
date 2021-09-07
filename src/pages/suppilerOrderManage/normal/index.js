import React, { useRef, useState } from 'react'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'

export default props => {
  let myref = useRef()
  const [columns, setColumns] = useState([])
  setTimeout(() => {
    if (myref.current) setColumns([...tableFields(myref.current.status)])
  }, 0)
  const TableProps = {
    columns,
    classification: 'FINISHED_PRODUCT',
  }
  return <RenderMenu ref={myref} {...TableProps} />
}
