import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker, Select } from 'antd'
import {
  requestDistributorWithdrawList,
  requestUpdateDistributorWithdraw,
  exportDistributorWithdraw,
} from './action'
const { RangePicker } = DatePicker

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

  const updateSearch = useCallback((key, value) => {
    updatePageInfo(search => {
      search[key] = value
      return { ...search }
    })
  }, [])

  const export_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      //message.info('请先选择商品, 再导出数据');
      //            return ;
    }
    exportDistributorWithdraw(chooseItems)
    console.log('----开始批量导出-----', chooseItems)
  }, [chooseItems])
  const showOrderVoucher = useCallback(item => {
    setVisible(true)
    setModalInfo({ ...item })
  }, [])

  const pageData = useCallback(() => {
    let _pageInfo = { ...pageInfo }
    _pageInfo.page -= 1
    requestDistributorWithdrawList(_pageInfo).then(data => {
      if (!data) return
      setTableSize(data.totalElements)
      if (data && Array.isArray(data.content)) {
        updateSource([...data.content])
      }
    })
  }, [pageInfo])

  useEffect(() => {
    if (isInit) return
    pageData()
    setIsinit(true)
  }, [isInit, pageData])

  const [columns] = useState([
    { title: '微信ID', dataIndex: 'distributor_Wechat_Id' },
    { title: '手机号', dataIndex: 'phone' },
    { title: '申请时间', dataIndex: 'application_Date' },
    { title: '反馈时间', dataIndex: 'passion_Date' },
    { title: '可提现余额', dataIndex: 'avaliable_amount' },
    { title: '本次提现金额', dataIndex: 'withdrawal_Amount' },
    { title: '状态', dataIndex: 'withdraw_Status' },
    {
      title: '操作',
      dataIndex: 'name11',
      width: 150,
      render: (item, record) => (
        <div className="product-table-operations">
          {record.withdraw_Status === '申请中' && (
            <React.Fragment>
              <Button
                type="primary"
                onClick={() => {
                  requestUpdateDistributorWithdraw({
                    ids: record.distributor_Withdraw_Id,
                    withdraw_Status: '已同意',
                  }).then(pageData)
                }}
                size="small"
              >
                确定
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  requestUpdateDistributorWithdraw({
                    ids: record.distributor_Withdraw_Id,
                    withdraw_Status: '已驳回',
                  }).then(pageData)
                }}
                size="small"
              >
                驳回
              </Button>
            </React.Fragment>
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
            placeholder="请输入微信ID"
            onChange={e => updateSearch('wechatId', e.target.value)}
          />
        </div>
        <div className="manager-search-item">
          <div className="search-item__title">状态</div>
          <Select defaultValue="" onChange={value => updateSearch('status', value)}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="申请中">申请中</Select.Option>
            <Select.Option value="已同意">已同意</Select.Option>
            <Select.Option value="已驳回">已驳回</Select.Option>
          </Select>
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
        <Button onClick={export_data} type="primary">
          数据导出
        </Button>
      </section>
      <section className="product-manager-table">
        <Table
          rowKey="distributor_Withdraw_Id"
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
