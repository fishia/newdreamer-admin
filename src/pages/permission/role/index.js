import React from 'react'
import { Button, Input, Table, Modal, message, Select, Form, Checkbox } from 'antd'
import moment from 'moment'
import './index.less'
import {
  queryAllRole,
  queryAllTree,
  createRole,
  queryPermissionByRoleId,
  updateRole,
  deleteRole,
} from './action'
const { Option } = Select
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roleList: [],
      searchForm: {
        roleName: '',
      },
      addInitialValues: {
        roleName: '', // 角色名称
        remark: '', // 角色备注
      }, // 默认值
      roleVisible: false, // 是否打开弹窗
      allTree: [], // 所有权限 树结构
      editState: '', // add || edit
      rowData: {}, // 当前操作的行数据
    }
  }
  componentDidMount() {
    this.pageData()
  }
  searchClick = () => {
    this.pageData()
  }

  resetClick = () => {
    this.setState(
      {
        searchForm: {
          roleName: '',
        },
      },
      () => {
        this.pageData()
      }
    )
  }

  updateSearch(key, e) {
    // console.log(e)
    let params = { ...this.state.searchForm }
    Object.getOwnPropertyNames(params).forEach(function (k) {
      params[key] = e
    })
    this.setState({
      searchForm: params,
    })
  }
  pageData() {
    let _pageInfo = { ...this.state.searchForm }
    // _pageInfo.page -= 1;
    queryAllRole(_pageInfo).then(res => {
      if (res) {
        const { data } = res
        // console.log(data);
        data.forEach(e => {
          e.key = e.id
        })
        this.setState({
          roleList: data,
        })
      }
    })
    // console.log(this.state.searchForm);
  }
  // 查询所有权限 树结构
  queryAllTree(row) {
    queryAllTree().then(res => {
      const { data } = res
      data.forEach(item => {
        item.checked = false
        item.children.forEach(item01 => {
          item01.checked = false
        })
      })
      // 如果存在id则是点击的修改按钮
      if (row) {
        // 获取当前选中角色的权限
        queryPermissionByRoleId({ roleId: row.id }).then(res01 => {
          // console.log(data);
          let permission = res01.data //
          let idArr = [] // 存储所有已存在的权限id
          permission.forEach(item => {
            idArr.push(item.id)
          })
          // console.log(idArr);
          data.forEach(item => {
            let check = false // 如果子元素存在checked === false就将check设置为true否则为false
            item.children.forEach(item01 => {
              // 判断是否存在权限
              if (idArr.indexOf(item01.id) !== -1) {
                item01.checked = true
              }
              if (!item01.checked) {
                check = true
              }
            })
            // 当存在权限 并且 子元素都有权限时 设置父元素的选中效果
            if (idArr.indexOf(item.id) !== -1 && !check) {
              item.checked = true
            }
          })

          this.setState(
            {
              allTree: data,
              addInitialValues: {
                roleName: row.roleName, // 角色名称
                remark: row.remark, // 角色备注
              }, // 默认值
              rowData: row,
              roleVisible: true,
            },
            () => {
              console.log(this.state.addInitialValues)
            }
          )
        })
      } else {
        this.setState({
          allTree: data,
          roleVisible: true,
        })
      }
    })
  }
  // 打开新增弹窗
  openAddPopup = (state, row) => {
    // console.log(row);
    this.setState({
      editState: state,
    })
    if (state === 'edit') {
      this.queryAllTree(row)
    } else if (state === 'add') {
      this.queryAllTree()
    }
  }
  //  操作成功关闭弹窗
  handleOk = () => {
    // this.props.handleOk();
  }
  // 关闭弹窗
  handleCancel = () => {
    this.setState({
      roleVisible: false,
      allTree: [],
      editState: '',
      rowData: {},
      addInitialValues: {
        roleName: '', // 角色名称
        remark: '', // 角色备注
      }, // 默认值
    })
    this.pageData()
  }
  onFinish = values => {
    // console.log(values);
    // console.log(this.state.allTree);
    let permissions = [] // 组装权限
    this.state.allTree.forEach(item => {
      let check = false
      item.children.forEach(item01 => {
        if (item01.checked) {
          check = true
          permissions.push({
            id: item01.id,
            name: item01.name,
            parentId: item01.parentId,
            remark: item01.remark,
          })
        }
      })
      // 父元素被选中 或者 子元素有被选中的都要将数据传到后台
      if (item.checked || check) {
        permissions.push({
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          remark: item.remark,
        })
      }
    })
    // console.log(permissions);
    values.permissions = permissions
    // 新增
    if (this.state.editState === 'add') {
      createRole(values).then(res => {
        // console.log(res);
        if (res.code === 200) {
          message.success('操作成功')
          this.handleCancel()
        }
      })
    } else if (this.state.editState === 'edit') {
      values.id = this.state.rowData.id
      updateRole(values).then(res => {
        // console.log(res);
        if (res.code === 200) {
          message.success('操作成功')
          this.handleCancel()
        }
      })
    }
  }
  deleteClick = record => {
    deleteRole({ roleId: record.id }).then(res => {
      if (res.code === 200) {
        message.success('删除成功！')
        this.pageData()
      }
    })
  }
  // 点击父按钮
  onParentChange = (e, index) => {
    // console.log(e);
    // console.log(item);
    // console.log(index);
    let allTree = this.state.allTree
    allTree[index].checked = e
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
      allTree: allTree,
    })
    // console.log(allTree)
  }
  // 点击子按钮
  onChildrenChange = (e, index, index01) => {
    let allTree = this.state.allTree
    allTree[index].children[index01].checked = e
    // 判断子元素选中状态，设置父元素的选中效果
    let check = true
    allTree[index].children.forEach(item => {
      if (!item.checked) {
        check = false
      }
    })
    allTree[index].checked = check
    this.setState({
      allTree: allTree,
    })
    // console.log(allTree)
  }

  render() {
    const { addInitialValues, roleVisible, roleList, allTree } = this.state
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    }
    const tailLayout = {
      wrapperCol: { offset: 10, span: 16 },
    }
    const columns = [
      { title: '角色名称', dataIndex: 'roleName', width: 120, align: 'center' },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        width: 160,
        align: 'center',
        render: (value, record) => <span>{moment(record.createdTime).format('YYYY-MM-DD')}</span>,
      },
      { title: '备注', dataIndex: 'remark', width: 120, align: 'center' },
      {
        title: '操作',
        dataIndex: 'channel',
        width: 80,
        align: 'center',
        render: (value, record) => (
          <div>
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
      <div className="role">
        <div className="search-box">
          <section className="product-manager-search">
            <div className="manager-search-item">
              <div className="search-item__title">角色名称</div>
              <Input
                size="small"
                placeholder="请输入角色名称"
                value={this.state.searchForm.roleName}
                onChange={e => this.updateSearch('roleName', e.target.value)}
              />
            </div>
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
        <Table dataSource={roleList} columns={columns} />
        {this.state.roleVisible ? (
          <Modal
            title={this.state.editState === 'add' ? '新增角色权限' : '修改角色权限'}
            visible={roleVisible}
            onOk={this.handleOk}
            confirmLoading={false}
            onCancel={this.handleCancel}
            width={1000}
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
                label="名称"
                name="roleName"
                rules={[{ required: true, message: '请输入名称!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="备注" name="remark">
                <Input />
              </Form.Item>
              <Form.Item style={{ display: 'block', width: '100%' }}>
                <div className="allTree">
                  <div className="tree_content">
                    {allTree.map((item, index) => {
                      return (
                        <div className="t_c_line" key={index}>
                          <div className="l_left">
                            <Checkbox
                              checked={item.checked}
                              onChange={e => this.onParentChange(e.target.checked, index)}
                            >
                              {item.remark}
                            </Checkbox>
                          </div>
                          <div className="l_right">
                            {item.children.map((item01, index01) => {
                              return (
                                <div className="l_r_line" key={index01}>
                                  <Checkbox
                                    checked={item01.checked}
                                    onChange={e =>
                                      this.onChildrenChange(e.target.checked, index, index01)
                                    }
                                  >
                                    {item01.remark}
                                  </Checkbox>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
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
