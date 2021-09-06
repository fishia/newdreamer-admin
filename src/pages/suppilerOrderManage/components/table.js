import React, { forwardRef } from 'react'
import _ from 'lodash'
import { productInMakingRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { parseColumns } from './column'
import Add from './orderNo'

export default forwardRef((props, ref) => {
  const { status, addFormModal, columns, classification } = props
  const FormTableProps = {
    remote: productInMakingRemote,
    ..._.omit(props, ['status']),
    otherTableProps: {
      ...props.otherTableProps,
      columns: [
        [
          '制作单号',
          'code',
          {
            width: 100,
            filter: {
              isunions: true,
            },
          },
        ],
        ...columns,
      ],
    },
    parseColumns,
    parseFormData: data => ({ ...data, status, classification }),
    renderChildren: () => <Add {...{ ...addFormModal }} />,
  }

  return <FormTable {...FormTableProps} ref={ref} />
})
