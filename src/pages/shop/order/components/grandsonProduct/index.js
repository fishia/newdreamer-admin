import React, { forwardRef, useState, useRef } from 'react'
import PureTable from '@/components/custom/table/pureTable'
import { grandsonTableFields, parseFormData } from '../../column'
import Add from './Add'
import Edit from './Add'

export default forwardRef((props, ref) => {
  const { detailList = [], onChange, single } = props
  const [title, setTitle] = useState(false)
  const myRef = useRef()

  const PureTableProps = {
    title: '孙子商品上架',
    actionBtnProps: {
      showAdd: single === 'true' ? (detailList.length ? false : true) : true,
      showEdit: true,
      showCopy: true,
      showDelete: true,
    },
    otherTableProps: {
      dataSource: detailList.map((item, i) => ({ ...item, key: i })),
      columns: [
        [
          'ND单品编号',
          'barcode',
          {
            width: 120,
            render: (text, record) => {
              return (
                <span
                  onClick={() => {
                    setTitle(record.barcode)
                    myRef.current?.viewFormModal.setFormData({
                      ...record,
                    })
                    //详情
                    myRef.current?.viewFormModal.setVisible(true)
                  }}
                  className="primaryBtn"
                >
                  {text}
                </span>
              )
            },
          },
        ],
        ...grandsonTableFields,
      ],
      scroll: { x: 700 },
    },
    parseFormData,
    viewFormModalProps: {
      title: `子商品上架${title ? `-${title}` : ''}`,
    },
    onChange,
    renderChildren: (addProps, editProps) => (
      <>
        <Add {...{ ...addProps }} />
        <Edit {...{ ...editProps }} />
      </>
    ),
    resetKey: 'singleItemId',
  }
  return (
    <div style={{ width: '922px', height: '400px' }}>
      <PureTable {...PureTableProps} ref={myRef} />
    </div>
  )
})
