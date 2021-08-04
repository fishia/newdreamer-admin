import React, { useRef, useState } from 'react'
import { productInfoRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import Add from './components/Add'
import Edit from './components/Add'
import { tableFields, parseColumns, parseFormData, resetFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const FormTableProps = {
    remote: productInfoRemote,
    initialValues: {
      status: 'true',
    },
    columns: [
      [
        '上线商品编号',
        'barcode',
        {
          width: 150,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.barcode)
                  ref.current?.viewFormModal.setFormData({
                    ...record,
                  })
                  //详情
                  ref.current?.viewFormModal.setVisible(true)
                }}
                className="primaryBtn"
              >
                {text}
              </span>
            )
          },
          filter: {
            isunions: true,
          },
          form: {
            disabled: true,
            hide: 'add',
          },
        },
      ],
      ...tableFields,
    ],
    parseColumns,
    parseFormData,
    resetFormData,
    viewFormModalProps: {
      title: `${document.title}-${title}`,
    },
    renderChildren: (addProps, editProps) => (
      <>
        <Add {...{ ...addProps }} />
        <Edit {...{ ...editProps }} />
      </>
    ),
  }
  return <FormTable {...FormTableProps} ref={ref} />
}
