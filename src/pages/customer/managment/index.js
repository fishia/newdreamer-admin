import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd'
import { requestOrderList, requestOrderExport } from './action'
import { UnionSelect } from '@/components/custom/select'
const { RangePicker } = DatePicker

export default function ProductManager() {
  const [isInit, setIsinit] = useState(false)
  const [pageInfo, updatePageInfo] = useState({
    page: 1,
    size: 10,
    name: '',
    phone: '',
    customer_Wechat_Name: '',
  })
  const [tableSize, setTableSize] = useState(0)
  const [dataSource, updateSource] = useState(null)
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)
  const [chooseItems, setChooseItems] = useState(null)

  const updateSearch = useCallback((key, value) => {
    updatePageInfo(info => {
      info[key] = value
      return { [key]: value, page: info.page, size: info.size }
    })
  }, [])

  const export_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      //message.info('请先选择商品, 再导出数据');
      //            return ;
    }
    requestOrderExport(chooseItems)
    console.log('----开始批量导出-----', chooseItems)
  }, [chooseItems])
  const showOrderVoucher = useCallback(item => {
    setVisible(true)
    setModalInfo({ ...item })
  }, [])

  const pageData = useCallback(() => {
    let _pageInfo = { ...pageInfo }
    _pageInfo.page -= 1
    requestOrderList(_pageInfo).then(data => {
      if (!data) return
      setTableSize(data.totalElements)
      if (data && Array.isArray(data.content)) {
        updateSource([...data.content])
      }
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
    { title: '客户编号', dataIndex: 'customer_Wechat_Id' },
    { title: '客户名称', dataIndex: 'customer_Wechat_Name' },
    { title: '客户姓名', dataIndex: 'name' },
    { title: '手机号', dataIndex: 'phone' },
    { title: '性别', dataIndex: 'gender' },
    { title: '购买次数', dataIndex: 'purchase_Count', render: item => item || 0 },
    { title: '累计消费', dataIndex: 'total_Consumption' },
  ])

  return (
    <div className="product-manager">
      <section className="product-manager-search">
        <div className="manager-search-item">
          <UnionSelect
            list={[
              {
                label: '客户名称',
                value: 'customer_Wechat_Name',
              },
              {
                label: '客户姓名',
                value: 'name',
              },
              {
                label: '手机号',
                value: 'phone',
              },
            ]}
            onChange={options =>
              updateSearch(Object.keys(options)[0], options[Object.keys(options)[0]])
            }
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
          rowKey="customer_Wechat_Id"
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
