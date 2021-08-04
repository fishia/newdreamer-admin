import React, { useRef, useState } from 'react'
import { singleItemRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const FormTableProps = {
    remote: singleItemRemote,
    actionBtnProps: {
      showExport: true,
      showImport: true,
      templateURL: '/resources/template/单品信息.xlsx',
      uploadURL: singleItemRemote.importExcel.bind(singleItemRemote),
      downloadURL: singleItemRemote.exportExcel.bind(singleItemRemote),
    },
    initialValues: {
      enabled: 'true',
    },
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
    resetKey: 'barcode',
  }
  return <FormTable {...FormTableProps} ref={ref} />
}
