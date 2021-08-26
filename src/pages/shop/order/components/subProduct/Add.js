import React, { forwardRef, useEffect, useRef } from 'react'
import { VtxModal } from '@vtx/components'
import { formFullItemLayout, formItemLayout } from '@/utils/contants'
import { Form, Row, Col, Card } from 'antd'
import { renderFormList } from '@/components/custom/modal/formModal'
import GrandsonProduct from '../grandsonProduct'
import { JKUtil } from '@/utils/util'

function Add(props, ref) {
  const { modalProps, formData = {}, onOk, formList, viewModal } = props
  const myRef = useRef()
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
      <Form name="sub" form={form} {...formItemLayout}>
        {renderFormList(formData, formList, viewModal)}
        <Row>
          <Col span={12}>
            <Form.Item noStyle {...formItemLayout} shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue('optionalFabric') ? (
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
                getFieldValue('optionalStyle') ? (
                  <Form.Item name="styleType" label="款式类型">
                    <ProductTypeSelect {...props} />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
          <Col span={24}>
            <Card title="子商品上架">
              <Form.Item noStyle {...formFullItemLayout} shouldUpdate>
                {({ getFieldValue }) => {
                  return (
                    <Form.Item name="detailList" {...formFullItemLayout}>
                      <GrandsonProduct
                        detailList={getFieldValue('detailList')}
                        single={getFieldValue('single')}
                        ref={myRef}
                        onChange={data => {
                          setFieldsValue({
                            detailList: data,
                            retailPriceTotal: JKUtil.toFixed(
                              data.reduce((total, item) => total + parseFloat(item.retailPrice), 0),
                              2
                            ),
                            sellingPriceTotal: JKUtil.toFixed(
                              data.reduce(
                                (total, item) => total + parseFloat(item.sellingPrice),
                                0
                              ),
                              2
                            ),
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
