import React, {useEffect, useState, useCallback} from 'react';
import { Button, Table, Modal, Input, Upload, message, Select } from 'antd';
import { exportFile, dealOssImageUrl, previewImage } from '../../../assets/js/common';

import { 
    requestForFabricList,requestForFabricEdit, 
    requestForFabricCreate, requestForFabricDelete,
    requestForFabricExport
 } from './action';


 const appendEdit = [{title: '启用', dataIndex: 'enable', }]
export default function FabricManager() {
    const [ isInit, updateInit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ modelType, setModelType ] = useState('');
    const [ dataSource, setDataSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ editInfo, setEditInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);

    const updateSearch = useCallback((key, value) => {
        // TODO 面料编号搜索失败
        updatePageInfo(info => {
            info[key] = value;
            return {...info}
        });
    }, [])
    // 获取分页数据
    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestForFabricList(_pageInfo).then(data => {
            if (!data) return ;
            setTableSize(data.totalElements);
            if (data && Array.isArray(data.content)) {
                setDataSource([...data.content]);
            }
        })
    }, [pageInfo])

    const _delete = useCallback((record) => {
        let status = record.enable === '禁用' ? '启用' : '禁用';
        requestForFabricDelete({
            id: record.fabric_Id,
            enable: status
        }).then(data => {
            message.info(status+'成功');
        }).then(pageData)
    }, [pageData]);

    const _delete_batch = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再批量禁用');
            return ;
        }
        requestForFabricDelete(chooseItems);
    }, [chooseItems])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            //message.info('请先选择商品, 再导出数据');
//            return ;
        }
        requestForFabricExport(chooseItems);
    }, [chooseItems])

    // 编辑信息
    const _edit = useCallback((item) => {
        setModelType('edit');
        setVisible(true);
        setEditInfo({...item});
    }, []);

    // 新增
    const create = useCallback(() => {
        setModelType('create');
        setVisible(true);
        setEditInfo({});
    }, [])

    // 更新编辑信息
    const updateEditInfo = useCallback((key, value) => {
        setEditInfo(info => {
            return {...info, [key]: value};
        })
    }, [])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])

    const submitUpdate = useCallback((info) => {
        requestForFabricEdit(info).then(data => {
            if (data) {
                message.info(modelType === 'edit' ? '修改成功' : '新建成功');
                pageData();
                setVisible(false);
            }
            
        })
    }, [modelType, pageData])

    const submitModal = useCallback(() => {
        submitUpdate(editInfo)
    }, [editInfo, submitUpdate])

    // 初始化
    useEffect(() => {
        if (isInit) return ;
        pageData();
        updateInit(true);
    }, [isInit, pageData])
    const [ columns ] = useState([
        { title: '微信ID', dataIndex: 'wechatId', onRead: true, render: text => <span style={{color: '#1890ff'}}>{text}</span> },
            { title: '名称', dataIndex: 'name'},
            { title: '联系人', dataIndex: 'contactPerson'},
            { title: '手机号', dataIndex: 'phoneNumber',width: 200},
            { title: '订单数', dataIndex: 'orderCount'},
            { title: '分销折扣', dataIndex: 'distributionDiscount'},
            { title: '订单总金额', dataIndex: 'orderAmount'},
            { title: '操作', dataIndex: 'name11', width: 300, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" onClick={() => _edit(record)} >修改</Button>
               {/* <Button type="primary" size="small" onClick={() => _delete(record)}>{record.enable === '禁用' ? '启用' : '禁用'}</Button> */}
               {/* <Upload
                    action="/newdreamer/file/upload?FileDirectorEnum=PRODUCT"
                    method="post"
                    data={(file) => {
                        return {
                            fileDirectorEnum: 'FABRIC',
                            files: file
                        }
                    }}
                    onChange={({ file, fileList }) => {
                        if (file.response) {
                            let _record = {...record};
                            _record.fabric_Image = dealOssImageUrl(file.response[0])
                            submitUpdate(_record);
                        }
                        
                    }}
                ><Button type="primary" size="small">换图</Button></Upload> */}
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">名称</div>
                <Input size="small" placeholder="输入名称" onChange={e => updateSearch('name', e.target.value)} />
            </div>
            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
        {/* <Upload 
            action="//newdreamer.cn/newdreamer/fabric/importExcel"
            method="post"
            onChange={({ file, fileList }) => {
                // TODO 导入之后没有反应，显示上传成功了
                if (file.status === 'done') {
                    message.info('导入成功');
                    pageData();
                } else if (file.status === 'error') {
                    message.info('导入失败');
                }
            }}><Button type="primary">批量导入</Button></Upload>  */}
            {/* <Button onClick={_delete_batch} type="primary">批量禁用</Button> */}
            <Button onClick={export_data} type="primary">数据导出</Button>
            <Button onClick={create} type="primary">新增</Button>
        </section>
        <section className="product-manager-table">
            <Table 
                rowKey="id"
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setChooseItems((selectedRowKeys + '').split(',').filter(item => item));
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        {editInfo && <Modal
                title="商品编辑"
                visible={visible}
                width={1000}
                onOk={submitModal}
                onCancel={() => setVisible(false)}
            >
                <div className="pm-edit-container">
                {[...columns.slice(0, columns.length - 1)].map(col => <div className="pm-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    {(col.type === 'image') 
                        && <div className="pm-edit__images">
                            {editInfo[col.dataIndex] &&  <img className="pm-edit__image" alt="edit" src={editInfo[col.dataIndex]} />}
                            <Upload
                                action="/newdreamer/file/upload?FileDirectorEnum=PRODUCT"
                                method="post"
                                data={(file) => {
                                    return {
                                        fileDirectorEnum: 'FABRIC',
                                        files: file
                                    }
                                }}
                                onChange={({ file, fileList }) => {
                                    if (file.response) {
                                        updateEditInfo(col.dataIndex, dealOssImageUrl(file.response[0]))
                                    }
                                    
                                }}
                            ><Button type="primary" size="small">替换</Button></Upload>
                        </div>
                    }
                    {(!col.type && col.dataIndex !== 'enable') && <Input 
                            placeholder="输入你的数据" 
                            disabled={col.onRead && modelType === 'edit'}
                            value={editInfo && editInfo[col.dataIndex]}
                            onChange={e => updateEditInfo(col.dataIndex, e.target.value)}
                        />}
                </div>)}
                </div>
            </Modal>}
    </div>
}