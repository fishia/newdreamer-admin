import React, { forwardRef, useEffect, useRef } from 'react'
import { VtxModal } from '@vtx/components'
import { formItemLayout } from '@/utils/contants'
import { Input, Form, Row, Col, DatePicker } from 'antd'
import { VolumerSelect } from '@/components/custom/select'

function Add(props) {
  const { modalProps, formData = {}, confirm } = props
  const [form] = Form.useForm()
  const { validateFields, resetFields, setFieldsValue } = form

  useEffect(() => {
    if (!modalProps.visible && form) {
      resetFields()
      props.setFormData(null)
    } else {
      setFieldsValue({ ...formData })
    }
  }, [modalProps.visible])

  const onOk = async () => {
    let fieldsValue = await validateFields()
    confirm && confirm(fieldsValue)
  }

  return (
    <VtxModal {...modalProps} onOk={onOk} moveable maximize okText="确定" cancelText="取消">
      <Form form={form} {...formItemLayout} initialValues={{ ...formData }}>
        <Row>
          <Col span={12}>
            <Form.Item name="volumerId" label="顾问名称" rules={[{ required: true }]}>
              <VolumerSelect />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="month" label="月份" rules={[{ required: true }]}>
              <DatePicker picker="month" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
