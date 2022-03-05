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
      saleRole: false,
      measureRole: false,
      assistWithOrder: false,
      studyModule: false,
      releaseTask: false,
      operationalActivities: false,
    },
    actionBtnProps: {
      showExport: true,
      showImport: true,
      templateURL: '/resources/template/单品信息.xls',
      uploadURL: volumerRemote.importExcel(),
      downloadURL: volumerRemote.exportExcel.bind(volumerRemote),
    },
    columns: [
      [
        '顾问名称',
        'volumer_Name',
        {
          width: 100,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.volumer_Name)
                  ref.current?.editFormModal.setFormData({
                    ...record,
                  })
                  //详情
                  ref.current?.editFormModal.setVisible(true)
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
    resetKey: 'volumer_Id',
  }
  return <FormTable {...FormTableProps} ref={ref} />
}
