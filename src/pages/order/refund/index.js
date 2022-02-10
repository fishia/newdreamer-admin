import React, { useRef, useState, useEffect, useCallback } from 'react'
import { message, Tabs, Badge } from 'antd'
import { orderInfoRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns } from './column'
import styles from '@/pages/orderManage/components/index.less'
import { enumSuperset } from '@/utils/contants'
import useFormModal from '@/hooks/useFormModal'
import MemoModal from './components/memoModal'
const TabPane = Tabs.TabPane

export default props => {
  const ref = useRef()
  const [refundStatus, setRefundStatus] = useState('REFUNDING')
  const [statusCountObj, setStatusCountObj] = useState({})

  const getCount = useCallback(() => {
    orderInfoRemote.refundStatusCount().then(({ status, data }) => {
      if (status) {
        setStatusCountObj(data)
      }
    })
  }, [])
  useEffect(() => {
    getCount()
  }, [getCount])

  // 备注
  const memoModal = useFormModal({
    modal: {
      title: `退款备注`,
      width: 700,
      onOk: params => {
        //TODO:退款备注
        return orderInfoRemote
          .refundRemark({
            ...params,
          })
          .then(({ success }) => {
            if (success) {
              ref.current?.submit()
              message.success('备注成功')
            } else {
              message.warning('备注失败')
            }
            return success
          })
      },
    },
  })
  //列表
  const FormTableProps = {
    remote: orderInfoRemote,
    getTableData: ({ current, pageSize }, formData) => {
      let params = {
        page: current - 1,
        size: pageSize,
        ...formData,
        refundStatus,
      }
      return orderInfoRemote.refundPage(params).then(({ data, status }) => {
        if (status) {
          return {
            total: data.totalElements,
            list: data.content.map(item => ({
              ...parseColumns(item),
              key: item.order_Id,
            })),
          }
        }
      })
    },
    columns: tableFields,
    parseColumns,
    actionBtnProps: {
      showAdd: false,
      showDelete: false,
      showEdit: false,
      showCopy: false,
      showExport: true,
      downloadURL: orderInfoRemote.exportRefund.bind(orderInfoRemote),
      exportCommonsFields: { refundStatus },
    },
    otherTableProps: {
      rowKey: record => record.item_Id,
      otherActionBtns: (text, record) => {
        let btns = [],
          btn = {
            name: '备注',
            onClick() {
              memoModal.setFormData({
                item_Id: record.item_Id,
                refundRemark: record.refundRemark,
              })
              memoModal.setVisible(true)
            },
          },
          btn1 = {
            name: '同意',
            popconfirm: {
              title: '是否确认同意？',
              confirm() {
                //TODO:全部撤销
                orderInfoRemote
                  .refundAudit({
                    item_Id: record.item_Id,
                    orderId: record.order_Id,
                    agree: true,
                  })
                  .then(({ success }) => {
                    if (success) {
                      message.success('已同意退款')
                      getCount()
                      ref.current?.submit()
                    }
                  })
                  .then(() => ref.current?.submit())
              },
            },
          },
          btn2 = {
            name: '驳回',
            popconfirm: {
              title: '是否确认驳回？',
              confirm() {
                //TODO:全部撤销
                orderInfoRemote
                  .refundAudit({
                    item_Id: record.item_Id,
                    orderId: record.order_Id,
                    agree: false,
                  })
                  .then(({ success }) => {
                    if (success) {
                      message.success('已驳回退款')
                      getCount()
                      ref.current?.submit()
                    }
                  })
                  .then(() => ref.current?.submit())
              },
            },
          },
          btn3 = {
            name: '撤销退款',
            popconfirm: {
              title: '是否确认撤销退款？',
              confirm() {
                //TODO:退款
                orderInfoRemote
                  .refundCancel({
                    item_Id: record.item_Id,
                    orderId: record.order_Id,
                  })
                  .then(({ status, data }) => {
                    if (status) {
                      message.success('撤销退款成功')
                      ref.current?.submit()
                    }
                  })
              },
            },
          }
        record.refund_Status === 'REFUNDING' && btns.push(btn1, btn2)
        record.refund_Status !== 'REFUNDING' && btns.push(btn)
        record.refund_Status === 'REFUNDED' && btns.push(btn3)
        return btns
      },
    },
  }

  return (
    <div className={styles.normal}>
      <Tabs activeKey={refundStatus} onChange={key => setRefundStatus(key)} tabBarGutter={60}>
        {enumSuperset['refundStatus'].map(item => (
          <TabPane
            key={item.value}
            tab={
              <Badge count={['退款中'].indexOf(item.label) > -1 ? statusCountObj[item.value] : 0}>
                {item.label}
              </Badge>
            }
          >
            {item.value === refundStatus ? <FormTable {...FormTableProps} ref={ref} /> : null}
          </TabPane>
        ))}
      </Tabs>
      {memoModal.modalProps.visible && <MemoModal {...memoModal} />}
    </div>
  )
}
