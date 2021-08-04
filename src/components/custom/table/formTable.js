import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { message } from 'antd'
import useFormModal from '@/hooks/useFormModal'
import Table from '../table'
import Add from '../modal/formModal'
import Edit from '../modal/formModal'
import View from '../modal/formModal'
import { renderSearchFields, renderFormFields } from '@/utils/util'
/**
 * 表单业务组件
 * remote:接口api对象
 * parseColumns:外部处理后台返回数据结构
 * parseFormData:外部处理请求参数
 * resetFormData:外部传入复制参数初始化
 * initialValues:查询条件初始值
 * actionBtnProps：外部传入其他操作按钮属性
 * addFormModalProps:外部传入新增弹窗属性
 * editFormModalProps:外部传入编辑弹窗属性
 * viewFormModalProps:外部传入查看弹窗属性
 * otherTableProps:外部传入table属性
 * getTableData:自定义列表接口，可能是list不是分页
 * renderChildren:自定义新增、编辑弹窗
 * actionWidth:操作栏宽度
 * actionText:操作栏文字
 * resetKey:复制时需要清空的字段
 */
export default forwardRef((props, ref) => {
  const {
    remote,
    title = document.title,
    actionBtnProps,
    columns,
    parseColumns = item => item,
    parseFormData = item => item,
    resetFormData,
    initialValues,
    addFormModalProps,
    editFormModalProps,
    viewFormModalProps,
    otherTableProps = {},
    getTableData = ({ current, pageSize }, formData) => {
      let params = {
        page: current - 1,
        size: pageSize,
        ...parseFormData(formData),
      }
      return remote.page(params).then(({ data, status }) => {
        if (status) {
          return {
            total: data.totalElements,
            list: data.content.map(item => ({
              ...parseColumns(item),
            })),
          }
        }
      })
    },
    renderChildren,
    actionWidth,
    actionText,
    resetKey,
  } = props
  const myRef = useRef()
  // 列表操作
  const ActionBtnProps = {
    showAdd: true,
    showEdit: true,
    showCopy: true,
    showDelete: true,
    ...actionBtnProps,
  }
  // 新增
  const addFormModal = useFormModal({
    modal: {
      title: `${document.title}-新增`,
      width: 900,
      onOk: params => {
        return remote
          .saveOrUpdate({
            ...parseFormData(params),
          })
          .then(({ status }) => {
            if (status) {
              myRef.current?.submit()
              message.success('新增成功')
            }
            return status
          })
      },
      ...addFormModalProps,
    },
  })

  // 编辑
  const editFormModal = useFormModal({
    modal: {
      title: `${document.title}-编辑`,
      width: 900,
      onOk: params => {
        return remote
          .saveOrUpdate({
            ...parseFormData(params),
            id: editFormModal.formData?.id,
          })
          .then(({ status }) => {
            if (status) {
              myRef.current?.refresh()
              message.success('编辑成功')
            }
            return status
          })
      },
      ...editFormModalProps,
    },
  })
  //查看
  const viewFormModal = useFormModal({
    modal: {
      title: `${document.title}-查看`,
      width: 900,
      footer: null,
      onCancel: () => {
        viewFormModal.setVisible(false)
      },
      ...viewFormModalProps,
    },
  })
  // 表格
  const TableProps = {
    searchFields: [...renderSearchFields(columns)],
    initialValues,
    actionBtnProps: ActionBtnProps,
    otherTableProps: {
      columns,
      scroll: { x: 1300 },
      ...otherTableProps,
    },
    getTableData,
    deleteItems: remote,
    resetFormData,
    addFormModal,
    editFormModal,
    title,
    actionWidth,
    actionText,
    resetKey,
  }
  //传递出去的数据
  useImperativeHandle(
    ref,
    () => {
      return { editFormModal, viewFormModal, ...myRef.current }
    },
    [editFormModal]
  )

  return (
    <Table {...TableProps} ref={myRef}>
      {renderChildren ? (
        renderChildren(
          {
            ...addFormModal,
            formList: renderFormFields(columns, 'add'),
          },
          {
            ...editFormModal,
            formList: renderFormFields(columns, 'edit'),
          }
        )
      ) : (
        <>
          <Add
            {...{
              ...addFormModal,
              formList: renderFormFields(columns, 'add'),
              initialValues,
            }}
          />
          <Edit
            {...{
              ...editFormModal,
              formList: renderFormFields(columns, 'edit'),
            }}
          />
        </>
      )}
      <View
        {...{
          ...viewFormModal,
          formList: renderFormFields(columns, 'view'),
          viewMode: true,
        }}
      />
    </Table>
  )
})
