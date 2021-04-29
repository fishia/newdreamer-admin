import React from 'react';
import {Button, Input, Select, Table, RangePicker} from 'antd/lib/index';
import './index.less'
export default class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    componentDidMount() {

    }

    updateSearch (key, e) {
        console.log(key, e)
    }

    render () {
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            }
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        return (
            <div className="couponSetting">
                <div className="search-box">
                  <section className="product-manager-search">
                    <div className="manager-search-item">
                      <div className="search-item__title">订单号</div>
                      <Input size="small" placeholder="请输入订单号" onChange={e => this.updateSearch('orderId', e.target.value)} />
                    </div>
                    <div className="manager-search-item">
                      <div className="search-item__title">收货人名称</div>
                      <Input size="small" placeholder="请输入收货人名称" onChange={e => this.updateSearch('customerName', e.target.value)} />
                    </div>
                    <div className="manager-search-item">
                      <div className="search-item__title">电话</div>
                      <Input size="small" placeholder="请输入电话" onChange={e => this.updateSearch('phone', e.target.value)} />
                    </div>

                    {/*<div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>*/}
                  </section>
                  <section className="sear-add">
                    <Button type="primary">新增</Button>
                  </section>
                </div>

                <Table dataSource={dataSource} columns={columns} />
            </div>
        )

    }
}
