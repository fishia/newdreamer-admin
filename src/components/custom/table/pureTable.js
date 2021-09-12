/* table增删改查纯组件 */ /**
 * permissions:
 *  Add : 新增
 *  View  : 查看
 *  Edit  : 编辑
 */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { VtxDatagrid, VtxPageLayout } from '@vtx/components'
import useFormModal from '@/hooks/useFormModal'
import { renderColumns, renderFormFields } from '@/utils/util'
import ActionBtns from '@/components/custom/actionBtns'
import Add from '../modal/formModal'
import Edit from '../modal/formModal'
import View from '../modal/formModal'

const { Page, Content, TableWrap } = VtxPageLayout

function Table(props, ref) {
  const {
    otherTableProps,
    actionBtnProps = {
      showAdd: true,
      showEdit: true,
      showCopy: true,
      showDelete: true,
    },
    actionText = '操作',
    actionWidth = 180,
    addFormModalProps,
    editFormModalProps,
    viewFormModalProps,
    parseFormData = item => item,
    onChange,
    initialValues,
    title,
    renderChildren,
    resetKey = 'code',
    resetFormData,
  } = props
  const { columns, dataSource } = otherTableProps
  const { showAdd, showEdit, showCopy, showDelete } = actionBtnProps
  const [tableData, setTableData] = useState(dataSource)
  const [record, setRecord] = useState({})
  useEffect(() => {
    setTableData(dataSource)
  }, [dataSource])

  // 表格列
  const Columns = renderColumns([
    ...columns,
    [
      actionText,
      'action',
      {
        width: actionWidth,
        fixed: 'right',
        display: showAdd || showDelete || showCopy,
        renderButtons(text, record, index) {
          let btns = [
            {
              name: '编辑',
              onClick() {
                editFormModal.setFormData({
                  ...record,
                  key: index,
                })
                editFormModal.setVisible(true)
                setRecord({ ...record, key: index })
              },
              visible: showEdit,
            },
            {
              name: '移除',
              popconfirm: {
                title: '是否确认移除？',
                confirm() {
                  let newArr = [...tableData]
                  newArr.splice(index, 1)
                  setTableData([...newArr])
                  onChange([...newArr])
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
              },
              visible: showCopy,
            },
          ]
          return btns
        },
      },
    ],
  ])
  // 新增
  const addFormModal = useFormModal({
    modal: {
      title: `${title}-新增`,
      width: 1000,
      onOk: params => {
        //不受接口控制，需要保存每条数据的唯一key,key前端使用
        let newArr = [...tableData]
        newArr.push({ ...parseFormData(params), key: tableData.length })
        setTableData([...newArr])
        onChange([...newArr])
        addFormModal.setVisible(false)
      },
      ...addFormModalProps,
    },
  })

  // 编辑
  const editFormModal = useFormModal({
    modal: {
      title: `${title}-编辑`,
      width: 1000,
      onOk: params => {
        let newArr = tableData.map(item => {
          if (item.key === record.key) {
            return {
              id: record.id,
              ...parseFormData(params),
            }
          } else {
            return {
              ...parseFormData(item),
            }
          }
        })
        setTableData([...newArr])
        onChange([...newArr])
        editFormModal.setVisible(false)
      },
      ...editFormModalProps,
    },
  })

  //查看
  const viewFormModal = useFormModal({
    modal: {
      title: `${title}-查看`,
      width: 1000,
      footer: null,
      onCancel: () => {
        viewFormModal.setVisible(false)
      },
      ...viewFormModalProps,
    },
  })
  //操作栏props
  const ActionBtnsProps = {
    showAdd,
    addProps: {
      formModal: addFormModal,
    },
  }

  //传递出去的数据
  useImperativeHandle(
    ref,
    () => ({
      dataSource,
      record,
      viewFormModal,
    }),
    [record]
  )

  return (
    <React.Fragment>
      <Page title={title}>
        <Content top={0}>
          <TableWrap>
            <VtxDatagrid
              rowKey={record => record.key}
              indexColumn={false}
              //toolbar={false}
              pagination={false}
              rowSelection={null}
              {...otherTableProps}
              columns={Columns}
              buttonGroup={<ActionBtns {...ActionBtnsProps} />}
            />
          </TableWrap>
        </Content>
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
      </Page>
    </React.Fragment>
  )
}

export default forwardRef(Table)
