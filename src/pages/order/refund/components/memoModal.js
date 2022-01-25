import React, { useEffect } from 'react'
import { VtxModal } from '@vtx/components'
import { formFullItemLayout } from '@/utils/contants'
import { Form, Row, Col, Input } from 'antd'

const { TextArea } = Input

function BindModal(props) {
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
      <Form form={form} {...formFullItemLayout} initialValues={{ ...formData }}>
        <Row>
          <Col span={24}>
            <Form.Item name="salesConsultanter" label="备注">
              <TextArea {...props} placeholder="请输入备注" showCount maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default BindModal
