import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker, Popover, Radio, Select } from 'antd';
import { requestAppointList, requestForAppointCreate, requestForAppointEdit,
     requestForAppointUpdateStatus, requestForAppointExport,
     requestForVolumerList, requestForAppointCancel,requestOrderDetail,requestFindSizeInfoByOrder
    } from './action';
import VolumeModal from '../../../components/volumeModal';
const { RangePicker } = DatePicker;

export default function ProductManager() {
    const [ isInit, setIsinit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10,
        name: '',
        phone: '',
        college: ''
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ dataSource, updateSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ modalInfo, setModalInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);
    const [ volumerList, setVolumerList ] = useState(null);
    const [ dispatchOrder, setDispatchOrder ] = useState(null);
    const [ selectedVolumer, setSelectedVolumer ] = useState(null);
    const [ VolumeModalInfo, setVolumeModalInfo ] = useState(null);
    const [ VolumeModalVisible, setVolumeModalVisible ] = useState(false);


    const updateSearch = useCallback((key, value) => {
        updatePageInfo(search => {
            search[key] = value;
            return {...search}
        });
    }, [])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            //message.info('请先选择商品, 再导出数据');
//            return ;
        }
        requestForAppointExport(chooseItems);
    }, [chooseItems])



    const edit = useCallback((item) => {
        setVisible('edit');
        setModalInfo({...item});
    }, []);

    const create = useCallback(() => {
        setVisible('create');
        setModalInfo({});
    }, []);

    const showOrderVoucher = useCallback((item) => {
        requestOrderDetail({orderId:item.order_Id}).then(data => {
            setVisible('order');
            item.dataSource = data;
            setModalInfo({...item});
        })
        requestFindSizeInfoByOrder({orderId: item.order_Id}).then(data => {
            if (data) {
                setVolumeModalInfo(data);
                item.volume_Time = data.volume_Time;
                item.use_Time = data.use_Time;
                setModalInfo({...item});
            }
        })
        
    }, []);

    const updateModalInfo = useCallback((key, value) => {
        setModalInfo(info => ({...info, ...{[key]: value}}));
    }, [])

    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestAppointList(_pageInfo).then(data => {
            setTableSize(data.totalElements)
            updateSource(data.content)
        })
    }, [pageInfo])

    const submit = useCallback(() => {
        if (visible === 'create') {
            requestForAppointCreate(modalInfo).then(res => {
                message.info('新建成功');
                setVisible(false);
                pageData()
            })
        }
        if (visible === 'edit') {
            requestForAppointEdit(modalInfo).then(res => {
                message.info('修改成功');
                setVisible(false);
                pageData()
            })
        }
        
    }, [modalInfo, pageData, visible])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])

    const updateStatus = useCallback((item) => {
        requestForAppointUpdateStatus(item).then(res => {
            message.info('修改成功');
            setVisible(false);
            pageData()
        })
    }, [pageData])

    const showVolumerList = useCallback((record) => {
        requestForVolumerList().then(data => {
            setVolumerList(data);
            setDispatchOrder(record);
        })
    }, [])

    const closeModalInfo = useCallback(() => {
        setVisible(false);
        setModalInfo(null);
    }, [])


    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const [ modalMap ] = useState([
        { title: '收货人', dataIndex: 'receiver_Name', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
            { title: '收货人电话', dataIndex: 'receiver_Phone'},
            { title: '付款时间', dataIndex: 'payment_Time'},
            { title: '收款金额', dataIndex: 'total_Received_Amount'},
            { title: '备注', dataIndex: 'remarks', },
            { title: '量体师', dataIndex: 'volume_Name'},
            { title: '量体时间', dataIndex: 'volume_Time'},
            { title: '收货地址', dataIndex: 'receiver_Adress'},
            { title: '发货时间', dataIndex: 'delivery_Time'},
            { title: '使用时间', dataIndex: 'use_Time'},
            { title: '分销人手机号', dataIndex: 'retail_Price'},
            { title: '快递单号', dataIndex: 'shipment_Id'},
            { title: '状态', dataIndex: 'order_Status'},
        ])
    const [ ModalColumns ] = useState([
        { title: '单品编号', dataIndex: 'item_Id' },
            { title: '商品', dataIndex: 'name'},
            { title: '条码', dataIndex: 'barcode'},
            { title: '颜色', dataIndex: 'style'},
            { title: '尺码', dataIndex: 'size', },
            { title: '数量', dataIndex: 'amounts'},
            { title: '单价', dataIndex: 'retail_Price'},
            { title: '折扣', dataIndex: 'discount'},
            { title: '折后价', render: (item, record) => <span>{record.received_Amount / record.amounts}</span>},
            { title: '折后总金额', dataIndex: 'received_Amount'},
            { title: '状态', dataIndex: 'item_Status'},
            {title: '退款状态', dataIndex: 'refund_Status'}
        ])

     // TODO 修改有问题
    const [ columns, updateColumns ] = useState([
            { title: '客户名称', dataIndex: 'name'},
            { title: '客户电话', dataIndex: 'phone'},
            { title: '性别', dataIndex: 'gender'},
            { title: '订单号', dataIndex: 'order_Id', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
            // { title: '订单号', dataIndex: 'order_Id'}, // TODO: 订单号字段是不是这个
            { title: '预约时间', dataIndex: 'time'}, // TODO 预约时间和量体时间只有一个time字段
            { title: '量体地点', dataIndex: 'address'},
            { title: '量体时间', dataIndex: 'volume_Time'},
            { title: '量体师', dataIndex: 'volumer_Name'},
            { title: '完成情况', dataIndex: 'reservation_Status'}, 
            { title: '操作', dataIndex: 'name11', render: (item, record) => <div className="product-table-operations">
                {
                    record.reservation_Status === '预约中' && <Button onClick={() => {
                        showVolumerList(record);
                }} type="primary" size="small" >派单{volumerList && volumerList.length}</Button>
                }

                {
                    record.reservation_Status !== '已量体' && record.reservation_Status !== '已取消' && 
                    <React.Fragment>
                        <Button onClick={() => {
                            Modal.confirm({
                                title: '取消预约',
                                content: '确定取消预约?',
                                onOk() {
                                    //  _record.reservation_Status = '已取消'
                                    // updateStatus(_record);
                                    requestForAppointCancel({
                                        Customer_Wechat_Id: record.customer_Wechat_Id,
                                        reservation_Id: record.reservation_Id
                                    }).then(pageData)
                                },
                                onCancel() {
                                    console.log('Cancel');
                                },
                            });
                            
                        }}  type="primary" size="small" >取消</Button>
                        <Button type="primary" onClick={() => edit(record)} size="small" >修改</Button>
                    </React.Fragment>
                }
               
              
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="输入客户名称" onChange={e => updateSearch('name', e.target.value)} />
            </div>
            {/* <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="输入电话" onChange={e => updateSearch('phone', e.target.value)} />
            </div> */}
            <div className="manager-search-item">
                <div className="search-item__title">量体地点</div>
                <Input size="small" placeholder="输入量体地点" onChange={e => updateSearch('address', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">状态</div>
                <Select 
                    style={{ width: 200 }}
                    defaultValue=""
                    onChange={value => updateSearch('status', value)}>
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="预约中">预约中</Select.Option>
                        <Select.Option value="派单中">派单中</Select.Option>
                        <Select.Option value="已接单">已接单</Select.Option>
                        <Select.Option value="已量体">已量体</Select.Option>
                        <Select.Option value="已取消">已取消</Select.Option>
                    </Select>
            </div>

            <div className="manager-search-item">
                <div className="search-item__title">量体时间</div>
                <RangePicker onChange={(date, dateString) => {
                    updateSearch('startTime', dateString[0]);
                    updateSearch('endTime', dateString[1]);
                }} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
            {/* <Button onClick={create} type="primary">新增</Button> */}
        </section>
        <section className="product-manager-table">
            <Table 
                rowKey="order_Id"
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setChooseItems((selectedRowKeys + '').split(',').filter(item => item));
                    }
                }}
                dataSource={dataSource} 
                columns={columns} 
                pagination={{
                    current: pageInfo.page,
                    total: tableSize,
                    onChange: onPageChange
                }}
            />
        </section>
        {modalInfo && <Modal
                title="预约信息编辑"
                visible={visible === 'edit'}
                width={1000}
                onOk={submit}
                onCancel={() => setVisible(false)}
            >
                <div className="pm-edit-container">
                {columns.slice(0, columns.length - 1).map(col => <div className="pm-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    <Input value={modalInfo[col.dataIndex]} disabled={col.dataIndex === 'order_Id'} onChange={e => updateModalInfo(col.dataIndex, e.target.value)} />
                </div>)}
                </div>
            </Modal>}
            {volumerList && <Modal
                title="选择量体师"
                visible={volumerList && volumerList.length > 0}
                width={1000}
                onOk={() => {
                    if (!selectedVolumer) {
                        message.error('先选择量体师再提交');
                        return ;
                    }
                    let _record = {...dispatchOrder};
                    _record.volume_Id = selectedVolumer.volume_Id;
                    _record.volumer_Name = selectedVolumer.volumer_Name;
                    _record.volumer_Id = selectedVolumer.volumer_Id;
                    _record.reservation_Status = '派单中'
                    updateStatus(_record);
                    setVolumerList(null)
                }}
                onCancel={() => setVolumerList(null)}
            >
                <div className="pm-edit-container">
                    <Radio.Group
                        onChange={(e) => {
                            let value = e.target.value;
                            if (!value) {
                                message.info('这个量体师Id异常, 请检查');
                                return ;
                            }
                            let volumer = volumerList.find(item => item.volumer_Id === value);
                            setSelectedVolumer(volumer);
                        }}
                    >
                        {volumerList && volumerList.map(vol =>  <Radio value={vol.volumer_Id}>{vol.volumer_Name}</Radio>)}
                    </Radio.Group>
                </div>
            </Modal>}
            {modalInfo && <Modal
                title={`单据信息-${modalInfo.order_Id}-${modalInfo.customerame || ''}`}
                visible={visible === 'order'}
                width={1000}
                onOk={closeModalInfo}
                onCancel={closeModalInfo}
            >
                <div className="pm-edit-container">
                {modalMap.map(col => <div className="order-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    <span className="edit-item__value">{modalInfo[col.dataIndex]}</span>
                </div>)}
                
                <Table 
                    rowKey="order_Id"
                    dataSource={modalInfo.dataSource} 
                    columns={ModalColumns} 
                    pagination={false}
                />
                <div style={{marginTop: '20px'}}>
                <div className="order-edit-item">
                    <span className="edit-item__title">面料编号</span>
                    <span className="edit-item__value">{modalInfo.fabric_Id}</span>
                </div>
                <div className="order-edit-item">
                    <Button onClick={() => {
                        if (VolumeModalInfo) {
                            setVolumeModalVisible(true);
                        } else {
                            message.info('暂无量体信息');
                        }
                    }} >量体信息</Button>
                </div>
                </div>
                </div>
            </Modal>}
            <VolumeModal 
                showModal={VolumeModalVisible}
                info={VolumeModalInfo}
                cancel={() => setVolumeModalVisible(false)}
                unEditable={true}
            />
        </div>
}