import React, { useRef, useState } from 'react'
import { message } from 'antd'
import { orderInfoRemote } from '@/services/baseRemote'
import FormTable from '@/components/custom/table/formTable'
import { tableFields, parseColumns } from './column'
import View from './components/view'

export default props => {
  const ref = useRef()
  const [record, setRecord] = useState({})
  const [visible, setVisible] = useState(false)
  // 详情
  const viewFormModal = {
    modalProps: {
      title: `${document.title}-${record.order_Id}`,
      width: 1200,
      visible,
      footer: null,
      onCancel: () => {
        setVisible(false)
      },
    },
    record,
    formList: tableFields,
  }
  //列表
  const FormTableProps = {
    remote: orderInfoRemote,
    getTableData: ({ current, pageSize }, formData) => {
      let params = {
        page: current - 1,
        size: pageSize,
        ...formData,
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
          width: 200,
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
    },
    otherTableProps: {
      rowKey: record => record.order_Id,
      otherActionBtns: (text, record) => {
        return [
          {
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
                      ref.current?.submit()
                    }
                  })
              },
            },
          },
          {
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
                      ref.current?.submit()
                    }
                  })
                  .then(() => ref.current?.submit())
              },
            },
          },
        ]
      },
    },
    renderChildren: () => <View {...viewFormModal} />,
  }

  return <FormTable {...FormTableProps} ref={ref} />
}
