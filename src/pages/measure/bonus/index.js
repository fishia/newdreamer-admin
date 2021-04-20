import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestBonusList, requestForBonusEdit, requestForBonusExport } from './action';


const editChat = ['deduction_Fee'];

export default function ProductManager() {
    const [ isInit, setIsinit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10,
        name: '',
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ dataSource, updateSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ modalInfo, setModalInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);

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
        requestForBonusExport(chooseItems);
    }, [chooseItems])



    const edit = useCallback((item) => {
        setVisible('edit');
        setModalInfo({...item});
    }, []);

    const updateModalInfo = useCallback((key, value) => {
        setModalInfo(info => ({...info, ...{[key]: value}}));
    }, [])

    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestBonusList(_pageInfo).then(data => {
            setTableSize(data.totalElements)
            updateSource(data.content)
        })
    }, [pageInfo])

    const submit = useCallback(() => {
        if (visible === 'edit') {
            requestForBonusEdit({
                id: modalInfo.volumer_Reward_Id,
                deduction: modalInfo.deduction_Fee // TODO:  奖励金修改接口报错
            }).then(res => {
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

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])
    const [ columns ] = useState([
        { title: '量体师姓名', dataIndex: 'volumer_Name'},
            { title: '订单号', dataIndex: 'order_Id'},
            { title: '订单金额', dataIndex: 'total_Received_Amount'},
            { title: '下单时间', dataIndex: 'creation_Time'},
            // { title: '量体时间', dataIndex: 'volume_Time'},
            { title: '完成情况', dataIndex: 'order_Status'},
            { title: '奖励金额', dataIndex: 'reward_Price'},
            { title: '返修扣款', dataIndex: 'deduction_Fee' },
            { title: '实际奖励', dataIndex: 'actual_Reward'},
            { title: '操作', dataIndex: 'name11', render: (item, record) => <div className="product-table-operations">
               <Button type="primary" onClick={() => edit(record)} size="small" >修改</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">量体师姓名</div>
                <Input size="small" placeholder="输入量体师" onChange={e => updateSearch('name', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">订单号</div>
                <Input size="small" placeholder="输入订单号" onChange={e => updateSearch('orderId', e.target.value)} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button> {/**奖励金导出没有 */}
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
                title="商品编辑"
                visible={visible}
                width={1000}
                onOk={submit}
                onCancel={() => setVisible(false)}
            >
                <div className="pm-edit-container">
                {columns.map(col => <div className="pm-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    {
                        editChat.indexOf(col.dataIndex) >= 0
                        ? <Input value={modalInfo[col.dataIndex]} onChange={e => updateModalInfo(col.dataIndex, e.target.value)} />
                        :  <span className="edit-item__value">{modalInfo[col.dataIndex]}</span>

                    }
                </div>)}
                </div>
            </Modal>}
        
        </div>
}