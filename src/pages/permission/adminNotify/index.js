import React from 'react';
import {Button, Input, Table, Modal, message, Select, Form, Checkbox, DatePicker} from 'antd/lib/index';
import moment from 'moment'
import './index.less'
import { queryAllUser, queryAll, createAdminNotify, updateAdminNotify, deleteRole } from "./action";
const { Option } = Select;
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            searchForm: {
                name: '',
                phone: ''
            },
            addInitialValues: {

            }, // 默认值
            roleVisible: false, // 是否打开弹窗
            allTree: [], // 所有权限 树结构
            editState: '', // add || edit
            rowData: {}, // 当前操作的行数据
            allUserList: [] // 用户列表
        }
    }
    componentDidMount() {
        this.pageData();
        this.queryAllUser();
    }
    searchClick = () => {
        this.pageData();
    }

    resetClick = () => {
        this.setState({
            searchForm: {
                name: '',
                phone: ''
            }
        }, () => {
            this.pageData();
        })
    }

    updateSearch(key, e) {
        // console.log(e)
        let params = { ...this.state.searchForm }
        Object.getOwnPropertyNames(params).forEach(function (k) {
            params[key] = e
        })
        this.setState({
            searchForm: params
        })
    }
    queryAllUser () {
        queryAllUser().then(res => {
            // console.log(res.data)
            this.setState({
                allUserList: res.data
            })
        })
    }
    pageData() {
        let _pageInfo = { ...this.state.searchForm };
        // _pageInfo.page -= 1;
        queryAll(_pageInfo).then(res => {
            const { data } = res;
            // console.log(data);
            data.forEach(e => {
                e.key = e.id
            });
            this.setState({
                dataList: data
            })
        })
        // console.log(this.state.searchForm);
    }
    // 打开新增弹窗
    openAddPopup = (state, row) => {
        // console.log(row);
        let allTree = [
            {
                checked: false,
                remark: '订单弹窗',
                children: [
                    {
                        checked: false,
                        remark: '预约提醒',
                        name: 'reservationNotify'
                    },
                    {
                        checked: false,
                        remark: '新销售单提醒',
                        name: 'orderNotify'
                    },
                    {
                        checked: false,
                        remark: '退款申请提醒',
                        name: 'refundNotify'
                    }
                ]
            }
        ];
        if (state === 'edit') {
            allTree.forEach(item => {
                let check = true;
                item.children.forEach(item01 => {
                    if (row.reservationNotify && item01.name === 'reservationNotify') {
                        item01.checked = true
                    }
                    if (row.orderNotify && item01.name === 'orderNotify') {
                        item01.checked = true
                    }
                    if (row.refundNotify && item01.name === 'refundNotify') {
                        item01.checked = true
                    }
                    if (!item01.checked) {
                        check = false
                    }
                });
                item.checked = check
            });
            this.setState({
                addInitialValues: {
                    adminUserId: row.adminUserId
                }, // 默认值
            });
        }
        this.setState({
            editState: state,
            roleVisible: true,
            rowData: row,
            allTree: allTree
        });
    };
    //  操作成功关闭弹窗
    handleOk = () => {
        // this.props.handleOk();
    };
    // 关闭弹窗
    handleCancel = () => {
        this.setState({
            roleVisible: false,
            allTree: [],
            editState: '',
            rowData: {},
            addInitialValues: {

            }, // 默认值
        });
        this.pageData();
    };
    onFinish = (values) => {
        console.log(values);
        let params = {...values};
        this.state.allTree.forEach(item => {
            item.children.forEach(item01 => {
                params[item01.name] = item01.checked
            });
        });
        console.log(params)

        // 新增
        if (this.state.editState === 'add') {
            createAdminNotify(params).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    message.success('操作成功');
                    this.handleCancel();
                }
            })
        } else if (this.state.editState === 'edit') {
            params.id = this.state.rowData.id;
            updateAdminNotify(params).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    message.success('操作成功');
                    this.handleCancel();
                }
            })
        }

    };
    deleteClick = (record) => {
        deleteRole({id: record.id}).then(res => {
            if (res.code === 200) {
                message.success('删除成功！');
                this.pageData();
            }
        })
    };
    // 点击父按钮
    onParentChange = (e, index) => {
        // console.log(e);
        // console.log(item);
        // console.log(index);
        let allTree = this.state.allTree;
        allTree[index].checked = e;
        if (allTree[index].checked) {
            allTree[index].children.forEach(item => {
                item.checked = true
            })
        } else {
            allTree[index].children.forEach(item => {
                item.checked = false
            })
        }
        this.setState({
            allTree: allTree
        });
        // console.log(allTree)
    };
    // 点击子按钮
    onChildrenChange = (e, index, index01) => {
        let allTree = this.state.allTree;
        allTree[index].children[index01].checked = e;
        // 判断子元素选中状态，设置父元素的选中效果
        let check = true;
        allTree[index].children.forEach(item => {
            if (!item.checked) {
                check = false
            }
        });
        allTree[index].checked = check;
        this.setState({
            allTree: allTree
        });
        // console.log(allTree)
    }

    render() {

        const { addInitialValues, roleVisible, dataList, allTree, allUserList } = this.state;
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        const tailLayout = {
            wrapperCol: { offset: 10, span: 16 },
        };
        const columns = [
            { title: '名称', dataIndex: 'name', width: 120, align: 'center' },
            { title: '手机号', dataIndex: 'phone', width: 120, align: 'center' },
            // { title: '备注', dataIndex: 'phone', width: 120, align: 'center' },
            { title: '客户预约提醒', dataIndex: 'reservationNotify', width: 120, align: 'center',
                render: (value, record) => <span>{value ? '是' : '否'}</span>
            },
            { title: '新销售订单', dataIndex: 'orderNotify', width: 120, align: 'center',
                render: (value, record) => <span>{value ? '是' : '否'}</span>
            },
            { title: '退款申请提醒', dataIndex: 'refundNotify', width: 120, align: 'center',
                render: (value, record) => <span>{value ? '是' : '否'}</span>
            },
            {
                title: '操作', dataIndex: 'channel', width: 180, align: 'center',
                render: (value, record) => <div style={{width: '180px'}}>
                    <Button type="primary" style={{ "marginRight": "20px" }}onClick={() => { this.openAddPopup('edit', record) }}>修改</Button>
                    <Button type="primary" onClick={() => { this.deleteClick(record) }}>删除</Button>
                </div>,
                fixed: 'right'
            }
        ]
        return (
            <div className="adminNotify">
                <div className="search-box">
                    <section className="product-manager-search">
                        <div className="manager-search-item">
                            <div className="search-item__title">名称</div>
                            <Input size="small" placeholder="请输入角色名称" value={this.state.searchForm.name} onChange={e => this.updateSearch('name', e.target.value)} />
                        </div>
                        <div className="manager-search-item">
                            <div className="search-item__title">手机号</div>
                            <Input size="small" placeholder="请输入角色名称" value={this.state.searchForm.phone} onChange={e => this.updateSearch('phone', e.target.value)} />
                        </div>
                        <div className="manager-search-btn"><Button onClick={this.searchClick} type="primary" >筛选</Button></div>
                        <div className="manager-search-btn"><Button onClick={this.resetClick} type="primary" >重置</Button></div>
                    </section>
                    <section className="sear-add">
                        <Button type="primary" onClick={() => { this.openAddPopup('add') }}>新增</Button>
                    </section>
                </div>
                <Table dataSource={dataList} columns={columns}/>
                {this.state.roleVisible ? <Modal
                    title={this.state.editState === 'add' ? '新增弹窗提醒权限' : '修改弹窗提醒权限'}
                    visible={roleVisible}
                    onOk={this.handleOk}
                    confirmLoading={false}
                    onCancel={this.handleCancel}
                    width={1000}
                    footer={
                        [] // 设置footer为空，去掉 取消 确定默认按钮
                    }
                >
                    <Form name="basic" layout="inline" initialValues={addInitialValues} onFinish={this.onFinish}>
                        <Form.Item label="名称" name="adminUserId" rules={[{ required: true, message: '请选择用户!' }]}>
                            <Select allowClear placeholder="请选择" onChange={this.isActiveChange}>
                                { allUserList.map((item, index) => {
                                    return (
                                        <Option value={item.id} key={index}>{item.username}</Option>
                                    )
                                }) }
                            </Select>
                        </Form.Item>
                        <Form.Item style={{display: 'block', width: '100%'}}>
                            <div className="allTree">
                                <div className="tree_content">
                                    {  allTree.map((item, index) => {
                                        return (
                                            <div className="t_c_line" key={index}>
                                                <div className="l_left"><Checkbox checked={item.checked} onChange={e => this.onParentChange(e.target.checked, index)}>{item.remark}</Checkbox></div>
                                                <div className="l_right">
                                                    { item.children.map((item01, index01) => {
                                                        return (
                                                            <div className="l_r_line" key={index01}><Checkbox checked={item01.checked} onChange={e => this.onChildrenChange(e.target.checked, index, index01)}>{item01.remark}</Checkbox></div>
                                                        )
                                                    }) }
                                                </div>
                                            </div>
                                        )
                                    }) }

                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item {...tailLayout} style={{display: 'block', width: '100%'}}>
                            <Button type="primary" htmlType="submit">确定</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button onClick={this.handleCancel}>取消</Button>
                        </Form.Item>
                    </Form>
                </Modal> : null}

            </div>
        )

    }
}
