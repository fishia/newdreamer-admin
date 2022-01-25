import React, { useRef, useState } from 'react'
import { evaluateRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  let columns = [
    [
      '单品编号',
      'item_Id',
      {
        width: 120,
        fixed: 'left',
        render: (text, record) => {
          //弹出详情
          return (
            <span
              onClick={() => {
                setTitle(record.item_Id)
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
    remote: evaluateRemote,
    actionBtnProps: {
      showExport: true,
      showImport: true,
      templateURL: '/resources/template/单品信息.xls',
      uploadURL: evaluateRemote.importExcel(),
      downloadURL: evaluateRemote.exportExcel.bind(evaluateRemote),
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
