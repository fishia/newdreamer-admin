import React, { useRef, useState } from 'react'
import { volumerRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const FormTableProps = {
    remote: volumerRemote,
    actionWidth: 100,
    actionBtnProps: {
      showAdd: false,
      showCopy: false,
      showDelete: false,
      showExport: true,
      downloadURL: volumerRemote.exportExcel.bind(volumerRemote),
    },
    columns: [
      [
        'wechatid',
        'wechatid',
        {
          width: 100,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.wechatid)
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
