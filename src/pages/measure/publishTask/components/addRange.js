import { forwardRef } from 'react'
import { taskScopeRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { rangeFields, parseColumns } from '../column'
import { Modal } from 'antd'

export default forwardRef((props, ref) => {
  const { modalProps, callback } = props
  const FormTableProps = {
    remote: taskScopeRemote,
    actionBtnProps: {
      showCopy: false,
    },
    initialValues: {
      enabled: true,
    },
    title: '新增适用范围',
    columns: rangeFields,
    parseColumns,
    otherTableProps: {
      scroll: null,
    },
  }

  return (
    <Modal {...modalProps}>
      <div style={{ height: '400px' }}>
        <FormTable {...FormTableProps} ref={ref} />
      </div>
    </Modal>
  )
})
