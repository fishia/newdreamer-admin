import React, { useEffect } from 'react'
import { VtxModal } from '@vtx/components'
import { formItemLayout } from '@/utils/contants'
import { Form, Row, Col } from 'antd'
import { ChooseVolumeInfoBtn } from '@/components/custom/Button'
import { SalesConsultanterSelect } from '@/components/custom/select'

function BindModal(props) {
  const { modalProps, formData = {}, confirm } = props
  const [form] = Form.useForm()
  const { getFieldValue, validateFields, resetFields, setFieldsValue } = form

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
            <Form.Item name="salesConsultanter" label="销售顾问">
              <SalesConsultanterSelect />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="volumeId" label="成衣尺寸">
              <ChooseVolumeInfoBtn
                volumeId={getFieldValue('volumeId')}
                sizeDTO={getFieldValue('sizeDTO') || {}}
                onChange={(info, sizeInfo) => {
                  setFieldsValue({
                    volumeId: info.volume_Id,
                    volumeName: info.customer_Name,
                    sizeDTO: sizeInfo,
                  })
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default BindModal
