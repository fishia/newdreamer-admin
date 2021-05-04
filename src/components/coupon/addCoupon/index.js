import React from 'react';
import { Form, Input, Button, Modal, Select, Checkbox, DatePicker, message } from 'antd/lib/index';
import './index.less'
import moment from 'moment'
import { couponCreate, couponUpdate } from '../../../api/coupon'
const { Option } = Select;
const { RangePicker } = DatePicker;
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addInitialValues: {
        allowGrant: true, // 量体师是否可以发放
        enable: true, // 是否有效
        share: true // 是否可以分享
      }, // 设置默认值
    }
  }
  componentDidMount() {
    // console.log(this.props)
    //  通过点击修改按钮打开弹窗  设置默认数据
    if (this.props.editStatue) {
    let rowData = this.props.rowData;
    if (rowData.startTime && rowData.endTime) {
      let startTime = moment(rowData.startTime).format('YYYY/MM/DD');
      let endTime = moment(rowData.endTime).format('YYYY/MM/DD');
      rowData.times = [moment(startTime), moment(endTime)]
    }
     this.setState({
      addInitialValues: this.props.rowData
     }) 
    }
  }

  //  操作成功关闭弹窗
  handleOk = () => {
    this.props.handleOk();
  }

  handleCancel =() => {
    this.props.handleCancel();
  }
  
  onFinish = (values) => {
    if (!this.props.editStatue) {
      //  新增
      values.startTime = moment(values.times[0]).format('YYYY-MM-DD');
      values.endTime = moment(values.times[1]).format('YYYY-MM-DD');
      // console.log('Success:', values);
      let params = {...values}
      delete params.times
      // console.log(params)
      couponCreate(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          message.success('操作成功');
          this.handleOk();
        }
      })
    } else {
      //  修改
      // console.log(values)
      let params = {
        id: this.props.rowData.id,
        allowGrant: values.allowGrant,
        enable: values.enable,
        share: values.share
      }
      couponUpdate(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          message.success('操作成功');
          this.handleOk();
        }
      })
    }
    
    // this.props.handleOk();
  };

  render() {
    const { addInitialValues } = this.state;
    const editStatue = this.props.editStatue; // 是否为修改操作
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };
    const tailLayout = {
        wrapperCol: { offset: 10, span: 16 },
    };
    return (
      <div className="addCoupon">
         <Modal
          title="新增优惠券"
          visible={true}
          onOk={this.handleOk}
          confirmLoading={false}
          onCancel={this.handleCancel}
          width={1000}
          footer={
            [] // 设置footer为空，去掉 取消 确定默认按钮
          }
        >
          <Form name="basic" layout="inline" initialValues={addInitialValues} onFinish={this.onFinish}>
              {/* <Form.Item label="优惠券编码" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input />
              </Form.Item> */}
              <Form.Item label="优惠券名称" name="couponName" rules={[{ required: true, message: '请输入优惠券名称!' }]}>
                <Input disabled={editStatue}/>
              </Form.Item>
              <Form.Item label="活动名称" name="activityName" rules={[{ required: true, message: '请输入活动名称 !' }]}>
                <Input disabled={editStatue}/>
              </Form.Item>
              <Form.Item label="优惠券类型" name="couponType" rules={[{ required: true, message: '请选择优惠券类型!' }]}>
                <Select allowClear placeholder="请选择优惠券类型" disabled={editStatue}>
                  <Option value="CASH">现金</Option>
                  <Option value="RATE">折扣</Option>
                </Select>
              </Form.Item>
              <Form.Item label="优惠金额" name="discountAmount">
                  <Input disabled={editStatue} />
              </Form.Item>
              <Form.Item label="折扣率" name="discountRate">
                  <Input disabled={editStatue} />
              </Form.Item>
              <Form.Item label="满足订单金额" name="orderAmount">
                <Input disabled={editStatue} />
              </Form.Item>
              <Form.Item label="满足商品数量" name="productNum">
                  <Input disabled={editStatue} />
              </Form.Item>
              <Form.Item label="量体师是否可以发放" name="allowGrant" valuePropName="checked">
                <Checkbox />
              </Form.Item>
              <Form.Item label="是否有效" name="enable" valuePropName="checked">
                <Checkbox />
              </Form.Item>
              <Form.Item label="是否可以分享" name="share" valuePropName="checked">
                <Checkbox />
              </Form.Item>
              <Form.Item label="有效时间类型" name="limitTimeType">
                <Select allowClear placeholder="请选择优惠券类型" disabled={editStatue}>
                  <Option value="ABSOLUTE">起止</Option>
                  <Option value="COUNTDOWN">倒计时</Option>
                </Select>
              </Form.Item>
              <Form.Item label="活动有效期间" name="countdownDay">
                  <Input disabled={editStatue} />
              </Form.Item>
              <Form.Item label="活动起止时间" name="times">
                <RangePicker format={['YYYY/MM/DD', 'YYYY/MM/DD']} disabled={editStatue}/>
              </Form.Item>
              
              {/* <Form.Item label="产品选择方式" name="couponName">
                  <Input />
              </Form.Item>
              <Form.Item label="分类选择方式" name="couponName">
                  <Input />
              </Form.Item>
              <Form.Item label="折扣方式" name="couponName">
                  <Input />
              </Form.Item> */}
              <Form.Item label="活动渠道" name="channel">
                  <Input disabled={editStatue} />
              </Form.Item>
              <Form.Item {...tailLayout} style={{display: 'block', width: '100%'}}>
                  <Button onClick={this.handleCancel}>取消</Button> &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button type="primary" htmlType="submit">确定</Button>
              </Form.Item>
          </Form>
        </Modal>
      </div>
    )

  }
}

