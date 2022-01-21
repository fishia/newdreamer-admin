import React, { useRef, useState } from 'react'
import { bonusRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData, resetFormData } from './column'
import { Button } from 'antd'
import SettleAccounts from './components/settleAccounts'

export default props => {
  const ref = useRef()
  const [title, setTitle] = useState(false)
  const [visible, setVisible] = useState(false)
  const FormTableProps = {
    remote: bonusRemote,
    actionBtnProps: {
      showExport: true,
      //downloadURL: volumerRemote.exportExcel.bind(volumerRemote),
      extraButtonList: [
        <Button key="add" type="primary" onClick={() => setVisible(true)}>
          新增范围
        </Button>,
      ],
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
    resetFormData,
    viewFormModalProps: {
      title: `${document.title}-${title}`,
    },
  }

  // 结算
  const addFormModal = useFormModal({
    modal: {
      title: `结算`,
      width: 900,
      onOk: params => {
        return bonusRemote
          .saveOrUpdate({
            ...params,
          })
          .then(({ status }) => {
            if (status) {
              addFormModal.setVisible(false)
              myRef.current?.submit()
              message.success('结算成功')
            }
            return status
          })
      },
    },
  })
  return (
    <>
      <FormTable {...FormTableProps} ref={ref} />
      {visible && <SettleAccounts {...addFormModal} />}
    </>
  )
}
