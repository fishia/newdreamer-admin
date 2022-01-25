import React, { useRef, useState } from 'react'
import { productInfoRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData, resetFormData } from './column'
import { Button } from 'antd'
import AddRange from './components/addRange'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const [visible, setVisible] = useState(false)
  const FormTableProps = {
    remote: productInfoRemote,
    actionBtnProps: {
      extraButtonList: [
        <Button key="add" type="primary" onClick={() => setVisible(true)}>
          新增模块
        </Button>,
      ],
    },
    columns: [
      [
        '名称',
        'name',
        {
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.name)
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
    resetFormData,
    viewFormModalProps: {
      title: `${document.title}-${title}`,
    },
  }

  const AddRangeProps = {
    modalProps: {
      title: `新增模块`,
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
