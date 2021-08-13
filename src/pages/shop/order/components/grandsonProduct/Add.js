import React, { forwardRef, useEffect } from 'react'
import { VtxModal } from '@vtx/components'
import { formItemLayout } from '@/utils/contants'
import { Form, Row, Col, Input } from 'antd'
import { renderFormList } from '@/components/custom/modal/formModal'
import { SingleNoSelect, FabricSelect, ProductTypeSelect } from '@/components/custom/select'

function Add(props, ref) {
  const { modalProps, formData = {}, onOk, formList, viewModal } = props
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

  const onFinish = async () => {
    let fieldsValue = await validateFields()
    onOk && onOk(fieldsValue)
  }

  return (
    <VtxModal {...modalProps} onOk={onFinish} moveable maximize okText="确定" cancelText="取消">
      <Form name="grand" form={form} {...formItemLayout}>
        <Row>
          <Col span={12}>
            <Form.Item name="singleItemId" label="ND单品编号" rules={[{ required: true }]}>
              <SingleNoSelect
                onChange={(v, item) => {
                  if (item[0])
                    setFieldsValue({
                      ...item[0],
                      barcode: item[0].label,
                    })
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="barcode" noStyle hidden>
              <Input />
            </Form.Item>
          </Col>
          {renderFormList(formData, formList, viewModal)}
          <Col span={12}>
            <Form.Item noStyle {...formItemLayout} shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue('classificationName') === '个性化定制' ? (
                  <Form.Item name="fabricClassification" label="面料类型">
                    <FabricSelect {...props} />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item noStyle {...formItemLayout} shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue('classificationName') === '个性化定制' ? (
                  <Form.Item name="styleType" label="款式类型">
                    <ProductTypeSelect {...props} />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
