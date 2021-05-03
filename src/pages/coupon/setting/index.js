import React from 'react';
import { Button, Input, Table, Modal } from 'antd/lib/index';
import { requestcoupomList } from './action';
import moment from 'moment'
import './index.less'
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchForm: {
        couponCode: '',
        couponType: ''
      },
      pageInfo: {
        page: 1,
        size: 10
      },
      tableSize: 0,
      coupomList: [],
      visible: false,
      confirmLoading: false
    }
  }
  componentDidMount() {
    this.pageData()
  }

  updateSearch(key, e) {
    let params = { ...this.state.searchForm }
    Object.getOwnPropertyNames(params).forEach(function (k) {
      params[key] = e
    })
    this.setState({
      searchForm: params
    })
  }
  pageData() {
    let _pageInfo = { ...this.state.pageInfo, ...this.state.searchForm };
    _pageInfo.page -= 1;
    requestcoupomList(_pageInfo).then(res => {
      const { data } = res
      data.content.forEach(e => {
        e.key = e.id
      });
      console.log(data.content, '数据');
      // setTableSize(data.totalElements)
      // let content = data.content.filter(item => item.volumer_Address !== "1")
      // updateSource(content)
      this.setState({
        tableSize: data.totalElements,
        coupomList: data.content
      })
    })
    // console.log(this.state.searchForm);
  }
  onPageChange() {

  }

  updateListInfo(record) {
    console.log(record);
  }
  updateDelData(record) {
    console.log(record);
  }

  addListData() {
    this.setState({
      visible: true
    })
    console.log(this.state.coupomList);
  }
  handleOk () {

  }
  confirmLoading () {

  }
  handleCancel () {

  }

  render() {
    const { pageInfo, tableSize, coupomList,visible, confirmLoading } = this.state
    const columns = [
      { title: '优惠券编码', dataIndex: 'couponCode', width: 180, align: 'center' },
      { title: '优惠券名称', dataIndex: 'couponName', width: 200, align: 'center' },
      { title: '活动名称', dataIndex: 'activityName', width: 300, align: 'center' },
      {
        title: '允许发放', dataIndex: 'allowGrant', width: 200,
        render: (value) => <span>{value ? '是' : '否'}</span>,
        align: 'center'
      },
      {
        title: '是否有效', dataIndex: 'enable', width: 200,
        render: (value) => <span>{value ? '是' : '否'}</span>,
        align: 'center'
      },
      {
        title: '优惠券类型', dataIndex: 'couponType', width: 200,
        render: (value) => <span>{value === "CASH" ? '现金' : value === "RATE" ? '折扣' : ''}</span>,
        align: 'center'
      },
      {
        title: '满减条件/满足商品数量', dataIndex: 'productNum', width: 200,
        render: (value, record) => <span>{record.orderAmount} / {record.productNum}</span>,
        align: 'center'
      },
      {
        title: '优惠金额/折扣率', dataIndex: 'discountAmount', width: 200,
        render: (value, record) => <span>{record.discountAmount} / {record.discountRate}</span>,
        align: 'center'
      },
      {
        title: '是否可以分享', dataIndex: 'share', width: 230,
        render: (value, record) => <span>{value ? '是' : '否'}</span>,
        align: 'center'
      },
      {
        title: '有效时间类型', dataIndex: 'limitTimeType', width: 200, align: 'center',
        render: (value, record) => <span>{record.limitTimeType === "ABSOLUTE" ? `${moment(record.startTime).format('YYYY-MM-DD')} ~ ${record.endTime}` : record.limitTimeType === "COUNTDOWN" ? `${record.countdownDay}天` : ''}</span>,
      },
      {
        title: '有效活动期间', dataIndex: 'startTime', width: 200, align: 'center', render: (value, record) => <span>{value ? moment(value).format('YYYY-MM-DD') : ''}</span>,

      },
      // { title: '优惠范围（分类）', dataIndex: 'share', width: 200, align: 'center' },
      // { title: '优惠范围（sku）', dataIndex: 'share', width: 200 },
      // { title: '折扣方式', dataIndex: 'share', width: 200, align: 'center' },
      { title: '活动渠道（备注活动）', dataIndex: 'channel', width: 280, align: 'center' },
      {
        title: '操作', dataIndex: 'channel', width: 240, align: 'center',
        render: (value, record) => <div>
          <Button type="primary" style={{ "marginRight": "20px" }} onClick={() => { this.updateListInfo(record) }}>修改</Button>
          <Button type="primary" onClick={() => { this.updateDelData(record) }}>删除</Button>
        </div>,
        fixed: 'right'
      },
    ];
    return (
      <div className="couponSetting">
        <div className="search-box">
          <section className="product-manager-search">
            <div className="manager-search-item">
              <div className="search-item__title">优惠券编码</div>
              <Input size="small" placeholder="请输入优惠券编码" onChange={e => this.updateSearch('couponCode', e.target.value)} />
            </div>
            <div className="manager-search-item">
              <div className="search-item__title">优惠券类型</div>
              <Input size="small" placeholder="请输入优惠券类型" onChange={e => this.updateSearch('couponType', e.target.value)} />
            </div>
            <div className="manager-search-btn"><Button onClick={this.pageData.bind(this)} type="primary" >筛选</Button></div>
          </section>
          <section className="sear-add">
            <Button type="primary" onClick={this.addListData.bind(this)}>新增</Button>
          </section>
        </div>

        <Table dataSource={coupomList} columns={columns}
          scroll={{ x: 2000 }}
          pagination={{
            current: pageInfo.page,
            total: tableSize,
            onChange: this.onPageChange.bind(this)
          }} />

        <Modal
          title="Title"
          visible={visible}
          onOk={() => {this.handleOk.bind(this)}}
          confirmLoading={confirmLoading}
          onCancel={() => {this.handleCancel.bind(this)}}
        >
          <p>ceshi</p>
        </Modal>

      </div>
    )

  }
}
