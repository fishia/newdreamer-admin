import React, { useRef, useState, useEffect, useCallback } from 'react'
import { message, Tabs, Badge } from 'antd'
import { orderInfoRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns } from './column'
import View from './components/view'
import styles from '@/pages/orderManage/components/index.less'
import { enumSuperset } from '@/utils/contants'
import useFormModal from '@/hooks/useFormModal'
import BindModal from './components/bindModal'
const TabPane = Tabs.TabPane

export default props => {
  const ref = useRef()
  const [orderStatus, setOrderStatus] = useState('TO_BE_PREPARED')
  const [record, setRecord] = useState({})
  const [visible, setVisible] = useState(false)
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
  // 详情
  const viewFormModal = {
    modalProps: {
      title: `${document.title}-${record.order_Id}`,
      width: 1400,
      visible,
      footer: null,
      onCancel: () => {
        setVisible(false)
        getCount()
        ref.current?.submit()
      },
    },
    record,
    formList: tableFields,
  }
  // 绑定
  const bindFormModal = useFormModal({
    modal: {
      title: `绑定数据`,
      width: 800,
      onOk: params => {
        return orderInfoRemote
          .bind({
            orderId: record.order_Id,
            ...params,
          })
          .then(({ status }) => {
            if (status) {
              ref.current?.submit()
              message.success('绑定成功')
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
        orderStatus,
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
    columns: [
      [
        '订单号',
        'order_Id',
        {
          render: (text, record) => (
            <span
              onClick={() => {
                //TODO:打开详情
                setRecord(record)
                setVisible(true)
              }}
              className="primaryBtn"
            >
              {text}
            </span>
          ),
          width: 260,
          fixed: 'left',
          filter: {
            isunions: true, //联合类型
          },
        },
      ],
      ...tableFields,
    ],
    parseColumns,
    actionBtnProps: {
      showAdd: false,
      showDelete: false,
      showEdit: false,
      showCopy: false,
      showExport: true,
      downloadURL: orderInfoRemote.exportExcel.bind(orderInfoRemote),
      exportCommonsFields: { orderStatus },
    },
    otherTableProps: {
      rowKey: record => record.order_Id,
      otherActionBtns: (text, record) => {
        let btns = [],
          btn = {
            name: '全部备货',
            popconfirm: {
              title: '是否确认全部备货？',
              confirm() {
                //TODO:全部备货
                orderInfoRemote
                  .produce({
                    ids: record.subOrderInfoDTOS
                      ? record.subOrderInfoDTOS.map(item => item.item_Id)
                      : [],
                  })
                  .then(({ status }) => {
                    if (status) {
                      message.success('已全部备货')
                      getCount()
                      ref.current?.submit()
                    }
                  })
              },
            },
          },
          btn1 = {
            name: '全部撤销',
            popconfirm: {
              title: '是否确认全部撤销？',
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
                      message.success('已全部撤销')
                      getCount()
                      ref.current?.submit()
                    }
                  })
                  .then(() => ref.current?.submit())
              },
            },
          },
          btn2 = {
            name: '绑定',
            onClick() {
              setRecord(record)
              bindFormModal.setFormData({
                saleAdvisorId: record.saleAdvisorId,
                volumeId: record.subOrderInfoDTOS[0]?.volume_Id,
              })
              bindFormModal.setVisible(true)
            },
          }
        record.order_Status === '待备货' && btns.push(btn2, btn)
        record.order_Status === '待发货' && btns.push(btn1)
        return btns
      },
    },
    renderChildren: () => <View {...viewFormModal} />,
  }

  return (
    <div className={styles.normal}>
      <Tabs activeKey={orderStatus} onChange={key => setOrderStatus(key)} tabBarGutter={60}>
        {enumSuperset['orderStatus'].map(item => (
          <TabPane
            key={item.value}
            tab={
              <Badge
                count={
                  ['待备货', '待发货'].indexOf(item.label) > -1 ? statusCountObj[item.value] : 0
                }
              >
                {item.label}
              </Badge>
            }
          >
            {item.value === orderStatus ? <FormTable {...FormTableProps} ref={ref} /> : null}
          </TabPane>
        ))}
      </Tabs>
      {bindFormModal.modalProps.visible && <BindModal {...bindFormModal} />}
    </div>
  )
}
