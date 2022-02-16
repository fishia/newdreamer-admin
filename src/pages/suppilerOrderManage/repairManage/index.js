import React, { useRef, useState } from 'react'
import { taskReceiveRecordRemote, productInMakingRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import useFormModal from '@/hooks/useFormModal'
import OrderNo from '@/pages/suppilerOrderManage/components/orderNo'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const myRef = useRef()
  const [title, setTitle] = useState(false)

  // 填写订单号
  const addFormModal = useFormModal({
    modal: {
      title: `填写运单号`,
      width: 450,
      onOk: params => {
        return productInMakingRemote
          .updateStatus({
            ...params,
            ids: [addFormModal.formData?.id],
          })
          .then(({ status }) => {
            if (status) {
              addFormModal.setVisible(false)
              myRef.current?.submit()
              message.success(`填写运单号成功`)
            }
            return status
          })
      },
    },
  })

  const FormTableProps = {
    remote: taskReceiveRecordRemote,
    initialValues: {
      volumer_Status: 'true',
    },
    actionWidth: 150,
    actionBtnProps: {
      showCopy: false,
      showEdit: false,
      showExport: true,
      downloadURL: taskReceiveRecordRemote.exportExcel.bind(taskReceiveRecordRemote),
    },
    otherTableProps: {
      otherActionBtns: (text, record) => {
        let btns = []
        !record.shipmentId &&
          btns.push({
            name: '填写运单号',
            onClick: () => {
              addFormModal.setFormData({
                id: record.id,
                shipmentId: '',
              })
              addFormModal.setVisible(true)
            },
          })
        return btns
      },
    },
    columns: [
      [
        '客户名称',
        'customerName',
        {
          width: 100,
          render: (text, record) => {
            return (
              <span
                onClick={() => {
                  setTitle(record.customerName)
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
  return (
    <>
      <FormTable {...FormTableProps} ref={myRef} />
      {addFormModal.modalProps.visible && <OrderNo {...addFormModal} />}
    </>
  )
}
