import React, { forwardRef, useEffect } from 'react'
import { VtxModal } from '@vtx/components'
import { Input, Form, Row, Col } from 'antd'
import { formItemLayout } from '@/utils/contants'

function Add(props, ref) {
  const { modalProps, formData = {}, confirm } = props
  const [form] = Form.useForm()
  const { validateFields, resetFields, setFieldsValue } = form

  useEffect(() => {
    if (!modalProps.visible && form) {
      resetFields()
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
          <Col span={22}>
            <Form.Item name="shipmentId" label="订单号" rules={[{ required: true }]}>
              <Input
                {...{
                  allowClear: true,
                  placeholder: `请填写订单号`,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
