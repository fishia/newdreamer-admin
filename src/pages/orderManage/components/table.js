import React, { useState, forwardRef } from 'react'
import _ from 'lodash'
import { productInMakingRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { parseColumns, parseFormData } from './column'
import Add from './Add'
import Edit from './Add'

export default forwardRef((props, ref) => {
  const { status, statusName, classification, columns } = props
  const [title, setTitle] = useState(`${document.title}-编辑`)

  const FormTableProps = {
    remote: productInMakingRemote,
    ..._.omit(props, ['status', 'classification']),
    columns: [
      [
        '制作单号',
        'code',
        {
          width: 180,
          render: (text, record) => {
            //制单生产看详情，供应商不能
            return (
              <span
                onClick={() => {
                  setTitle(`${record.customerName}-${record.code}`)
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
      ...columns,
      status === 'COMPLETED'
        ? [
            '快递单号',
            'shipmentId',
            {
              width: 180,
              filter: {
                isunions: true,
              },
            },
          ]
        : '',
    ],
    editFormModalProps: {
      title,
    },
    viewFormModalProps: {
      title: `${document.title}${title ? `-${title}` : ''}-${statusName}`,
      classification,
      width: 1200,
    },
    parseColumns,
    parseFormData: data => parseFormData({ ...data, status, classification }),
    renderChildren: (addProps, editProps) => (
      <>
        {addProps.modalProps.visible && <Add {...{ ...addProps, classification }} />}
        {editProps.modalProps.visible && <Edit {...{ ...editProps, classification }} />}
      </>
    ),
  }

  return <FormTable {...FormTableProps} ref={ref} />
})
