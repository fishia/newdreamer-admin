import React, { useState, useEffect, forwardRef } from 'react'
import _ from 'lodash'
import { productInMakingRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { parseColumns, parseFormData } from './column'
import Add from './Add'
import Edit from './Add'
import { JKUtil } from '@/utils/util'
const { getObjProperty } = JKUtil

export default forwardRef((props, ref) => {
  const { status, statusName, classification, columns } = props
  const [title, setTitle] = useState(`${document.title}-编辑`)
  // console.log(ref)
  // useEffect(() => {
  //   setTitle(`${document.title}${getObjProperty(ref.current, 'editFormModal.formData.code')}-编辑`)
  // }, [ref])
  const FormTableProps = {
    remote: productInMakingRemote,
    ..._.omit(props, ['status', 'classification']),
    columns: [
      [
        '制作单号',
        'code',
        {
          width: 100,
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
    ],
    editFormModalProps: {
      title,
    },
    viewFormModalProps: {
      title: `${document.title}${title ? `-${title}` : ''}-${statusName}`,
      classification,
    },
    parseColumns,
    parseFormData: data => parseFormData({ ...data, status, classification }),
    renderChildren: (addProps, editProps) => (
      <>
        <Add {...{ ...addProps, classification }} />
        <Edit {...{ ...editProps, classification }} />
      </>
    ),
  }

  return <FormTable {...FormTableProps} ref={ref} />
})
