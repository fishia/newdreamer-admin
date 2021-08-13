import React, { forwardRef, useEffect, useRef } from 'react'
import { VtxModal } from '@vtx/components'
import { enumSuperset, formItemLayout } from '@/utils/contants'
import { Input, Form, Row, Col, Switch } from 'antd'
import { renderFormList } from '@/components/custom/modal/formModal'
import { MySelect } from '@/components/custom/select'
import { StylesAndFabricsBtn, ChooseVolumeInfoBtn } from '@/components/custom/Button'

function Add(props, ref) {
  const { modalProps, formData = {}, confirm, formList, viewModal, classification } = props
  const [form] = Form.useForm()
  const { validateFields, resetFields, setFieldsValue, getFieldValue } = form

  useEffect(() => {
    if (!modalProps.visible && form) {
      resetFields()
    } else {
      setFieldsValue({ ...formData, classification })
    }
  }, [modalProps.visible])

  const onOk = async () => {
    let fieldsValue = await validateFields()
    confirm && confirm({ ...fieldsValue, classification })
  }
  return (
    <VtxModal {...modalProps} onOk={onOk} moveable maximize okText="确定" cancelText="取消">
      <Form form={form} {...formItemLayout} initialValues={{ ...formData }}>
        {renderFormList(formData, formList, viewModal, form)}
        <Row>
          {classification === 'CUSTOMIZED_PRODUCT' && (
            <Col span={12}>
              <Form.Item name="code" label="面料来料">
                <Input
                  {...{
                    allowClear: true,
                    placeholder: `请输入面料来料`,
                    disabled: viewModal,
                  }}
                />
              </Form.Item>
            </Col>
          )}
          {['TAILOR_MADE_PRODUCT', 'CUSTOMIZED_PRODUCT'].indexOf(classification) > -1 && (
            <Col span={12}>
              <Form.Item name="packing" label="洗唛包装">
                <MySelect datasource={enumSuperset['washingLabelPackaging']} disabled={viewModal} />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item name="urgent" label="是否加急" valuePropName="checked" disabled={viewModal}>
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {['CUSTOMIZED_PRODUCT'].indexOf(classification) > -1 && (
          <Row>
            <Col span={12}>
              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => (
                  <Form.Item name="volumeId" label="成衣尺寸" rules={[{ required: true }]}>
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
                )}
              </Form.Item>
              <Form.Item name="sizeDTO" noStyle hidden>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.productType !== curValues.productType
                }
              >
                {({ getFieldValue }) => {
                  return getFieldValue('singleItemCode') ? (
                    <Form.Item name="styleJson" label="款式及面料" rules={[{ required: true }]}>
                      <StylesAndFabricsBtn
                        viewMode={false}
                        record={getFieldValue('styleJson')}
                        formData={{ productType: getFieldValue('productType') }}
                      />
                    </Form.Item>
                  ) : (
                    ''
                  )
                }}
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
