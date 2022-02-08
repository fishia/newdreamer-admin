import React, { useRef, useState } from 'react'
import { backCustomerRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const FormTableProps = {
    remote: backCustomerRemote,
    actionWidth: 100,
    actionBtnProps: {
      showAdd: false,
      showCopy: false,
      showDelete: false,
      showExport: true,
      downloadURL: backCustomerRemote.exportExcel.bind(backCustomerRemote),
    },
    columns: [
      [
        'wechatid',
        'customer_Wechat_Id',
        {
          width: 100,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.customer_Wechat_Id)
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
            isunions: true, //联合类型
            orderIndex: 4,
          },
          form: {
            disabled: 'edit',
          },
        },
      ],
      ...tableFields,
    ],
    parseColumns,
    parseFormData,
    viewFormModalProps: {
      title: `${document.title}-${title}`,
    },
  }
  return <FormTable {...FormTableProps} ref={ref} />
}
