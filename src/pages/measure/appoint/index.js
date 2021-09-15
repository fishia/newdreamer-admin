import React, { useEffect, useState, useCallback } from 'react'
import './index.less'
import { Button, Table, Modal, Input, message, Tabs, Badge } from 'antd'
import {
  requestAppointList,
  requestForAppointCreate,
  requestForAppointEdit,
  requestForAppointUpdateStatus,
  requestForAppointExport,
  requestForAppointCancel,
  requestOrderDetail,
  requestFindSizeInfoByOrder,
  reservationStatusCount,
} from './action'
import VolumeModal from '@/components/volumeModal'
import { UnionSelect, VolumerSelect, CollegeSelect } from '@/components/custom/select'
import DispatchModal from './dispatchModal'
import useFormModal from '@/hooks/useFormModal'
const TabPane = Tabs.TabPane

export default function ProductManager() {
  const [isInit, setIsinit] = useState(false)
  const [pageInfo, updatePageInfo] = useState({
    page: 1,
    size: 10,
    name: '',
    phone: '',
    college: '',
    reservation_Status: '预约中',
  })
  const [tableSize, setTableSize] = useState(0)
  const [dataSource, updateSource] = useState(null)
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)
  const [chooseItems, setChooseItems] = useState(null)
  const [VolumeModalInfo, setVolumeModalInfo] = useState(null)
  const [VolumeModalVisible, setVolumeModalVisible] = useState(false)
  const [statusCountObj, setStatusCountObj] = useState({})

  const updateSearch = useCallback((key, value) => {
    updatePageInfo(search => {
      return { ...search, [key]: value, page: search.page, size: search.size }
    })
  }, [])

  const export_data = useCallback(() => {
    if (!chooseItems || chooseItems.length <= 0) {
      //message.info('请先选择商品, 再导出数据');
      //            return ;
    }
    requestForAppointExport(chooseItems)
  }, [chooseItems])

  const edit = useCallback(item => {
    setVisible('edit')
    setModalInfo({ ...item })
  }, [])

  const create = useCallback(() => {
    setVisible('create')
    setModalInfo({})
  }, [])

  const showOrderVoucher = useCallback(item => {
    requestOrderDetail({ orderId: item.order_Id }).then(data => {
      setVisible('order')
      item.dataSource = data
      setModalInfo({ ...item })
    })
    requestFindSizeInfoByOrder({ orderId: item.order_Id }).then(data => {
      if (data) {
        setVolumeModalInfo(data)
        item.volume_Time = data.volume_Time
        item.use_Time = data.use_Time
        setModalInfo({ ...item })
      }
    })
  }, [])

  const updateModalInfo = useCallback((key, value) => {
    setModalInfo(info => ({ ...info, ...{ [key]: value } }))
  }, [])

  const pageData = useCallback(() => {
    let _pageInfo = { ...pageInfo }
    _pageInfo.page -= 1
    requestAppointList(_pageInfo).then(({ data }) => {
      if (!data) return
      setTableSize(data.totalElements)
      if (data && Array.isArray(data.content)) {
        updateSource([...data.content])
      }
    })
  }, [pageInfo])
  const refreshTable = () => {
    updatePageInfo({
      ...pageInfo,
      page: 1,
      size: 10,
    })
    pageData()
  }

  const submit = useCallback(() => {
    if (visible === 'create') {
      requestForAppointCreate(modalInfo).then(res => {
        if (res.success) {
          message.info('新建成功')
          setVisible(false)
          refreshTable()
        } else {
          message.error(res.msg)
        }
      })
    }
    if (visible === 'edit') {
      requestForAppointEdit(modalInfo).then(res => {
        if (res.success) {
          message.info('修改成功')
          setVisible(false)
          refreshTable()
        } else {
          message.error(res.msg)
        }
      })
    }
  }, [modalInfo, refreshTable, visible])

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

  const closeModalInfo = useCallback(() => {
    setVisible(false)
    setModalInfo(null)
  }, [])

  useEffect(() => {
    if (isInit) return
    pageData()
    setIsinit(true)
  }, [isInit, pageData])

  const getCount = useCallback(() => {
    reservationStatusCount().then(data => {
      if (data && data.success) {
        setStatusCountObj(data.data)
      }
    })
  }, [])
  useEffect(() => {
    getCount()
  }, [getCount])

  const [modalMap] = useState([
    {
      title: '收货人',
      dataIndex: 'receiver_Name',
      render: (text, record) => (
        <span onClick={() => showOrderVoucher(record)} style={{ color: '#468EFE' }}>
          {text}
        </span>
      ),
    },
    { title: '收货人电话', dataIndex: 'receiver_Phone' },
    { title: '付款时间', dataIndex: 'payment_Time' },
    { title: '收款金额', dataIndex: 'total_Received_Amount' },
    { title: '备注', dataIndex: 'remarks' },
    { title: '着装顾问', dataIndex: 'volume_Name' },
    { title: '量体时间', dataIndex: 'volume_Time' },
    { title: '收货地址', dataIndex: 'receiver_Adress' },
    { title: '发货时间', dataIndex: 'delivery_Time' },
    { title: '使用时间', dataIndex: 'use_Time' },
    { title: '分销人手机号', dataIndex: 'retail_Price' },
    { title: '快递单号', dataIndex: 'shipment_Id' },
    { title: '状态', dataIndex: 'order_Status' },
  ])
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
    { title: '退款状态', dataIndex: 'refund_Status' },
  ])

  // TODO 修改有问题
  let columns = [
    { title: '预约编号', dataIndex: 'code', width: 100 },
    { title: '客户名称', dataIndex: 'name', width: 100 },
    { title: '客户电话', dataIndex: 'phone', width: 100 },
    { title: '性别', dataIndex: 'gender', width: 60 },
    { title: '提交时间', dataIndex: 'createTime', width: 100 },
    { title: '预约量体时间', dataIndex: 'time', width: 150 },
    { title: '预约地点', dataIndex: 'address', width: 150 },
    { title: '状态', dataIndex: 'reservation_Status', width: 100 },
    {
      title: '顾问所属高校',
      dataIndex: 'collegeId',
      width: 150,
      render: (_, record) => record['collegeName'],
      elem: props => {
        return (
          <CollegeSelect
            value={props.collegeId}
            onChange={(v, obj) => {
              updateModalInfo('collegeId', v)
              updateModalInfo('collegeName', obj[0].label)
              updateModalInfo('volumer_Id', '')
              updateModalInfo('volumer_Name', '')
            }}
          />
        )
      },
    },
    {
      title: '着装顾问',
      dataIndex: 'volumer_Id',
      width: 100,
      render: (_, record) => {
        return (
          <div className="product-table-operations">
            {record.reservation_Status === '预约中' ? (
              <Button
                onClick={() => {
                  DispatchModalProps.setFormData({
                    ...record,
                    volumer_Id: undefined,
                  })
                  DispatchModalProps.setVisible(true)
                }}
                type="primary"
                size="small"
              >
                派单
              </Button>
            ) : (
              record['volumer_Name']
            )}
          </div>
        )
      },
      elem: props =>
        props?.collegeId ? (
          <VolumerSelect
            value={props.volumer_Id}
            params={{ college_id: props?.collegeId, volumer_Status: true }}
            onChange={(v, obj) => {
              updateModalInfo('volumer_Id', v)
              updateModalInfo('volumer_Name', obj[0].label)
            }}
          />
        ) : null,
    },
    {
      title: '操作',
      dataIndex: 'name11',
      width: 180,
      render: (item, record) => (
        <div className="product-table-operations">
          {record.reservation_Status !== '已量体' && record.reservation_Status !== '已取消' ? (
            <React.Fragment>
              {record.reservation_Status === '预约中' ? (
                <Button
                  onClick={() => {
                    DispatchModalProps.setFormData({
                      ...record,
                      volumer_Id: undefined,
                    })
                    DispatchModalProps.setVisible(true)
                  }}
                  type="primary"
                  size="small"
                >
                  派单
                </Button>
              ) : null}
              <Button type="primary" onClick={() => edit(record)} size="small">
                修改
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  Modal.confirm({
                    title: '取消预约',
                    content: '确定取消预约?',
                    onOk() {
                      requestForAppointCancel({
                        Customer_Wechat_Id: record.customer_Wechat_Id,
                        reservation_Id: record.reservation_Id,
                      }).then(() => {
                        getCount()
                        refreshTable()
                      })
                    },
                    onCancel() {
                      console.log('Cancel')
                    },
                  })
                }}
                size="small"
              >
                取消
              </Button>
            </React.Fragment>
          ) : record.reservation_Status === '已取消' ? (
            <span style={{ color: '#ccc' }}>已取消</span>
          ) : null}
        </div>
      ),
    },
  ]
  //派单
  const DispatchModalProps = useFormModal({
    modal: {
      title: `${document.title}-派单`,
      width: 900,
      onOk: params => {
        return requestForAppointUpdateStatus({
          ...params,
          reservation_Status: '派单中',
        }).then(({ success }) => {
          if (success) {
            message.success('派单成功')
            getCount()
            refreshTable()
          }
          return success
        })
      },
    },
  })
  //预约中 不显示列顾问所属高校及着装顾问
  if (pageInfo.reservation_Status === '预约中') {
    columns.splice(8, 2)
  }
  return (
    <div className="product-manager">
      <Tabs
        activeKey={pageInfo.reservation_Status}
        onChange={key => {
          updatePageInfo({ ...pageInfo, reservation_Status: key, page: 1 })
          setIsinit(false)
        }}
        tabBarGutter={60}
      >
        {['预约中', '派单中', '已接单', '已量体', '已取消'].map(item => (
          <TabPane
            key={item}
            tab={
              <Badge count={['预约中', '派单中'].indexOf(item) > -1 ? statusCountObj[item] : 0}>
                {item}
              </Badge>
            }
          >
            {item === pageInfo.reservation_Status ? (
              <div>
                <section className="product-manager-search">
                  <div className="manager-search-item">
                    <UnionSelect
                      list={[
                        {
                          label: '客户名称',
                          value: 'name',
                        },
                        {
                          label: '着装顾问',
                          value: 'volumer_Name',
                        },
                        {
                          label: '客户电话',
                          value: 'phone',
                        },
                      ]}
                      onChange={options =>
                        updateSearch(Object.keys(options)[0], options[Object.keys(options)[0]])
                      }
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
                  {/* <Button onClick={create} type="primary">新增</Button> */}
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
                    scorll={{ x: 1000 }}
                  />
                </section>
              </div>
            ) : null}
          </TabPane>
        ))}
      </Tabs>

      {modalInfo && (
        <Modal
          title="预约信息编辑"
          visible={visible === 'edit'}
          width={1000}
          onOk={submit}
          onCancel={() => setVisible(false)}
        >
          <div className="pm-edit-container">
            {[...columns.slice(0, columns.length - 1)].map(col => (
              <div className="pm-edit-item">
                <span className="edit-item__title">{col.title}</span>
                {col.elem ? (
                  <col.elem {...modalInfo} />
                ) : (
                  <Input
                    value={modalInfo[col.dataIndex]}
                    disabled={
                      ['code', 'name', 'gender', 'phone', 'reservation_Status'].indexOf(
                        col.dataIndex
                      ) > -1
                    }
                    onChange={e => updateModalInfo(col.dataIndex, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}
      <DispatchModal {...DispatchModalProps} />
      {modalInfo && (
        <Modal
          title={`单据信息-${modalInfo.order_Id}-${modalInfo.customerame || ''}`}
          visible={visible === 'order'}
          width={1000}
          onOk={closeModalInfo}
          onCancel={closeModalInfo}
        >
          <div className="pm-edit-container">
            {modalMap.map(col => (
              <div className="order-edit-item">
                <span className="edit-item__title">{col.title}</span>
                <span className="edit-item__value">{modalInfo[col.dataIndex]}</span>
              </div>
            ))}

            <Table
              rowKey="order_Id"
              dataSource={modalInfo.dataSource}
              columns={ModalColumns}
              pagination={false}
            />
            <div style={{ marginTop: '20px' }}>
              <div className="order-edit-item">
                <span className="edit-item__title">面料编号</span>
                <span className="edit-item__value">{modalInfo.fabric_Id}</span>
              </div>
              <div className="order-edit-item">
                <Button
                  onClick={() => {
                    if (VolumeModalInfo) {
                      setVolumeModalVisible(true)
                    } else {
                      message.info('暂无量体信息')
                    }
                  }}
                >
                  量体信息
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <VolumeModal
        showModal={VolumeModalVisible}
        info={VolumeModalInfo}
        cancel={() => setVolumeModalVisible(false)}
        unEditable={true}
      />
    </div>
  )
}
