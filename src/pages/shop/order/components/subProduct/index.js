import React, { forwardRef, useState, useRef } from 'react'
import PureTable from '@/components/custom/table/pureTable'
import Add from './Add'
import Edit from './Add'
import { childTableFields, parseFormData } from '../../column'

export default forwardRef((props, ref) => {
  const { subProducts = [], onChange } = props
  const [title, setTitle] = useState(false)
  const myRef = useRef()
  const PureTableProps = {
    title: '子商品上架',
    otherTableProps: {
      dataSource: subProducts.map((item, i) => ({ ...item, key: i })),
      columns: [
        [
          '子商品编号',
          'subCode',
          {
            width: 120,
            render: (text, record) => {
              return (
                <span
                  onClick={() => {
                    setTitle(record.subCode)
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
            form: {
              disabled: true,
              hide: 'add',
            },
          },
        ],
        ...childTableFields,
      ],
      scroll: { x: 800 },
    },
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
    resetFormData: item => ({ ...item, detailList: item.detailList.map(o => ({ ...o, id: '' })) }),
    resetKey: 'subCode',
  }
  return (
    <div style={{ width: '922px', height: '400px' }}>
      <PureTable {...PureTableProps} ref={myRef} />
    </div>
  )
})
