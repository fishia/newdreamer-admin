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
  const [refundStatus, setRefundStatus] = useState('TO_BE_REFUND')
  const [record, setRecord] = useState({})
  const [statusCountObj, setStatusCountObj] = useState({})

  const getCount = useCallback(() => {
    orderInfoRemote.orderStatusCount().then(({ status, data }) => {
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
      width: 1400,
      onOk: params => {
        //TODO:退款接口
        return orderInfoRemote
          .saveOrUpdate({
            ...params,
          })
          .then(({ status }) => {
            if (status) {
              myRef.current?.refresh()
              message.success('备注成功')
            }
            return status
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
      return orderInfoRemote.page(params).then(({ data, status }) => {
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
      downloadURL: orderInfoRemote.exportExcel.bind(orderInfoRemote),
      exportCommonsFieds: { refundStatus },
    },
    otherTableProps: {
      rowKey: record => record.order_Id,
      otherActionBtns: (text, record) => {
        let btns = [],
          btn = {
            name: '备注',
            onClick() {
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
                  .cancelProduce({
                    ids: record.subOrderInfoDTOS
                      ? record.subOrderInfoDTOS.map(item => item.item_Id)
                      : [],
                  })
                  .then(({ status }) => {
                    if (status) {
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
                  .cancelProduce({
                    ids: record.subOrderInfoDTOS
                      ? record.subOrderInfoDTOS.map(item => item.item_Id)
                      : [],
                  })
                  .then(({ status }) => {
                    if (status) {
                      message.success('已驳回退款')
                      getCount()
                      ref.current?.submit()
                    }
                  })
                  .then(() => ref.current?.submit())
              },
            },
          }
        record.order_Status === '退款中' && btns.push(btn1, btn2)
        record.order_Status !== '退款中' && btns.push(btn)
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
