import React, { useRef } from 'react'
import _ from 'lodash'
import { styleRemote } from '@/services/baseRemote'
import { message } from 'antd'
import useFormModal from '@/hooks/useFormModal'
import Table from '@/components/custom/table'
import Add from './components/Add'
import Edit from './components/Add'
import { tableFields, parseColumns, parseFormData } from './column'

export default props => {
  const myRef = useRef()
  const getTableData = ({ current, pageSize }, formData) => {
    let params = {
      page: current - 1,
      size: pageSize,
      ...parseFormData(formData),
    }
    return styleRemote.page(params).then(({ data, status }) => {
      if (status) {
        return {
          total: data.totalElements,
          list: data.content.map(item => ({
            ...parseColumns(item),
          })),
        }
      }
    })
  }
  const columns = tableFields

  const actionBtnProps = {
    showAdd: true,
    showEdit: true,
    showCopy: true,
    showDelete: true,
  }
  // 新增
  const addFormModal = useFormModal({
    modal: {
      title: `${document.title}-新增`,
      width: 1000,
      onOk: params => {
        return styleRemote.saveOrUpdate({ ...parseFormData(params) }).then(({ status }) => {
          if (status) {
            myRef.current?.submit()
            addFormModal.setVisible(false)
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
        return styleRemote
          .saveOrUpdate({
            ...parseFormData(params),
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
    actionBtnProps,
    otherTableProps: {
      columns,
    },
    getTableData,
    deleteItems: styleRemote.deletes.bind(styleRemote),
    addFormModal,
    editFormModal,
    title: '款式管理',
    actionText: '款式细节',
    resetFormData: item => ({
      ...item,
      optionDTOS: item.optionDTOS.map(o => ({
        ...o,
        id: '',
        imagesDTOList: o.imagesDTOList.map(k => ({ ...k, id: '' })),
      })),
    }),
  }
  return (
    <Table {...TableProps} ref={myRef}>
      <Add {...addFormModal} />
      <Edit {...editFormModal} />
    </Table>
  )
}
