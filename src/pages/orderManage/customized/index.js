import React from 'react'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'

export default props => {
  let columns = [...tableFields]
  columns.splice(6, 1, [
    '净尺寸',
    'volumeId',
    {
      width: 100,
      render: (text, record) => {
        return (
          text && (
            <ShowVolumeInfo
              {...{
                id: text,
                title: `${record.customerName}-${record.code}`,
                showCustomized: false,
              }}
            />
          )
        )
      },
    },
  ])
  columns.splice(7, 0, [
    '规格修改',
    'sizeChange',
    {
      width: 100,
      form: {},
    },
  ])
  const TableProps = {
    columns,
    classification: 'TAILOR_MADE_PRODUCT',
  }
  return <RenderMenu {...TableProps} />
}
