import React, { forwardRef, useEffect, useRef } from 'react'
import { VtxModal } from '@vtx/components'
import { formItemLayout } from '@/utils/contants'
import { Form, Row, Col, Input } from 'antd'
import { CollegeSelect, VolumerSelect } from '@/components/custom/select'

function Add(props, ref) {
  const { modalProps, formData = {}, confirm } = props
  const [form] = Form.useForm()
  const { validateFields, resetFields, getFieldValue, setFieldsValue } = form

  useEffect(() => {
    if (!modalProps.visible && form) {
      resetFields()
    } else {
      setFieldsValue({ ...formData })
    }
  }, [modalProps.visible])

  const onOk = async () => {
    let fieldsValue = await validateFields()
    confirm && confirm({ ...formData, ...fieldsValue })
  }

  return (
    <VtxModal {...modalProps} onOk={onOk} moveable maximize okText="确定" cancelText="取消">
      <Form form={form} {...formItemLayout} initialValues={{ ...formData }}>
        <Row>
          <Col span={12}>
            <Form.Item name="collegeId" label="所属高校" rules={[{ required: true }]}>
              <CollegeSelect
                onChange={(_, obj) => {
                  setFieldsValue({
                    collegeId: obj[0].value,
                    collegeName: obj[0].label,
                  })
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.collegeId !== currentValues.collegeId
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('collegeId') ? (
                  <Form.Item name="volumer_Id" label="着装顾问">
                    <VolumerSelect
                      parentId={getFieldValue('collegeId')}
                      onChange={(_, obj) => {
                        setFieldsValue({
                          volumer_Id: obj[0].value,
                          volumer_Name: obj[0].label,
                        })
                      }}
                    />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item name="volumer_Name" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="collegeName" hidden>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
