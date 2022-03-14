import React from 'react'
import { Button, Input, Table, message, Select, Tooltip } from 'antd'
import { requestcoupomList, couponDelete, exportCoupon } from './action'
import moment from 'moment'
import './index.less'
import AddCoupon from '../../../components/coupon/addCoupon/index'
import QRCODE from '@/components/custom/qrcode'
import { getQrcode } from '@/services/baseRemote'
import { ExportOutlined } from '@ant-design/icons'
const { Option } = Select

const initSearchForm = {
  couponCode: '',
  couponType: '',
  activityName: '',
  channel: '',
}
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchForm: {
        ...initSearchForm,
      },
      pageInfo: {
        page: 1,
        size: 10,
      },
      tableSize: 0,
      coupomList: [],
      visible: false, // 打开新增弹窗
      confirmLoading: false,
      rowData: {}, // 行数据
      editStatue: false, // 点击修改时设置为true
      qrcodeUrl: '',
    }
  }
  componentDidMount() {
    this.pageData()
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
    let _pageInfo = { ...this.state.pageInfo, ...this.state.searchForm }
    _pageInfo.page -= 1
    requestcoupomList(_pageInfo).then(res => {
      const { data } = res
      data.content.forEach(e => {
        e.key = e.id
      })
      this.setState({
        tableSize: data.totalElements,
        coupomList: data.content,
      })
    })
  }
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        pageInfo: {
          page: page,
          size: pageSize,
        },
      },
      () => {
        this.pageData()
      }
    )
  }

  updateListInfo(record) {
    // console.log(record);
    this.setState({
      rowData: record,
      editStatue: true,
      visible: true,
    })
  }
  // 删除
  updateDelData(record) {
    // console.log(record);
    couponDelete(record.id).then(res => {
      // console.log(res)
      if (res.code === 200) {
        message.success('操作成功')
        this.pageData()
      }
    })
  }

  addListData() {
    this.setState({
      visible: true,
    })
    // console.log(this.state.coupomList);
  }
  //  新增成功，刷新列表
  handleOk = () => {
    this.pageData()
    this.handleCancel() // 关闭弹窗
  }
  //  关闭弹窗
  handleCancel = () => {
    this.setState({
      visible: false,
    })
    //  如果是通过点击修改打开的弹窗，关闭时清空数据并重置状态
    if (this.state.editStatue) {
      this.setState({
        rowData: {},
        editStatue: false,
      })
    }
  }

  // 查询
  searchClick = () => {
    this.setState(
      {
        pageInfo: {
          page: 1,
          size: 10,
        },
      },
      () => {
        this.pageData()
      }
    )
  }

  // 重置
  resetClick = () => {
    this.setState(
      {
        pageInfo: {
          page: 1,
          size: 10,
        },
        searchForm: {
          ...initSearchForm,
        },
      },
      () => {
        this.pageData()
      }
    )
  }

  render() {
    const { pageInfo, tableSize, coupomList, visible, editStatue, rowData, qrcodeUrl } = this.state
    const columns = [
      { title: '优惠券编码', dataIndex: 'couponCode', width: 120, align: 'center' },
      { title: '优惠券名称', dataIndex: 'couponName', width: 120, align: 'center' },
      { title: '活动名称', dataIndex: 'activityName', width: 160, align: 'center' },
      {
        title: '允许发放',
        dataIndex: 'allowGrant',
        width: 100,
        render: value => <span>{value ? '是' : '否'}</span>,
        align: 'center',
      },
      {
        title: '是否有效',
        dataIndex: 'enable',
        width: 100,
        render: value => <span>{value ? '是' : '否'}</span>,
        align: 'center',
      },
      {
        title: '优惠券类型',
        dataIndex: 'couponType',
        width: 80,
        render: value => <span>{value === 'CASH' ? '现金' : value === 'RATE' ? '折扣' : ''}</span>,
        align: 'center',
      },
      {
        title: '满足订单金额/优惠金额',
        dataIndex: 'productNum',
        width: 160,
        render: (value, record) => (
          <span>
            {record.orderAmount} / {record.discountAmount}
          </span>
        ),
        align: 'center',
      },
      {
        title: '满足商品数量/折扣率',
        dataIndex: 'discountAmount',
        width: 160,
        render: (value, record) => (
          <span>
            {record.productNum} / {record.discountRate}
          </span>
        ),
        align: 'center',
      },
      {
        title: '是否可以分享',
        dataIndex: 'share',
        width: 160,
        render: (value, record) => <span>{value ? '是' : '否'}</span>,
        align: 'center',
      },
      {
        title: '有效时间类型',
        dataIndex: 'limitTimeType',
        width: 80,
        align: 'center',
        render: (value, record) => (
          <span>
            {record.limitTimeType === 'ABSOLUTE'
              ? '时间段'
              : record.limitTimeType === 'COUNTDOWN'
              ? '倒计时'
              : ''}
          </span>
        ),
      },
      {
        title: '有效活动期间',
        dataIndex: 'limitTimeType',
        width: 160,
        align: 'center',
        render: (value, record) => (
          <span>
            {record.limitTimeType === 'ABSOLUTE'
              ? `${moment(record.startTime).format('YYYY-MM-DD')} ~ ${moment(record.endTime).format(
                  'YYYY-MM-DD'
                )}`
              : record.limitTimeType === 'COUNTDOWN'
              ? `${record.countdownDay}天`
              : ''}
          </span>
        ),
      },
      // {
      //   title: '有效活动期间', dataIndex: 'startTime', width: 200, align: 'center', render: (value, record) => <span>{value ? moment(value).format('YYYY-MM-DD') : ''}</span>,
      //
      // },
      // { title: '优惠范围（分类）', dataIndex: 'share', width: 200, align: 'center' },
      // { title: '优惠范围（sku）', dataIndex: 'share', width: 200 },
      // { title: '折扣方式', dataIndex: 'share', width: 200, align: 'center' },
      { title: '活动渠道（备注活动）', dataIndex: 'channel', width: 160, align: 'center' },
      {
        title: '操作',
        dataIndex: 'channel',
        width: 200,
        align: 'center',
        render: (value, record, index) => (
          <div>
            <Button
              type="primary"
              style={{ marginRight: '20px' }}
              onClick={() => {
                this.updateListInfo(record)
              }}
            >
              修改
            </Button>
            <Tooltip
              title={qrcodeUrl ? <QRCODE url={qrcodeUrl} /> : '二维码生成中...'}
              trigger="click"
              key={index}
            >
              <Button
                type="primary"
                onClick={() => {
                  //获取二维码
                  getQrcode({
                    scene: record.couponCode,
                    width: 120,
                    path: '/pages/my/coupon/receiveCoupon/receiveCoupon',
                  }).then(res => {
                    if (res.data)
                      this.setState({
                        qrcodeUrl: `data:image/png;base64,${res.data}`,
                      })
                  })
                }}
              >
                生成二维码
              </Button>
            </Tooltip>
          </div>
        ),
        fixed: 'right',
      },
    ]
    return (
      <div className="couponSetting">
        <div className="search-box">
          <section className="product-manager-search">
            <div className="manager-search-item">
              <div className="search-item__title">优惠券编码</div>
              <Input
                placeholder="请输入优惠券编码"
                value={this.state.searchForm.couponCode}
                onChange={e => this.updateSearch('couponCode', e.target.value)}
              />
            </div>
            <div className="manager-search-item">
              <div className="search-item__title">优惠券类型</div>
              {/*<Input size="small" placeholder="请输入优惠券类型" onChange={e => this.updateSearch('couponType', e.target.value)} />*/}
              <Select
                style={{ width: 177 }}
                allowClear
                placeholder="请选择优惠券类型"
                value={this.state.searchForm.couponType}
                onChange={e => this.updateSearch('couponType', e)}
              >
                <Option value="CASH">现金</Option>
                <Option value="RATE">折扣</Option>
              </Select>
            </div>
            <div className="manager-search-item">
              <div className="search-item__title">活动名称</div>
              <Input
                placeholder="请输入活动名称"
                value={this.state.searchForm.activityName}
                onChange={e => this.updateSearch('activityName', e.target.value)}
              />
            </div>
            <div className="manager-search-item">
              <div className="search-item__title">活动渠道</div>
              <Input
                placeholder="请输入活动渠道"
                value={this.state.searchForm.channel}
                onChange={e => this.updateSearch('channel', e.target.value)}
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
            <Button type="primary" onClick={this.addListData.bind(this)}>
              新增
            </Button>
            <Button type="primary" icon={<ExportOutlined />} onClick={() => exportCoupon()}>
              导出
            </Button>
          </section>
        </div>

        <Table
          dataSource={coupomList}
          columns={columns}
          scroll={{ x: 2000 }}
          pagination={{
            current: pageInfo.page,
            total: tableSize,
            onChange: this.onPageChange,
          }}
        />
        {visible ? (
          <AddCoupon
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            editStatue={editStatue}
            rowData={rowData}
          ></AddCoupon>
        ) : null}
      </div>
    )
  }
}
