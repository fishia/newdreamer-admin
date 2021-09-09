import React, { useRef } from 'react'
import _ from 'lodash'
import { collegeInfoRemote } from '@/services/baseRemote'
import { message } from 'antd'
import useFormModal from '@/hooks/useFormModal'
import Table from '@/components/custom/table'
import Add from './components/Add'
import Edit from './components/Add'
import { tableFields } from './column'
import { renderSearchFields } from '@/utils/util'

export default props => {
  const myRef = useRef()
  const getTableData = ({ current, pageSize }, formData) => {
    let params = {
      page: current - 1,
      size: pageSize,
      ...formData,
    }
    return collegeInfoRemote.page(params).then(({ data, status }) => {
      if (status) {
        return {
          total: data.totalElements,
          list: data.content,
        }
      }
    })
  }
  const columns = tableFields

  const actionBtnProps = {
    showAdd: true,
    showEdit: true,
    showDelete: true,
  }
  // 新增
  const addFormModal = useFormModal({
    modal: {
      title: `${document.title}-新增`,
      width: 900,
      onOk: params => {
        return collegeInfoRemote
          .saveOrUpdate({
            ...params,
          })
          .then(({ status }) => {
            if (status) {
              addFormModal.setVisible(false)
              myRef.current?.submit()
              message.success('新增成功')
            }
            return status
          })
      },
    },
  })

  // 编辑
  const editFormModal = useFormModal({
    modal: {
      title: `${document.title}-编辑`,
      width: 900,
      onOk: params => {
        return collegeInfoRemote
          .saveOrUpdate({
            ...params,
            id: editFormModal.formData?.id,
          })
          .then(({ status }) => {
            if (status) {
              editFormModal.setVisible(false)
              myRef.current?.submit()
              message.success('编辑成功')
            }
            return status
          })
      },
    },
  })

  const TableProps = {
    initialValues: { enabled: 'true' },
    searchFields: [...renderSearchFields(columns)],
    actionBtnProps,
    otherTableProps: {
      columns,
    },
    getTableData,
    deleteItems: collegeInfoRemote,
    addFormModal,
    editFormModal,
    title: '高校',
  }
  return (
    <Table {...TableProps} ref={myRef}>
      <Add {...addFormModal} />
      <Edit {...editFormModal} />
    </Table>
  )
}
