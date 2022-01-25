import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker, Popover } from 'antd'
import {
  requestEvaluateList,
  requestEvaluateDelete,
  requestEvaluateExport,
  requestOrderDetail,
} from './action'
import { exportFile } from '../../../assets/js/common'
const { RangePicker } = DatePicker

export default function OrderEvaluate() {
  const [isInit, setIsinit] = useState(false)
  const [pageInfo, updatePageInfo] = useState({
    page: 0,
    size: 10,
  })
  const [tableSize, setTableSize] = useState(0)
  const [dataSource, updateSource] = useState(null)
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)
  const [chooseItems, setChooseItems] = useState(null)

  const updateSearch = useCallback((key, value) => {
    updatePageInfo(info => {
      info[key] = value
      return { ...info }
    })
  }, [])

  const export_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      //message.info('请先选择商品, 再导出数据');
      //            return ;
    }

    // TODO 导出怎么传参数
    requestEvaluateExport(chooseItems)
  }, [chooseItems])

  const showOrderVoucher = useCallback(item => {
    setVisible(true)
    setModalInfo({ ...item })
  }, [])

  const pageData = useCallback(() => {
    requestEvaluateList(pageInfo).then(data => {
      if (!data) return
      setTableSize(data.totalElements)
      if (data && Array.isArray(data.content)) {
        updateSource([...data.content])
      }
    })
  }, [pageInfo])

  const _delete = useCallback(
    ids => {
      requestEvaluateDelete(ids)
        .then(() => {
          message.info('删除成功')
        })
        .then(pageData)
    },
    [pageData]
  )

  const delete_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      message.info('先选择要删除的评价')
      return
    }
    _delete(chooseItems)
  }, [_delete, chooseItems])
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

  useEffect(() => {
    if (isInit) return
    pageData()
    setIsinit(true)
  }, [isInit, pageData])
  const [ModalColumns] = useState([
    { title: '单品编号', dataIndex: 'item_Id' },
    { title: '商品', dataIndex: 'name' },
    { title: '条码', dataIndex: 'barcode' },
    { title: '颜色', dataIndex: 'style' },
    { title: '尺码', dataIndex: 'size' },
    { title: '数量', dataIndex: 'amounts' },
    { title: '单价', dataIndex: 'retail_Price' },
    { title: '折扣', dataIndex: 'discount' },
    {
      title: '折后价',
      render: (item, record) => <span>{record.received_Amount / record.amounts}</span>,
    },
    { title: '折后总金额', dataIndex: 'received_Amount' },
    { title: '状态', dataIndex: 'item_Status' },
  ])

  const [columns] = useState([
    { title: '单品编号', dataIndex: 'item_Id' },
    { title: '订单号', dataIndex: 'order_Id' },
    { title: '商品条码', dataIndex: 'productMain' },
    { title: '评价时间', dataIndex: 'evaluation_Time' },
    // { title: '微信id', dataIndex: 'customer_Wechat_Id',width: 100},
    { title: '尺寸', dataIndex: 'size' },
    { title: '面料', dataIndex: 'fabric' },
    { title: '做工', dataIndex: 'work' },
    { title: '物流', dataIndex: 'shipment' },
    { title: '星级', dataIndex: 'star' },
    {
      title: '评价内容',
      width: 200,
      dataIndex: 'evaluation_Content',
      render: (text, record) => (
        <Popover trigger="hover" content={text} title="Title">
          {text.substr(0, 10)}
        </Popover>
      ),
    },
    {
      title: '操作',
      dataIndex: 'name11',
      width: 150,
      render: (item, record) => (
        <div className="product-table-operations">
          <Button
            onClick={() => {
              requestOrderDetail({ orderId: record.order_Id }).then(data => {
                setVisible(true)
                setModalInfo(data)
              })
            }}
            type="primary"
            size="small"
          >
            订单
          </Button>
          <Button
            onClick={() => {
              _delete([record.evaluation_Id])
            }}
            type="primary"
            size="small"
          >
            删除
          </Button>
        </div>
      ),
    },
  ])
  // TODO 评价没有删除 和订单功能，导出 删除都没有

  return (
    <div className="product-manager">
      <section className="product-manager-search">
        <div className="manager-search-item">
          <div className="search-item__title">订单号</div>
          <Input
            size="small"
            placeholder="请输入订单号"
            onChange={e => updateSearch('orderId', e.target.value)}
          />
        </div>
        <div className="manager-search-item">
          <div className="search-item__title">时间范围</div>
          <RangePicker
            onChange={(date, dateString) => {
              updateSearch('startTime', dateString[0])
              updateSearch('endTime', dateString[1])
            }}
          />
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
        {/* <Button onClick={export_data} type="primary">
          数据导出
        </Button> */}
        <Button onClick={delete_data} type="primary">
          批量删除
        </Button>
      </section>
      <section className="product-manager-table">
        <Table
          rowKey="evaluation_Id"
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              setChooseItems((selectedRowKeys + '').split(',').filter(item => item))
            },
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            current: pageInfo.page + 1,
            total: tableSize,
            onChange: onPageChange,
          }}
        />
      </section>
      {modalInfo && (
        <Modal
          title="单品信息"
          visible={visible}
          width={1000}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <div className="pm-edit-container">
            <Table
              rowKey="order_Id"
              dataSource={modalInfo}
              columns={ModalColumns}
              pagination={false}
            />
          </div>
        </Modal>
      )}
    </div>
  )
}
