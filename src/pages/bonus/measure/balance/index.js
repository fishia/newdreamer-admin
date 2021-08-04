import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd'
import { requestPageVolumerRewardDetail } from './action'
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
    console.log('----开始批量导出-----', chooseItems)
  }, [chooseItems])
  const showOrderVoucher = useCallback(item => {
    setVisible(true)
    setModalInfo({ ...item })
  }, [])

  const pageData = useCallback(() => {
    const _pageInfo = { ...pageInfo }
    _pageInfo.page -= 1
    requestPageVolumerRewardDetail(_pageInfo).then(data => {
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
    { title: '着装顾问', dataIndex: 'volumer_Name' },
    // { title: '所属高校', dataIndex: 'customerPhone'},
    // { title: '累计量体人数', dataIndex: 'payment_Time'},
    { title: '累计奖励金额', dataIndex: 'deduction_Fee' },
    { title: '累计提现金额', dataIndex: 'withdrawal_Amount' },
    { title: '可提现余额', dataIndex: 'avaliable_Withdrawal_Amount' },
    // { title: '用户评价', dataIndex: 'remarks'},
  ])

  return (
    <div className="product-manager">
      <section className="product-manager-search">
        <div className="manager-search-item">
          <div className="search-item__title">着装顾问姓名</div>
          <Input
            size="small"
            placeholder="请输入着装顾问"
            onChange={e => updateSearch('name', e.target.value)}
          />
        </div>
        <div className="manager-search-btn">
          <Button onClick={pageData} type="primary">
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
          rowKey="volumer_Id"
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
