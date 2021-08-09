import { forwardRef } from 'react'
import { collegeInfoRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { campusFields, parseColumns } from '../column'

export default forwardRef((props, ref) => {
  const { parentId, callback } = props
  const FormTableProps = {
    remote: collegeInfoRemote,
    actionBtnProps: {
      showCopy: false,
    },
    initialValues: {
      enabled: 'true',
    },
    title: '学校校区',
    columns: campusFields,
    parseColumns,
    otherTableProps: {
      pagination: false,
    },
    parseFormData: data => ({ ...data, parentId }),
    getTableData: () => {
      let params = {
        parentId,
      }
      return collegeInfoRemote.list(params).then(({ data, status }) => {
        if (status) {
          callback(data)
          return {
            total: data.length,
            list: data,
          }
        }
      })
    },
  }

  return (
    <div style={{ width: '852px', height: '400px' }}>
      <FormTable {...FormTableProps} ref={ref} />
    </div>
  )
})
