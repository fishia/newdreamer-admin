import React, { useRef, useState } from 'react'
import { volumerRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const FormTableProps = {
    remote: volumerRemote,
    initialValues: {
      volumer_Status: 'true',
    },
    actionWidth: 150,
    actionBtnProps: {
      showAdd: false,
      showCopy: false,
      showExport: true,
      downloadURL: volumerRemote.exportExcel.bind(volumerRemote),
    },
    columns: [
      [
        '任务名称',
        'task_name',
        {
          width: 100,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.task_name)
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
          },
          form: {
            rules: [{ required: true }],
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
