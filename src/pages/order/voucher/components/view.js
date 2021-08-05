import { useEffect, useState } from 'react'
import u from 'updeep'
import { VtxModal } from '@vtx/components'
import { Descriptions, Statistic, message } from 'antd'
import { childrenTableFields } from '../column'
import FormTable from '@/components/custom/table/formTable'
import { orderInfoRemote } from '@/services/baseRemote'
import styles from './index.less'

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
    actionWidth: 120,
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
                            [i]: { ...data[0], item_Status: '已备货' },
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
            name: '撤销',
            popconfirm: {
              title: '是否确认撤销？',
              confirm() {
                //TODO:撤销
                orderInfoRemote
                  .cancelProduce({
                    ids: [record.item_Id],
                  })
                  .then(({ status, data }) => {
                    if (status) {
                      message.success('已撤销')
                      setSubOrder(
                        u(
                          {
                            [i]: { ...data[0], item_Status: '已撤销' },
                          },
                          subOrder
                        )
                      )
                    }
                  })
              },
            },
          }
        record.item_Status === '待备货' && btns.push(btn)
        record.item_Status === '待发货' && btns.push(btn1)
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
          title="总金额:"
          value={record.total_Received_Amount || 0}
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic
          title="折扣:"
          value={record.total_Received_Amount || 0 - record.total_Received_Amount || 0}
          valueStyle={{ fontSize: '14px' }}
        />
        <Statistic
          title="实收总金额:"
          value={record.total_Received_Amount || 0}
          valueStyle={{ fontSize: '14px' }}
        />
      </div>
    </VtxModal>
  )
}
