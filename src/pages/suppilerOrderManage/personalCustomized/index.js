import React from 'react'
import { ShowVolumeInfo, StylesAndFabricsBtn } from '@/components/custom/Button'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'

export default props => {
  let columns = [...tableFields]
  columns.splice(3, 1, [
    '成衣尺寸',
    'volumeId',
    {
      width: 100,
      render: (text, record) => {
        console.log(text)
        return (
          <ShowVolumeInfo
            {...{
              id: text,
              sizeInfo: record.sizeDTO,
              title: `${document.title}-${record.customerName}-${record.code}`,
            }}
          />
        )
      },
    },
  ])
  columns.splice(4, 0, [
    '款式及面料',
    'styleJson',
    {
      width: 150,
      render: (_, record) => {
        return <StylesAndFabricsBtn record={record.styleJson} title={record.code} />
      },
    },
  ])
  const TableProps = {
    columns,
    classification: 'CUSTOMIZED_PRODUCT',
  }
  return <RenderMenu {...TableProps} />
}
