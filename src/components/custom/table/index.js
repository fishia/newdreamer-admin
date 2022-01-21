/**
 * permissions:
 *  Add : 新增
 *  View  : 查看
 *  Edit  : 编辑
 */
import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { VtxDatagrid, VtxPageLayout } from '@vtx/components'
import { message, Form } from 'antd'
import { renderColumns } from '@/utils/util'
import useFormTable from '@/hooks/useFormTable'
import useDeleteRows from '@/hooks/useDeleteRows'
import ActionBtns from '@/components/custom/actionBtns'
import SearchCondition from '@/components/custom/searchCondition'

const { Page, Content, TableWrap } = VtxPageLayout

function Table(props, ref) {
  const {
    searchFields = [],
    otherTableProps,
    getTableData,
    addFormModal,
    editFormModal,
    deleteItems,
    actionBtnProps = {},
    children,
    top = 35,
    title,
    actionText = '操作',
    actionWidth = 180,
    initialValues,
    resetKey = 'code',
    resetFormData,
  } = props
  const { columns = [] } = otherTableProps

  const {
    showAdd,
    showEdit,
    showCopy,
    showDelete,
    showImport,
    showExport,
    templateURL,
    uploadURL,
    downloadURL,
    exportCommonsFieds,
  } = actionBtnProps
  const [form] = Form.useForm()
  const myref = useRef()
  const [record, setRecord] = useState({})
  //格式化筛选条件，联合类型需要拆分
  const renderFormData = formData => {
    if ('unions' in formData && formData.unions) {
      formData = Object.assign(
        formData,
        Object.keys(formData.unions).reduce(
          (o, cur) => Object.assign(o, { [cur]: formData.unions[cur] }),
          {}
        )
      )
      delete formData.unions
    }
    return formData
  }
  const { search, refresh, run, params, tableProps, selectedRowKeys } = useFormTable(
    ({ current, pageSize }, formData) =>
      getTableData({ current, pageSize }, renderFormData(formData)),
    {
      form,
    }
  )
  const { submit, reset } = search

  const showOtherBtns =
    'otherActionBtns' in otherTableProps && typeof otherTableProps.otherActionBtns === 'function'

  // 删除
  const {
    pagination: { current, pageSize, total },
    dataSource,
  } = tableProps
  //删除hooks实例
  const deleteRows = useDeleteRows(
    ids => {
      return deleteItems(ids).then(({ status }) => {
        status && message.success('删除成功')
        return status
      })
    },
    {
      current: current || 1,
      pageSize: pageSize || 10,
      total: total || 0,
      formData: params[1],
      fetch: run,
    }
  )
  //筛选条件
  const SearchConditionProps = {
    searchFields: [
      ...searchFields,
      {
        span: 4,
      },
    ],
    submit,
    reset,
    form,
    initialValues,
  }
  //操作栏props
  const ActionBtnsProps = {
    ...actionBtnProps,
    addProps: {
      formModal: addFormModal,
    },
    deleteProps: {
      deleteRows,
      selectedRowKeys,
    },
    importProps: {
      templateURL,
      uploadURL,
      refresh,
    },
    exportProps: {
      downloadURL,
      selectedRowKeys,
      dataSource,
      exportCommonsFieds,
    },
  }
  //传递出去的数据
  useImperativeHandle(
    ref,
    () => ({
      tableProps,
      refresh,
      record,
      submit,
    }),
    [record]
  )
  let Cols = renderColumns([
    ...columns,
    [
      actionText,
      'action',
      {
        width: actionWidth,
        fixed: 'right',
        display: showAdd || showDelete || showCopy || showOtherBtns,
        renderButtons(text, record, index) {
          let btns = [
            {
              name: '编辑',
              onClick() {
                editFormModal.setFormData({
                  ...record,
                })
                editFormModal.setVisible(true)
                setRecord(record)
              },
              visible: showEdit,
            },
            {
              name: '删除',
              popconfirm: {
                title: '是否确认删除？',
                confirm() {
                  deleteRows.run([record.id])
                },
              },
              visible: showDelete,
            },
            {
              name: '复制',
              onClick() {
                let obj =
                  typeof resetFormData === 'function'
                    ? props.resetFormData({
                        ...record,
                        [resetKey]: undefined,
                        id: undefined,
                      })
                    : {
                        ...record,
                        [resetKey]: undefined,
                        id: undefined,
                      }
                addFormModal.setFormData({
                  ...obj,
                })
                addFormModal.setVisible(true)
                setRecord({
                  ...obj,
                })
              },
              visible: showCopy,
            },
          ]
          if (showOtherBtns)
            btns = btns.concat(otherTableProps.otherActionBtns(text, record, index))
          return btns
        },
        renderButtonsVisibleNum: otherTableProps.renderButtonsVisibleNum || 5, //最多展示5个
      },
    ],
  ])
  return (
    <React.Fragment>
      <Page title={title}>
        {searchFields.length ? (
          <SearchCondition
            {...SearchConditionProps}
            ref={myref}
            style={
              showAdd || showDelete || showExport || showImport
                ? null
                : { width: 'calc(100% - 200px)' }
            }
          />
        ) : null}
        <Content
          top={
            searchFields.length
              ? showAdd || showDelete || showExport || showImport
                ? top
                : -10
              : 0
          }
        >
          <TableWrap>
            <VtxDatagrid
              rowKey={record => record.id || record.key}
              indexColumn={false}
              toolbarTilte=""
              {...tableProps}
              {...{
                ...otherTableProps,
                rowSelection: !(showDelete || showExport) ? null : tableProps.rowSelection,
              }}
              columns={Cols}
              defaultVisibleColumnKeys={Cols.filter(item => !item.autoHide).map(
                item => item.dataIndex || item.key
              )}
              onRefresh={refresh}
              buttonGroup={<ActionBtns {...ActionBtnsProps} />}
            />
          </TableWrap>
        </Content>
        {/*新增*/}
        {children}
      </Page>
    </React.Fragment>
  )
}

export default forwardRef(Table)
