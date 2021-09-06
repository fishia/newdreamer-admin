import React from 'react'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'

export default props => {
  let columns = [...tableFields]
  columns.splice(3, 0, [
    '规格修改',
    'sizeChange',
    {
      width: 100,
    },
  ])
  const TableProps = {
    columns,
    classification: 'TAILOR_MADE_PRODUCT',
  }
  return <RenderMenu {...TableProps} />
}
