import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd'
import { requestOrderList } from './action'
const { RangePicker } = DatePicker

export default function ProductManager() {
  const [isInit, setIsinit] = useState(false)
  const [dataSource, updateSource] = useState(null)
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)
  const [chooseItems, setChooseItems] = useState(null)
  const [search, setSearch] = useState({})

  const updateSearch = useCallback((key, value) => {
    setSearch(search => {
      search[key] = value
      return { ...search }
    })
  }, [])

  const startSearch = useCallback(() => {
    console.log('----开始筛选----', search)
  }, [search])

  const export_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      //message.info('请先选择商品, 再导出数据');
      //            return ;
    }
    console.log('----开始批量导出-----', chooseItems)
  }, [chooseItems])
  const showOrderVoucher = useCallback(item => {
    setVisible(true)
    setModalInfo({ ...item })
  }, [])

  const pageData = useCallback(() => {
    requestOrderList().then(data => {
      updateSource(source => {
        return [...(source || []), ...data.content]
      })
    })
  }, [])

  useEffect(() => {
    if (isInit) return
    pageData()
    setIsinit(true)
  }, [isInit, pageData])

  const [columns] = useState([
    { title: '着装顾问', dataIndex: 'customerame' },
    { title: '申请时间', dataIndex: 'customerPhone' },
    { title: '反馈时间', dataIndex: 'payment_Time' },
    { title: '可提现余额', dataIndex: 'name5', key: 'name1' },
    { title: '本次提现金额', dataIndex: 'volume_Name' },
    { title: '状态', dataIndex: 'shipment_Id' },
  ])

  return (
    <div className="product-manager">
      <section className="product-manager-search">
        <div className="manager-search-item">
          <div className="search-item__title">着装顾问姓名</div>
          <Input
            size="small"
            placeholder="请输入着装顾问姓名"
            onChange={e => updateSearch('customerame', e.target.value)}
          />
        </div>
        <div className="manager-search-item">
          <div className="search-item__title">状态</div>
          <Input
            size="small"
            placeholder="请输入状态"
            onChange={e => updateSearch('status', e.target.value)}
          />
        </div>
        <div className="manager-search-item">
          <div className="search-item__title">申请时间范围</div>
          <RangePicker
            onChange={(date, dateString) => {
              updateSearch('order_Status', dateString.join('-'))
            }}
          />
        </div>

        <div className="manager-search-btn">
          <Button onClick={startSearch} type="primary">
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
          rowKey="order_Id"
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
          title="商品编辑"
          visible={visible}
          width={1000}
          onOk={() => {}}
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
