import React from 'react'
import { Button, Input, Table, Modal, message, Select, Form } from 'antd'
import { queryAll, queryAllRole, registerUser, updateUser, deleteUser } from './action'
import moment from 'moment'
import './index.less'
import { MySelect, SupplierSelect } from '@/components/custom/select'
import { enumSuperset } from '@/utils/contants'
const { Option } = Select
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchForm: {
        name: '', // 名称
        username: '', // 账号
      },
      accountList: [],
      accountVisible: false,
      addInitialValues: {
        isActive: true,
      },
      allRoleList: [], // 角色列表
      editState: '', // add || edit
      rowData: {}, // 当前操作的行数据
    }
  }
  componentDidMount() {
    this.pageData()
    this.queryAllRole()
  }
  pageData() {
    let _pageInfo = { ...this.state.searchForm }
    // _pageInfo.page -= 1;
    queryAll(_pageInfo).then(res => {
      if (res) {
        const { data } = res
        // console.log(data);
        data.forEach(e => {
          e.key = e.id
        })
        this.setState({
          accountList: data,
        })
      }
    })
    // console.log(this.state.searchForm);
  }
  // 角色列表
  queryAllRole() {
    queryAllRole().then(res => {
      if (res) {
        let { data } = res
        // console.log(data)
        this.setState({
          allRoleList: data,
        })
      }
    })
  }
  searchClick = () => {
    this.pageData()
  }

  resetClick = () => {
    this.setState(
      {
        searchForm: {
          name: '', // 名称
          username: '', // 账号
        },
      },
      () => {
        this.pageData()
      }
    )
  }

  updateSearch(key, e) {
    let params = { ...this.state.searchForm }
    Object.getOwnPropertyNames(params).forEach(function (k) {
      params[key] = e
    })
    this.setState({
      searchForm: params,
    })
  }
  //  操作成功关闭弹窗
  handleOk = () => {
    // this.props.handleOk();
  }
  // 关闭弹窗
  handleCancel = () => {
    this.setState({
      accountVisible: false,
      editState: '', // add || edit
      rowData: {}, // 当前操作的行数据
      addInitialValues: {
        isActive: true,
      },
    })
    this.pageData()
  }
  onFinish = values => {
    // console.log(values);
    if (this.state.editState === 'add') {
      registerUser(values).then(res => {
        if (res.code === 200) {
          message.success('操作成功')
          this.handleCancel()
          // this.pageData();
        }
      })
    } else if (this.state.editState === 'edit') {
      values.id = this.state.rowData.id
      let params = { ...values }
      // 如果没修改密码，则不传该参数
      if (!params.password || params.password === undefined) {
        delete params.password
      }
      // console.log(params);
      updateUser(params).then(res => {
        if (res.code === 200) {
          message.success('操作成功')
          this.handleCancel()
          // this.pageData();
        }
      })
    }
  }
  openAddPopup(state, row) {
    // console.log(state)
    // console.log(row)
    this.setState({
      accountVisible: true,
      editState: state,
    })
    if (state === 'edit') {
      this.setState({
        rowData: row,
        addInitialValues: row,
      })
    }
  }
  isActiveChange = e => {
    // console.log(e)
  }
  deleteClick = record => {
    deleteUser({ userId: record.id }).then(res => {
      if (res.code === 200) {
        message.success('删除成功！')
        this.pageData()
      }
    })
  }

  render() {
    const { accountList, accountVisible, addInitialValues, allRoleList, editState } = this.state
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    }
    const tailLayout = {
      wrapperCol: { offset: 10, span: 16 },
    }
    const columns = [
      { title: '账号', dataIndex: 'username', width: 80, align: 'center' },
      { title: '名称', dataIndex: 'name', width: 120, align: 'center' },
      { title: '角色', dataIndex: 'roleName', width: 120, align: 'center' },
      {
        title: '账号类型',
        dataIndex: 'userType',
        width: 120,
        align: 'center',
        render: text => enumSuperset['userType'].filter(item => item.value === text)[0]?.label,
      },
      { title: '所属部门(或公司)', dataIndex: 'dept', width: 180, align: 'center' },
      {
        title: '最后登录时间',
        dataIndex: 'lastLoginTime',
        width: 150,
        align: 'center',
        render: (value, record) => (
          <span>
            {record.lastLoginTime ? moment(record.lastLoginTime).format('YYYY-MM-DD') : ''}
          </span>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        width: 160,
        align: 'center',
        render: (value, record) => <span>{moment(record.createdTime).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '启用',
        dataIndex: 'isActive',
        width: 120,
        align: 'center',
        render: (value, record) => <span>{record.isActive ? '启用' : '禁用'}</span>,
      },
      {
        title: '操作',
        dataIndex: 'channel',
        width: 180,
        align: 'center',
        render: (value, record) => (
          <div style={{ width: '180px' }}>
            <Button
              type="primary"
              style={{ marginRight: '20px' }}
              onClick={() => {
                this.openAddPopup('edit', record)
              }}
            >
              修改
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.deleteClick(record)
              }}
            >
              删除
            </Button>
          </div>
        ),
        fixed: 'right',
      },
    ]
    return (
      <div className="account">
        <div className="search-box">
          <section className="product-manager-search">
            <div className="manager-search-item">
              <div className="search-item__title">账号</div>
              <Input
                size="small"
                placeholder="请输入账号"
                value={this.state.searchForm.username}
                onChange={e => this.updateSearch('username', e.target.value)}
              />
            </div>
            <div className="manager-search-item">
              <div className="search-item__title">名称</div>
              <Input
                size="small"
                placeholder="请输入名称"
                value={this.state.searchForm.name}
                onChange={e => this.updateSearch('name', e.target.value)}
              />
            </div>
            {/*<div className="manager-search-btn"><Button onClick={this.pageData.bind(this)} type="primary" >筛选</Button></div>*/}
            <div className="manager-search-btn">
              <Button onClick={this.searchClick} type="primary">
                筛选
              </Button>
            </div>
            <div className="manager-search-btn">
              <Button onClick={this.resetClick} type="primary">
                重置
              </Button>
            </div>
          </section>
          <section className="sear-add">
            <Button
              type="primary"
              onClick={() => {
                this.openAddPopup('add')
              }}
            >
              新增
            </Button>
          </section>
        </div>
        <Table dataSource={accountList} columns={columns} />
        {this.state.accountVisible ? (
          <Modal
            title={this.state.editState === 'add' ? '新增账号' : '修改账号'}
            visible={accountVisible}
            onOk={this.handleOk}
            confirmLoading={false}
            onCancel={this.handleCancel}
            width={800}
            footer={
              [] // 设置footer为空，去掉 取消 确定默认按钮
            }
          >
            <Form
              name="basic"
              layout="inline"
              initialValues={addInitialValues}
              onFinish={this.onFinish}
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[{ required: true, message: '请输入账号!' }]}
              >
                <Input disabled={editState === 'edit'} />
              </Form.Item>
              <Form.Item label="名称" name="name">
                <Input />
              </Form.Item>
              <Form.Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: '请输入手机号!' }]}
              >
                <Input />
              </Form.Item>
              {editState === 'add' ? (
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码!' }]}
                >
                  <Input.Password />
                </Form.Item>
              ) : (
                <Form.Item label="密码" name="password">
                  <Input />
                </Form.Item>
              )}
              <Form.Item
                label="角色"
                name="roleId"
                rules={[{ required: true, message: '请选择角色!' }]}
              >
                <Select allowClear placeholder="请选择" onChange={this.isActiveChange}>
                  {allRoleList.map((item, index) => {
                    return (
                      <Option value={item.id} key={index}>
                        {item.roleName}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="账号类型"
                name="userType"
                rules={[{ required: true, message: '请选择账号类型!' }]}
              >
                <MySelect datasource={enumSuperset['userType']} />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) => prevValues.userType !== curValues.userType}
              >
                {({ getFieldValue }) =>
                  getFieldValue('userType') === 'SUPPLIER' ? (
                    <Form.Item
                      label="供应商绑定"
                      name="supplierId"
                      rules={[{ required: true, message: '请选择供应商!' }]}
                    >
                      <SupplierSelect />
                    </Form.Item>
                  ) : (
                    ''
                  )
                }
              </Form.Item>
              <Form.Item label="部门" name="dept">
                <Input />
              </Form.Item>
              <Form.Item label="启用" name="isActive">
                <Select allowClear placeholder="请选择" onChange={this.isActiveChange}>
                  <Option value={true}>启用</Option>
                  <Option value={false}>停用</Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout} style={{ display: 'block', width: '100%' }}>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.handleCancel}>取消</Button>
              </Form.Item>
            </Form>
          </Modal>
        ) : null}
      </div>
    )
  }
}
