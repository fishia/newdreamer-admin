import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker, Select } from 'antd'
import {
  requestOrderRefundList,
  requestRefundExport,
  requestRefundStatusUpdate,
  requestRefundOperation,
} from './action'
const { RangePicker } = DatePicker

const { confirm } = Modal

/**
 * TODO: 退款用退款状态搜索还是订单号和时间
 */
export default function OrderRefund() {
  const [isInit, setIsinit] = useState(false)
  const [dataSource, updateSource] = useState(null)
  const [pageInfo, updatePageInfo] = useState({
    page: 1,
    size: 10,
  })
  const [tableSize, setTableSize] = useState(0)
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)
  const [chooseItems, setChooseItems] = useState(null)

  const updateSearch = useCallback((key, value) => {
    updatePageInfo(search => {
      search[key] = value
      return { ...search }
    })
  }, [])

  // TODO: 缺少退款订单导出
  const export_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      message.info('请先选择, 再导出数据')
      return
    }
    requestRefundExport(chooseItems)
  }, [chooseItems])

  const showOrderVoucher = useCallback(item => {
    setVisible(true)
    setModalInfo({ ...item })
  }, [])

  const pageData = useCallback(() => {
    let _pageInfo = { ...pageInfo }
    _pageInfo.page -= 1
    requestOrderRefundList(_pageInfo).then(data => {
      if (!data) return
      setTableSize(data.totalElements)
      if (data && Array.isArray(data.content)) {
        updateSource([...data.content])
      }
    })
  }, [pageInfo])

  const updateRefundStatue = useCallback(
    (item, status) => {
      confirm({
        title: '驳回确认',
        content: '是否驳回退款',
        onOk: () => {
          requestRefundStatusUpdate({
            itemId: item.item_Id,
            status: '已驳回', // TODO 这个status枚举是什么
          })
            .then(() => message.info('已驳回'))
            .then(pageData)
        },
      })
    },
    [pageData]
  )

  const onPageChange = useCallback(
    page => {
      if (page !== pageInfo.page) {
        pageInfo.page = page
        updatePageInfo({ ...pageInfo })
        pageData()
      }
    },
    [pageData, pageInfo]
  )

  const authority = useCallback(
    (record, status) => {
      confirm({
        title: '退款确认',
        content: '再次确认退款',
        onOk: () => {
          requestRefundOperation({
            OrderId: record.order_Id,
            ItemId: record.item_Id,
            refundRemark: '',
          })
            .then(() => message.info('已同意退款'))
            .then(pageData)
        },
      })
    },
    [pageData]
  )

  useEffect(() => {
    if (isInit) return
    pageData()
    setIsinit(true)
  }, [isInit, pageData])

  const [columns] = useState([
    { title: '单品编号', dataIndex: 'item_Id' },
    {
      title: '订单号',
      dataIndex: 'order_Id',
      render: (text, record) => (
        <span onClick={() => showOrderVoucher(record)} style={{ color: '#468EFE' }}>
          {text}
        </span>
      ),
    },
    { title: '单品状态', dataIndex: 'item_Status' },
    { title: '申请时间', dataIndex: 'application_Time' },
    { title: '审核时间', dataIndex: 'passion_Time' },
    { title: '退款商品', dataIndex: 'barcode', width: 100 },
    { title: '退款金额', dataIndex: 'received_Amount', key: 'name1' },
    { title: '退款状态', dataIndex: 'refund_Status' },
    {
      title: '操作',
      dataIndex: 'name11',
      width: 150,
      render: (item, record) => (
        <div className="product-table-operations">
          {record.refund_Status === '退款中' && (
            <Button onClick={() => authority(record, 'agree')} type="primary" size="small">
              同意
            </Button>
          )}
          {record.refund_Status === '退款中' && (
            <Button
              onClick={() => {
                updateRefundStatue(record, false)
              }}
              type="primary"
              size="small"
            >
              驳回
            </Button>
          )}
        </div>
      ),
    },
  ])

  return (
    <div className="product-manager">
      <section className="product-manager-search">
        <div className="manager-search-item">
          <div className="search-item__title">订单号</div>
          <Input
            size="small"
            placeholder="请输入订单号"
            onChange={e => updateSearch('order_Id', e.target.value)}
          />
        </div>
        <div className="manager-search-item">
          <div className="search-item__title">时间范围</div>
          <RangePicker
            onChange={(date, dateString) => {
              updateSearch('order_Status', dateString.join('-'))
            }}
          />
        </div>
        <div className="manager-search-item">
          <div className="search-item__title">状态</div>
          <Select
            defaultValue=""
            style={{ width: 200 }}
            onChange={value => updateSearch('status', value)}
          >
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="退款中">退款中</Select.Option>
            <Select.Option value="已驳回">已驳回</Select.Option>
            <Select.Option value="已退款">已退款</Select.Option>
          </Select>
        </div>

        <div className="manager-search-btn">
          <Button
            onClick={() => {
              updatePageInfo({ ...pageInfo, page: 1 })
              setIsinit(false)
            }}
            type="primary"
          >
            筛选
          </Button>
        </div>
      </section>
      <section className="product-manager-operation">
        <Button onClick={export_data} type="primary">
          数据导出
        </Button>
      </section>
      <section className="product-manager-table">
        <Table
          rowKey="item_Id"
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              setChooseItems((selectedRowKeys + '').split(',').filter(item => item))
            },
          }}
          dataSource={dataSource}
          columns={columns}
        />
      </section>
      {modalInfo && (
        <Modal
          title="商品信息"
          visible={visible}
          width={1000}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <div className="pm-edit-container">
            {columns.map(col => (
              <div className="pm-edit-item">
                <span className="edit-item__title">{col.title}</span>
                <span className="edit-item__value">{modalInfo[col.dataIndex]}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}
