import React, { useRef, useState } from 'react'
import { supplierRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  let columns = [
    [
      '供应商编号',
      'code',
      {
        width: 200,
        fixed: 'left',
        render: (text, record) => {
          //弹出详情
          return (
            <span
              onClick={() => {
                setTitle(record.code)
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
  ]
  const FormTableProps = {
    remote: supplierRemote,
    initialValues: {
      enabled: 'true',
    },
    columns,
    parseColumns,
    parseFormData,
    viewFormModalProps: {
      title: `${document.title}-${title}`,
    },
  }
  return <FormTable {...FormTableProps} ref={ref} />
}
