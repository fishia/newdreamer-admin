import React from 'react'
import { Form, Input, Button, Modal, Select, Checkbox, DatePicker, message } from 'antd'
import './index.less'
import moment from 'moment'
import { couponCreate, couponUpdate } from '../../../api/coupon'
import _isEqual from 'lodash/isEqual'
const { Option } = Select
const { RangePicker } = DatePicker
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addInitialValues: {
        couponType: 'CASH',
        limitTimeType: 'ABSOLUTE', // 有效时间类型
        allowGrant: true, // 着装顾问是否可以发放
        enable: true, // 是否有效
        share: true, // 是否可以分享
      }, // 设置默认值
      couponType: 'CASH', // 优惠券类型
      limitTimeType: 'ABSOLUTE', // 有效时间类型
    }
  }
  componentWillMount() {
    if (this.props.rowData && JSON.stringify(this.props.rowData) !== '{}') {
      let rowData = this.props.rowData
      if (rowData.startTime && rowData.endTime) {
        let startTime = moment(rowData.startTime).format('YYYY/MM/DD')
        let endTime = moment(rowData.endTime).format('YYYY/MM/DD')
        // 转换成组件可识别的格式
        rowData.times = [moment(startTime), moment(endTime)]
      }
      // 转换成组件可识别的格式
      if (rowData.startTime) {
        rowData.startTime = moment(moment(rowData.startTime).format('YYYY/MM/DD'))
      }
      this.setState({
        addInitialValues: rowData,
        couponType: rowData.couponType,
        limitTimeType: rowData.limitTimeType,
      })
    }
  }

  //  操作成功关闭弹窗
  handleOk = () => {
    this.props.handleOk()
  }

  handleCancel = () => {
    this.props.handleCancel()
  }

  couponTypeChange = val => {
    // console.log(val)
    this.setState({
      couponType: val,
    })
  }

  limitTimeTypeChange = val => {
    this.setState({
      limitTimeType: val,
    })
  }

  onFinish = values => {
    if (!this.props.editStatue) {
      //  新增
      let params = { ...values }
      // console.log(params);
      // 有效时间类型
      if (params.limitTimeType) {
        if (params.limitTimeType === 'ABSOLUTE') {
          if (values.times) {
            params.startTime = moment(params.times[0]).format('YYYY-MM-DD')
            params.endTime = moment(params.times[1]).format('YYYY-MM-DD')
            // console.log('Success:', values);
            delete params.times
          } else {
            message.warning('请选择活动起止时间')
            return false
          }
        } else if (params.limitTimeType === 'COUNTDOWN') {
          if (params.startTime) {
            params.startTime = moment(params.startTime).format('YYYY-MM-DD')
          } else {
            message.warning('请选择活动起始时间')
            return false
          }
        }
      } else {
        message.warning('请选择有效时间类型')
        return false
      }

      // console.log(params);
      if ((Number(params.orderAmount) - Number(params.discountAmount)).toFixed(2) < 0.01) {
        message.warning('“满足订单金额” - “优惠金额”>=0.01')
        return false
      }
      couponCreate(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          message.success('操作成功')
          this.handleOk()
        }
      })
    } else {
      //  修改
      // console.log(values)
      let params = {
        id: this.props.rowData.id,
        allowGrant: values.allowGrant,
        enable: values.enable,
        share: values.share,
      }
      couponUpdate(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          message.success('操作成功')
          this.handleOk()
        }
      })
    }

    // this.props.handleOk();
  }

  render() {
    const { addInitialValues, couponType, limitTimeType } = this.state
    const editStatue = this.props.editStatue // 是否为修改操作
    const tailLayout = {
      wrapperCol: { offset: 10, span: 16 },
    }
    return (
      <div className="addCoupon">
        <Modal
          title={`优惠券${editStatue ? '修改' : '新增'}`}
          visible={true}
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
            {/* <Form.Item label="优惠券编码" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input />
              </Form.Item> */}
            <Form.Item
              label="优惠券名称"
              name="couponName"
              rules={[{ required: true, message: '请输入优惠券名称!' }]}
            >
              <Input disabled={editStatue} />
            </Form.Item>
            <Form.Item
              label="活动名称"
              name="activityName"
              rules={[{ required: true, message: '请输入活动名称 !' }]}
            >
              <Input disabled={editStatue} />
            </Form.Item>
            <Form.Item
              label="优惠券数量"
              name="couponNum"
              rules={[{ required: true, message: '请输入优惠券数量 !' }]}
            >
              <Input disabled={editStatue} type="number" />
            </Form.Item>
            <Form.Item
              label="优惠券类型"
              name="couponType"
              rules={[{ required: true, message: '请选择优惠券类型!' }]}
            >
              <Select
                allowClear
                placeholder="请选择优惠券类型"
                disabled={editStatue}
                onChange={this.couponTypeChange}
              >
                <Option value="CASH">现金</Option>
                <Option value="RATE">折扣</Option>
              </Select>
            </Form.Item>
            {couponType === 'CASH' ? (
              <Form.Item label="满足订单金额" name="orderAmount">
                <Input disabled={editStatue} type="number" />
              </Form.Item>
            ) : null}
            {couponType === 'CASH' ? (
              <Form.Item label="优惠金额" name="discountAmount">
                <Input disabled={editStatue} type="number" />
              </Form.Item>
            ) : null}
            {couponType === 'RATE' ? (
              <Form.Item label="满足商品数量" name="productNum">
                <Input disabled={editStatue} type="number" />
              </Form.Item>
            ) : null}
            {couponType === 'RATE' ? (
              <Form.Item label="折扣率" name="discountRate">
                <Input disabled={editStatue} placeholder="取值范围0~1" type="number" />
              </Form.Item>
            ) : null}

            <Form.Item label="着装顾问是否可以发放" name="allowGrant" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item label="是否有效" name="enable" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item label="是否可以分享" name="share" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item label="有效时间类型" name="limitTimeType">
              <Select
                allowClear
                placeholder="请选择优惠券类型"
                disabled={editStatue}
                onChange={this.limitTimeTypeChange}
              >
                <Option value="ABSOLUTE">起止</Option>
                <Option value="COUNTDOWN">倒计时</Option>
              </Select>
            </Form.Item>
            {limitTimeType === 'COUNTDOWN' ? (
              <Form.Item label="活动起始时间" name="startTime">
                <DatePicker format="YYYY/MM/DD" disabled={editStatue} />
              </Form.Item>
            ) : null}
            {limitTimeType === 'COUNTDOWN' ? (
              <Form.Item label="活动有效期间" name="countdownDay">
                <Input disabled={editStatue} addonAfter="天" type="number" />
              </Form.Item>
            ) : null}
            {limitTimeType === 'ABSOLUTE' ? (
              <Form.Item label="活动起止时间" name="times">
                <RangePicker format={['YYYY/MM/DD', 'YYYY/MM/DD']} disabled={editStatue} />
              </Form.Item>
            ) : null}
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
            <Form.Item {...tailLayout} style={{ display: 'block', width: '100%' }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={this.handleCancel}>取消</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
