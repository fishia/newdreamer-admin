import React, { forwardRef, useEffect, useRef } from 'react'
import { VtxModal } from '@vtx/components'
import { formItemLayout, formFullItemLayout } from '@/utils/contants'
import { Input, Form, Row, Col, Switch } from 'antd'
import CampusTable from './campus'

function Add(props, ref) {
  const { modalProps, formData = {}, confirm } = props
  const myRef = useRef()
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
    confirm && confirm(fieldsValue)
  }

  return (
    <VtxModal {...modalProps} onOk={onOk} moveable maximize okText="确定" cancelText="取消">
      <Form form={form} {...formItemLayout} initialValues={{ ...formData }}>
        <Row>
          <Col span={12}>
            <Form.Item name="code" label="高校编号" rules={[{ required: true }]}>
              <Input
                {...{
                  allowClear: true,
                  placeholder: `请输入高校编号`,
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="college" label="高校名称" rules={[{ required: true }]}>
              <Input
                {...{
                  allowClear: true,
                  placeholder: `请输入高校名称`,
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="enabled" label="有效" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.code !== currentValues.code}
              {...formFullItemLayout}
            >
              {({ getFieldValue }) =>
                getFieldValue('id') ? (
                  <Form.Item name="children" label="">
                    <CampusTable
                      parentId={getFieldValue('id')}
                      ref={myRef}
                      callback={data => {
                        setFieldsValue({
                          children: data,
                        })
                      }}
                    />
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
