import React, { useRef, useState } from 'react'
import { fabricRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const FormTableProps = {
    remote: fabricRemote,
    actionBtnProps: {
      showExport: true,
      showImport: true,
      templateURL: '/resources/template/面料信息.xls',
      uploadURL: fabricRemote.importExcel(),
      downloadURL: fabricRemote.exportExcel.bind(fabricRemote),
    },
    initialValues: {
      enabled: 'true',
    },
    columns: [
      [
        'ND面料号',
        'code',
        {
          width: 120,
          render: (text, record) => {
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
            isunions: true, //联合类型
          },
          form: { rules: [{ required: true }] },
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
