import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestCustomeVolumeList, requestCustomeVolumeExport, requestCustomeVolumeUpdate } from './action';
import VolumeModal from '../../../components/volumeModal'
const { RangePicker } = DatePicker;

export default function ProductManager() {
    const [ isInit, setIsinit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ dataSource, updateSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ modalInfo, setModalInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);

    const updateSearch = useCallback((key, value) => {
        updatePageInfo(info => {
            info[key] = value;
            return {...info}
        });
    }, [])


    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            //message.info('请先选择商品, 再导出数据');
//            return ;
        }

        requestCustomeVolumeExport(chooseItems)
        console.log('----开始批量导出-----', chooseItems)
    }, [chooseItems])

    const edit = useCallback((record) => {
        console.log('--edit--', record);
        setVisible(true);
        setModalInfo({...record});
    }, [])


    const showOrderVoucher = useCallback((item) => {
        setVisible(true);
        setModalInfo({...item});
    }, []);

    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestCustomeVolumeList(_pageInfo).then(data => {
            setTableSize(data.totalElements);
            updateSource(data.content);
        })
    }, [pageInfo])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])


    const modalSubmit = useCallback((newInfo) => {
        requestCustomeVolumeUpdate(newInfo).then(() => {
            message.info('修改成功');
        }).then(pageData);
        console.log('---modalSubmit---', modalSubmit);
        setVisible(false);
    }, [pageData])

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const [ columns ] = useState([
            // TODO 缺少客户姓名
            { title: '姓名', dataIndex: 'customer_Name', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
            // TODO 这个电话是客户电话 不是量体师电话
            { title: '电话', dataIndex: 'customer_Phone'},
            { title: '量体师', dataIndex: 'volumer_Name'},
            { title: '量体时间', dataIndex: 'volume_Time'},
            { title: '性别', dataIndex: 'customer_Gender', key: 'name1',},
            { title: '身高', dataIndex: 'height'},
            { title: '体重', dataIndex: 'weight'},
            { title: '胸围', dataIndex: 'bust'},
            { title: '中腰', dataIndex: 'middle_Waist'},
            { title: '肩宽', dataIndex: 'shoulder_Width'},
            { title: '袖长', dataIndex: 'sleeve_Length'},
            { title: '腰围', dataIndex: 'waistline'},
            { title: '臀围', dataIndex: 'hips'},
            { title: '裤长', dataIndex: 'pants_Length'},
            { title: '喜好', dataIndex: 'favorite'},
            { title: '使用时间', dataIndex: 'use_Time'},
            { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" onClick={() => edit(record)} size="small" >修改</Button>
               {/* <Button type="primary" size="small" >删除</Button> */}
            </div>},
        ])
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="输入客户名称" onChange={e => updateSearch('name', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="输入电话" onChange={e => updateSearch('phone', e.target.value)} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
        </section>
        <section className="product-manager-table">
            <Table 
                rowKey="volume_Id"
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
        <VolumeModal 
            showModal={visible}
            info={modalInfo}
            submit={modalSubmit}
            cancel={() => setVisible(false)}
        />
        
        </div>
}