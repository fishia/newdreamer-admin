import React, { useEffect, useState, useCallback } from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker, Select } from 'antd';
import { requestMeasureList, requestForMeasureEdit, requestForMeasureCreate, requestForMeasureDelete, requestForMeasureExport } from './action';
const { RangePicker } = DatePicker;

export default function ProductManager() {
    const [isInit, setIsinit] = useState(false);
    const [pageInfo, updatePageInfo] = useState({
        page: 1,
        size: 10,
        name: '',
        phone: '',
        college: ''
    })
    const [tableSize, setTableSize] = useState(0);
    const [dataSource, updateSource] = useState(null);
    const [visible, setVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const [chooseItems, setChooseItems] = useState(null);

    const updateSearch = useCallback((key, value) => {
        updatePageInfo(search => {
            search[key] = value;
            return { ...search }
        });
    }, [])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            //message.info('请先选择商品, 再导出数据');
            //            return ;
        }

        requestForMeasureExport(chooseItems)
        console.log('----开始批量导出-----', chooseItems)
    }, [chooseItems])



    const edit = useCallback((item) => {
        setVisible('edit');
        setModalInfo({ ...item });
    }, []);

    const create = useCallback(() => {
        setVisible('create');
        setModalInfo({});
    }, []);

    const updateModalInfo = useCallback((key, value) => {
        setModalInfo(info => ({ ...info, ...{ [key]: value } }));
    }, [])

    const pageData = useCallback(() => {
        let _pageInfo = { ...pageInfo };
        _pageInfo.page -= 1;
        requestMeasureList(_pageInfo).then(data => {
            setTableSize(data.totalElements)
            let content = data.content.filter(item => item.volumer_Address !== "1")
            updateSource(content)
        })
    }, [pageInfo])


    const _delete_batch = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再批量删除');
            return;
        }
        requestForMeasureDelete(chooseItems)
            .then(() => {
                message.info('删除成功');
            })
            .then(pageData)
    }, [chooseItems, pageData])

    const submit = useCallback(() => {
        if (visible === 'create') {
            requestForMeasureCreate(modalInfo).then(res => {
                message.info('新建成功');
                setVisible(false);
                pageData()
            })
        }
        if (visible === 'edit') {
            requestForMeasureEdit(modalInfo).then(res => {
                message.info('修改成功');
                setVisible(false);
                pageData()
            })
        }

    }, [modalInfo, pageData, visible])

    const updateStatus = useCallback((record) => {
        record = { ...record };
        record.volumer_Status = record.volumer_Status === '停用' ? '启用' : '停用';
        requestForMeasureEdit(record).then(res => {
            message.info('修改成功');
            pageData()
        })
    }, [pageData])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({ ...pageInfo });
            pageData();
        }
    }, [pageData, pageInfo])


    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])


    const [columns] = useState([
        { title: '姓名', dataIndex: 'volumer_Name' },
        { title: '电话', dataIndex: 'volumer_Phone' },
        { title: '性别', dataIndex: 'volumer_Gender' },
        { title: '身份证号', dataIndex: 'volumer_Address' },
        // { title: '量体师微信', dataIndex: 'volumer_Wechat_Id'},
        { title: '出生年月', dataIndex: 'volumer_Birth' },
        { title: '所属高校', dataIndex: 'volumer_College' },
        { title: '校区', dataIndex: 'volumer_Part' },
        { title: '专业', dataIndex: 'volumer_Department' },
        { title: '状态', dataIndex: 'volumer_Status' },
        {
            title: '操作', dataIndex: 'name11', render: (item, record) => <div className="product-table-operations">
                <Button type="primary" onClick={() => edit(record)} size="small" >修改</Button>
                <Button type="primary" onClick={() => updateStatus(record)} size="small" >{record.volumer_Status === '停用' ? '启用' : '停用'}</Button>
            </div>
        },
    ])
    const createConfig = columns.slice(0, columns.length - 1);
    createConfig.push({ title: '量体师微信', dataIndex: 'volumer_Wechat_Id' })
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入客户名称" onChange={e => updateSearch('name', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">手机号</div>
                <Input size="small" placeholder="请输入手机号" onChange={e => updateSearch('phone', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">所属高校</div>
                <Input size="small" placeholder="请输入高校" onChange={e => updateSearch('college', e.target.value)} />
            </div>

            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            {/* <Button onClick={_delete_batch} type="primary">批量删除</Button> */}
            <Button onClick={export_data} type="primary">数据导出</Button>
            <Button onClick={create} type="primary">新增</Button>
        </section>
        <section className="product-manager-table">
            <Table
                rowKey="volumer_Id"
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
                {createConfig.map((col, index) => <div className="pm-edit-item" key={index}>
                    <span className="edit-item__title">{col.title}</span>
                    {
                        col.dataIndex === 'volumer_Status' && <Select defaultValue={modalInfo[col.dataIndex]} >
                            <Select.Option value="停用">停用</Select.Option>
                            <Select.Option value="启用">启用</Select.Option>
                        </Select>
                    }
                    {col.dataIndex !== 'volumer_Status' && <Input value={modalInfo[col.dataIndex]} onChange={e => updateModalInfo(col.dataIndex, e.target.value)} />}
                </div>)}
            </div>
        </Modal>}

    </div>
}
