import React, { useEffect, useState, useCallback } from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker, Select } from 'antd';
import {
    requestOrderList, requestOrderDetail, requestForOrderExport,
    requestForOrdrStatusUpdate, requestForOrdrShip,
    requestFindSizeInfoByOrder
} from './action';
import VolumeModal from '../../../components/volumeModal';
const { RangePicker } = DatePicker;
export default function OrderVoucher() {
    const [isInit, setIsinit] = useState(false);
    const [pageInfo, updatePageInfo] = useState({
        page: 1,
        size: 10
    })
    const [tableSize, setTableSize] = useState(0);
    const [dataSource, updateSource] = useState(null);
    const [visible, setVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const [chooseItems, setChooseItems] = useState(null);
    const [VolumeModalVisible, setVolumeModalVisible] = useState(false);
    const [VolumeModalInfo, setVolumeModalInfo] = useState(null);
    const [updateIndex, setUpdateIndex] = useState(0);

    const updateSearch = useCallback((key, value) => {
        updatePageInfo(info => {
            info[key] = value;
            return { ...info }
        });
    }, [])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            //message.info('请先选择商品, 再导出数据');
            //            return ;
        }
        requestForOrderExport(chooseItems);
    }, [chooseItems])


    const showOrderVoucher = useCallback((item) => {
        requestOrderDetail({ orderId: item.order_Id }).then(data => {
            setVisible(true);
            item.dataSource = data;
            setModalInfo({ ...item });
        })
        requestFindSizeInfoByOrder({ orderId: item.order_Id }).then(data => {
            if (data) {
                setVolumeModalInfo(data);
                item.volume_Time = data.volume_Time;
                item.use_Time = data.use_Time;
                setModalInfo({ ...item });
            }
        })

    }, []);

    const updateOrderStatus = useCallback(function (record, status) {
        // TODO Required List parameter 'ids' is not presen 
        requestForOrdrStatusUpdate({
            id: record.order_Id,
            status
        }).then(data => {
            setUpdateIndex(index => {
                return index + 1;
            });
        }).catch(e => {
            setUpdateIndex(index => index++);
        })
    }, [])


    const pageData = useCallback(() => {
        let _pageInfo = { ...pageInfo };
        _pageInfo.page -= 1;
        requestOrderList(_pageInfo).then(data => {
            setTableSize(data.totalElements);
            updateSource(data.content)
        })
    }, [pageInfo])
    useEffect(() => {
        if (updateIndex >= 0) {
            pageData();
        }
    }, [pageData, updateIndex])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({ ...pageInfo });
            pageData();
        }
    }, [pageData, pageInfo])

    const closeModalInfo = useCallback(() => {
        setVisible(false);
        setModalInfo(null);
    }, [])

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const [columns] = useState([
        { title: '订单号', dataIndex: 'order_Id', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{ color: '#1890ff' }}>{text}</span> },
        { title: '收货人', dataIndex: 'receiver_Name' },
        { title: '收货人电话', dataIndex: 'receiver_Phone' },
        { title: '付款时间', dataIndex: 'payment_Time' },
        { title: '使用时间', dataIndex: 'use_Time' },
        { title: '收款金额', dataIndex: 'total_Received_Amount', key: 'name1', },
        { title: '量体师', dataIndex: 'volume_Name' },
        { title: '量体时间', dataIndex: 'volume_Time' },
        {
            title: '物流单号', dataIndex: 'shipment_Id', width: 80, render: (text, record) => {
                if (!text) {
                    return <React.Fragment>
                        <Button style={{ background: 'blue', borderColor: 'blue' }} type="primary" onClick={() => {
                            if (record.order_Status === '待发货') {
                                message.info('请先备货，再发货哦');
                                return;
                            }
                            requestForOrdrShip({
                                orderId: record.order_Id
                            }).then(() => {
                                setUpdateIndex(index => {
                                    return index + 1;
                                });
                            })
                        }} >一键发货</Button>
                        <Button style={{ background: 'blue', borderColor: 'blue' }} type="primary" onClick={() => {
                            if (record.order_Status === '待发货') {
                                message.info('请先备货，再发货哦');
                                return;
                            }
                            let value = '';
                            Modal.confirm({
                                title: '请输入物流单号',
                                content: <Input size="small" placeholder="请输入物流单号" onChange={e => value = e.target.value} />,
                                onOk() {
                                    if (!value) {
                                        message.info('请输入物流单号哦');
                                        return;
                                    }
                                    requestForOrdrStatusUpdate({
                                        id: record.order_Id,
                                        shipment_Id: value,
                                        delivery_Time: new Date().toLocaleDateString().replace(/\//g, '-') + ' ' + new Date().toLocaleTimeString('it-IT'),
                                        status: '待收货'
                                    }).then(data => {
                                        setUpdateIndex(index => {
                                            return index + 1;
                                        });
                                    })
                                },
                                onCancel() {
                                    console.log('Cancel');
                                },
                            });
                        }} >物流单号发货</Button>
                    </React.Fragment>
                } else {
                    return <span>{text}</span>
                }
            }
        },
        { title: '备注', dataIndex: 'remarks', width: 80 },
        { title: '状态', dataIndex: 'order_Status', width: 80 },
        { title: '分销人手机号', dataIndex: 'receiver_Phone', width: 160 },
        {
            title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
                {
                    !record.shipment_Id && record.order_Status === '待发货' && <Button style={{ background: 'orange', borderColor: 'orange' }} onClick={() => {
                        updateOrderStatus(record, '备货中');
                    }} type="primary" size="small" >备货</Button>
                }
                {
                    !record.shipment_Id && <Button danger onClick={() => {
                        updateOrderStatus(record, '待发货');
                    }} type="primary" size="small" >撤销</Button>
                }

            </div>
        },
    ])

    const [modalMap] = useState([
        { title: '收货人', dataIndex: 'receiver_Name', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{ color: '#1890ff' }}>{text}</span> },
        { title: '收货人电话', dataIndex: 'receiver_Phone' },
        { title: '付款时间', dataIndex: 'payment_Time' },
        { title: '收款金额', dataIndex: 'total_Received_Amount' },
        { title: '备注', dataIndex: 'remarks', },
        { title: '量体师', dataIndex: 'volume_Name' },
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
        { title: '尺码', dataIndex: 'size', },
        { title: '数量', dataIndex: 'amounts' },
        { title: '单价', dataIndex: 'retail_Price' },
        { title: '折扣', dataIndex: 'discount' },
        { title: '折后价', render: (item, record) => <span>{record.received_Amount / record.amounts}</span> },
        { title: '折后总金额', dataIndex: 'received_Amount' },
        { title: '状态', dataIndex: 'item_Status' },
        { title: '退款状态', dataIndex: 'refund_Status' }
    ])

    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">订单号</div>
                <Input size="small" placeholder="请输入订单号" onChange={e => updateSearch('orderId', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">收货人名称</div>
                <Input size="small" placeholder="请输入收货人名称" onChange={e => updateSearch('customerName', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="请输入电话" onChange={e => updateSearch('phone', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">状态</div>
                <Select
                    style={{ width: 200 }}
                    onChange={value => updateSearch('status', value)}>
                    <Select.Option value="">全部</Select.Option>
                    <Select.Option value="备货中">备货中</Select.Option>
                    <Select.Option value="待发货">待发货</Select.Option>
                    <Select.Option value="已完成">已完成</Select.Option>
                </Select>
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">时间范围</div>
                <RangePicker onChange={(date, dateString) => {
                    updateSearch('startTime', dateString[0])
                    updateSearch('endTime', dateString[1])
                }} />
            </div>

            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
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
            title={`单据信息-${modalInfo.order_Id}-${modalInfo.customerame || ''}`}
            visible={visible}
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
                <div style={{ marginTop: '20px' }}>
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