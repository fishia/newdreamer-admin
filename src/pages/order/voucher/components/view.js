import { useEffect, useState } from 'react'
import u from 'updeep'
import { VtxModal } from '@vtx/components'
import { Descriptions, Statistic, message } from 'antd'
import { childrenTableFields } from '../column'
import FormTable from '@/components/custom/table/formTable'
import { orderInfoRemote } from '@/services/baseRemote'
import styles from './index.less'
import { JKUtil } from '@/utils/util'

export default props => {
  const { modalProps, record, formList } = props
  const [subOrder, setSubOrder] = useState([])
  useEffect(() => {
    setSubOrder(record.subOrderInfoDTOS)
  }, [record.subOrderInfoDTOS])
  const FormTableProps = {
    columns: childrenTableFields(record.customerName, record.order_Id),
    actionBtnProps: {
      showAdd: false,
      showDelete: false,
      showEdit: false,
      showCopy: false,
    },
    actionWidth: 180,
    otherTableProps: {
      dataSource: subOrder,
      rowKey: record => record.item_Id,
      otherActionBtns: (text, record, i) => {
        let btns = [],
          btn = {
            name: '备货',
            popconfirm: {
              title: '是否确认备货？',
              confirm() {
                //TODO:备货
                orderInfoRemote
                  .produce({
                    ids: [record.item_Id],
                  })
                  .then(({ status, data }) => {
                    if (status) {
                      message.success('已备货')
                      setSubOrder(
                        u(
                          {
                            [i]: { ...data[0] },
                          },
                          subOrder
                        )
                      )
                    }
                  })
              },
            },
          },
          btn1 = {
            name: '撤销备货',
            popconfirm: {
              title: '是否确认撤销备货？',
              confirm() {
                //TODO:撤销备货
                orderInfoRemote
                  .cancelProduce({
                    ids: [record.item_Id],
                  })
                  .then(({ status, data }) => {
                    if (status) {
                      message.success('已撤销备货')
                      setSubOrder(
                        u(
                          {
                            [i]: { ...data[0] },
                          },
                          subOrder
                        )
                      )
                    }
                  })
              },
            },
          },
          btn2 = {
            name: '退款',
            style: { color: 'red' },
            popconfirm: {
              title: '是否确认退款？',
              confirm() {
                //TODO:退款
                orderInfoRemote
                  .refundApply({
                    item_Id: record.item_Id,
                  })
                  .then(({ status, data }) => {
                    if (status) {
                      message.success('发起退款成功')
                      setSubOrder(
                        u(
                          {
                            [i]: { ...data },
                          },
                          subOrder
                        )
                      )
                    }
                  })
              },
            },
          },
          btn3 = {
            name: '撤销退款',
            style: { color: 'red' },
            popconfirm: {
              title: '是否确认撤销退款？',
              confirm() {
                //TODO:退款
                orderInfoRemote
                  .refundCancel({
                    item_Id: record.item_Id,
                  })
                  .then(({ status, data }) => {
                    if (status) {
                      message.success('撤销退款成功')
                      setSubOrder(
                        u(
                          {
                            [i]: { ...data },
                          },
                          subOrder
                        )
                      )
                    }
                  })
              },
            },
          }
        //备货：已驳回或者没有退款状态时且订单状态为待备货展示
        record.itemStatusName === '待备货' &&
          (!record.refund_Status || record.refund_Status === 'REJECT') &&
          btns.push(btn)
        //撤销备货:待发货展示撤销备货
        record.itemStatusName === '待发货' && btns.push(btn1)
        //退款：无退款状态或者已驳回都显示
        ;(record.refund_Status === 'REJECT' || !record.refund_Status) && btns.push(btn2)
        //撤销退款：只有在退款中时候显示，
        record.refund_Status === 'REFUNDING' && btns.push(btn3)
        return btns
      },
      toolbar: false,
      pagination: false,
    },
  }
  return (
    <VtxModal {...modalProps} moveable maximize cancelText="关闭">
      <Descriptions title="基本信息">
        {formList.map((item, i) => (
          <Descriptions.Item label={item[0]} key={i}>
            {record[item[1]]}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <div className={styles.tableWrapper}>
        <FormTable {...FormTableProps} />
      </div>
      <div className={styles.total}>
        <Statistic
          title="商品金额:"
          value={record.total_Original_Price || 0}
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic
          title="优惠券:"
          value={record.totalDiscountAmount || 0}
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic
          title="折扣:"
          value={record.manualDiscountAmount || 0}
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic
          title="其他费用:"
          value={record.otherFees || 0}
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic
          title="实际支付:"
          value={record.total_Received_Amount || 0}
          valueStyle={{ fontSize: '14px' }}
        />
      </div>
    </VtxModal>
  )
}
