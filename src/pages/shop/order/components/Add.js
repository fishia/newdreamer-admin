import React, { forwardRef, useEffect, useRef } from 'react'
import { VtxModal } from '@vtx/components'
import { formItemLayout, formFullItemLayout } from '@/utils/contants'
import { Form, Row, Col, Card } from 'antd'
import { renderFormList } from '@/components/custom/modal/formModal'
import SubProductTable from './subProduct'

function Add(props, ref) {
  const { modalProps, formData = {}, confirm, formList, viewModal } = props
  const myRef = useRef()
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
      <Form form={form} {...formItemLayout} initialValues={{ status: true }}>
        {renderFormList(formData, formList, viewModal)}
        <Row>
          <Col span={24}>
            <Card title="子商品上架">
              <Form.Item noStyle {...formFullItemLayout} shouldUpdate>
                {({ getFieldValue }) => {
                  return (
                    <Form.Item name="subProducts" {...formFullItemLayout}>
                      <SubProductTable
                        subProducts={getFieldValue('subProducts')}
                        ref={myRef}
                        onChange={data => {
                          setFieldsValue({
                            subProducts: data,
                          })
                        }}
                      />
                    </Form.Item>
                  )
                }}
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
