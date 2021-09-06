import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd'
import {
  requestDistributionRewardList,
  requestDistributionRewardExport,
  requestBonusSettingCancel,
} from './action'
const { RangePicker } = DatePicker

// 分销没有数据， model也不对
export default function ProductManager() {
  const [isInit, setIsinit] = useState(false)
  const [pageInfo, updatePageInfo] = useState({
    page: 1,
    size: 10,
  })
  const [tableSize, setTableSize] = useState(0)
  const [dataSource, updateSource] = useState(null)
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)
  const [chooseItems, setChooseItems] = useState(null)
  const [search, setSearch] = useState({})

  const updateSearch = useCallback((key, value) => {
    updatePageInfo(search => {
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
    requestDistributionRewardExport(chooseItems)
  }, [chooseItems])
  const showOrderVoucher = useCallback(item => {
    setVisible(true)
    setModalInfo({ ...item })
  }, [])

  const pageData = useCallback(() => {
    let _pageInfo = { ...pageInfo }
    _pageInfo.page -= 1
    requestDistributionRewardList(_pageInfo).then(data => {
      if (!data) return
      setTableSize(data.totalElements)
      updateSource(data.content)
    })
  }, [pageInfo])
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
  const [columns] = useState([
    { title: '微信ID', dataIndex: 'distributor_Wechat_Id' },
    { title: '单品编号', dataIndex: 'item_Id', width: 100 },
    { title: '销售金额', dataIndex: 'received_Amount' },
    // { title: '下单时间', dataIndex: 'volume_Name'},
    { title: '订单号', dataIndex: 'order_Id' },
    { title: '单品状态', dataIndex: 'item_Status', width: 80 },
    { title: '分销奖励', dataIndex: 'reward_Price', width: 80 },
    {
      title: '操作',
      dataIndex: 'name11',
      width: 150,
      render: (item, record) => (
        <div className="product-table-operations">
          {record.status !== '已撤销' && (
            <Button
              onClick={() => {
                requestBonusSettingCancel(record.distributor_Reward_Id).then(pageData)
              }}
              type="primary"
              size="small"
            >
              撤销
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
          <div className="search-item__title">微信ID</div>
          <Input
            size="small"
            placeholder="请输入微信id"
            onChange={e => updateSearch('distributor_Wechat_Id', e.target.value)}
          />
        </div>
        <div className="manager-search-item">
          <div className="search-item__title">订单号</div>
          <Input
            size="small"
            placeholder="请输入订单号"
            onChange={e => updateSearch('orderId', e.target.value)}
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
          pagination={{
            current: pageInfo.page,
            total: tableSize,
            onChange: onPageChange,
          }}
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
