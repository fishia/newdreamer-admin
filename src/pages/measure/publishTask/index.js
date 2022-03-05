import React, { useRef, useState } from 'react'
import { taskRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData, resetFormData } from './column'
import { Button } from 'antd'
import AddRange from './components/addRange'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const [visible, setVisible] = useState(false)
  const FormTableProps = {
    remote: taskRemote,
    initialValues: {
      publishStatus: 'true',
    },
    actionBtnProps: {
      showExport: true,
      downloadURL: taskRemote.exportExcel.bind(taskRemote),
      extraButtonList: [
        <Button key="add" type="primary" onClick={() => setVisible(true)}>
          新增范围
        </Button>,
      ],
    },
    columns: [
      [
        '任务名称',
        'taskName',
        {
          width: 100,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.taskName)
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
    resetFormData,
  }

  const AddRangeProps = {
    modalProps: {
      title: `新增适用范围`,
      width: 700,
      visible,
      footer: [
        <Button key="close" type="primary" onClick={() => setVisible(false)}>
          确定
        </Button>,
      ],
      onCancel: () => setVisible(false),
    },
  }
  return (
    <>
      <FormTable {...FormTableProps} ref={ref} />
      {visible && <AddRange {...AddRangeProps} />}
    </>
  )
}
