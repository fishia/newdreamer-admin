import React from 'react'
import { ShowVolumeInfo, StylesAndFabricsBtn } from '@/components/custom/Button'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'

export default props => {
  let columns = [...tableFields]

  columns.splice(6, 1, [
    '成衣尺寸',
    'volumeId',
    {
      width: 100,
      render: (text, record) => {
        return (
          <ShowVolumeInfo
            {...{
              id: text,
              sizeInfo: record.sizeDTO,
              title: `${record.customerName}-${record.code}`,
            }}
          />
        )
      },
    },
  ])
  columns.splice(7, 0, [
    '款式及面料',
    'styleJson',
    {
      width: 150,
      render: (text, record) => {
        return (
          <StylesAndFabricsBtn
            record={record.styleJson}
            title={record.code}
            formData={{ productType: record.productType }}
          />
        )
      },
    },
  ])
  const TableProps = {
    columns,
    classification: 'CUSTOMIZED_PRODUCT',
  }
  return <RenderMenu {...TableProps} />
}
