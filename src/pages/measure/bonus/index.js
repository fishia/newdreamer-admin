import React, { useRef, useState } from 'react'
import moment from 'moment'
import { Button, message } from 'antd'
import { bonusRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns, parseFormData, resetFormData } from './column'
import SettleAccounts from './components/settleAccounts'
import useFormModal from '@/hooks/useFormModal'
import { VolumerSelect } from '@/components/custom/select'

export default props => {
  const myRef = useRef()
  const [title, setTitle] = useState(false)

  //批量结算
  const settleFormModal = useFormModal({
    modal: {
      title: `结算`,
      width: 900,
      onOk: params =>
        bonusRemote
          .batchSettle({
            ...params,
            year: moment(params.month).format('YYYY'),
            month: moment(params.month).format('M'),
          })
          .then(({ status }) => {
            if (status) {
              settleFormModal.setVisible(false)
              myRef.current?.submit()
              message.success('结算成功')
            }
            return status
          }),
    },
  })

  const FormTableProps = {
    remote: bonusRemote,
    initialValues: { status: 'false' },
    actionBtnProps: {
      showCopy: false,
      showImport: true,
      templateURL: '/resources/template/顾问提成.xls',
      uploadURL: bonusRemote.importExcel(),
      showExport: true,
      downloadURL: bonusRemote.exportExcel.bind(bonusRemote),
      extraButtonList: [
        <Button key="add" type="primary" onClick={() => settleFormModal.setVisible(true)}>
          结算
        </Button>,
      ],
    },
    columns: [
      [
        '顾问名称',
        'volumerName',
        {
          width: 100,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(`${record.volumerName}${record.orderId ? `-${record.orderId}` : ''}`)
                  myRef.current?.viewFormModal.setFormData({
                    ...record,
                  })
                  //详情
                  myRef.current?.viewFormModal.setVisible(true)
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
            type: 'other',
            name: 'volumerId',
            children: props => <VolumerSelect {...props} params={{ volumer_Status: true }} />,
            rules: [{ required: true }],
          },
        },
      ],
      ...tableFields,
    ],
    otherTableProps: {
      otherActionBtns: (text, record) => {
        let btns = [
          {
            name: '结算',
            popconfirm: {
              title: '是否确认结算？',
              confirm() {
                bonusRemote.settle({ id: record.id }).then(() => {
                  myRef.current?.submit()
                  message.success('结算成功')
                })
              },
            },
          },
        ]
        return record.status ? null : btns
      },
    },
    parseColumns,
    parseFormData,
    resetFormData,
    viewFormModalProps: {
      title: `${document.title}-${title}`,
    },
  }

  return (
    <>
      <FormTable {...FormTableProps} ref={myRef} />
      {settleFormModal.modalProps.visible && <SettleAccounts {...settleFormModal} />}
    </>
  )
}
