import React from 'react'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'
import { ShowVolumeInfo } from '@/components/custom/Button'

export default props => {
  let columns = [...tableFields('TAILOR_MADE_PRODUCT')]
  columns.splice(6, 0, [
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
  columns.splice(8, 0, [
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
