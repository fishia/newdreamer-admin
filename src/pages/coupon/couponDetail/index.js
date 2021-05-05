import React from 'react';
import { Button, Input, Table, Modal, message } from 'antd/lib/index';
import { queryAllCustomerCoupon } from '../../../api/coupon';
import './index.less'
import moment from 'moment'
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchForm: {

      },
      pageInfo: {
        page: 1,
        size: 10
      },
      tableSize: 0,
      couponDetailList: [],
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
    queryAllCustomerCoupon(_pageInfo).then(res => {
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
        couponDetailList: data.content
      })
    })
    // console.log(this.state.searchForm);
  }
  onPageChange = (page, pageSize) => {
    console.log(page, pageSize)
    this.pageData()
  }

  render() {
    const { couponDetailList, pageInfo, tableSize } = this.state;
    const columns = [
      //  缺失 优惠券明细编码、销售数量、作废时间、作废原因
      { title: '优惠券明细编码', dataIndex: 'couponCode', width: 180, align: 'center' },
      { title: '优惠券编码', dataIndex: 'couponCode', width: 180, align: 'center' },
      // { title: '优惠券名称', dataIndex: 'couponName', width: 200, align: 'center' },
      {
        title: '优惠券类型', dataIndex: 'couponType', width: 200,
        render: (value) => <span>{value === "CASH" ? '现金' : value === "RATE" ? '折扣' : ''}</span>,
        align: 'center'
      },
      {
        title: '创建明细时间', dataIndex: 'createdTime', width: 200,
        render: (value) => <span>{moment(value).format('YYYY-MM-DD')}</span>,
        align: 'center'
      },
      { title: '来源渠道', dataIndex: 'channel', width: 280, align: 'center' },
      {
        title: '是否使用', dataIndex: 'isUsed', width: 200,
        render: (value) => <span>{value ? '是' : '否'}</span>,
        align: 'center'
      },
      { title: '订单编号', dataIndex: 'order_Id', width: 300, align: 'center' },
      { title: '实际销售金额', dataIndex: 'total_Received_Amount', width: 300, align: 'center' },
      { title: '优惠金额', dataIndex: 'totalDiscountAmount', width: 300, align: 'center' },
      { title: '销售数量', dataIndex: 'totalDiscountAmount', width: 300, align: 'center' },
      {
        title: '是否失效', dataIndex: 'enable', width: 200,
        render: (value) => <span>{value ? '是' : '否'}</span>,
        align: 'center'
      }
    ];

    return (
      <div className="couponDetailed">
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
        </div>
        <Table dataSource={couponDetailList} columns={columns}
          scroll={{ x: 2000 }}
          pagination={{
            current: pageInfo.page,
            total: tableSize,
            onChange: this.onPageChange
          }} />

      </div>
    )

  }
}
