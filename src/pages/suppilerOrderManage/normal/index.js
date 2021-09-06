import React from 'react'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'

export default props => {
  const TableProps = {
    columns: tableFields,
    classification: 'FINISHED_PRODUCT',
  }
  return <RenderMenu {...TableProps} />
}
