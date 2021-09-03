import React, { forwardRef, useEffect } from 'react'
import { VtxModal } from '@vtx/components'
import { Input, Form, Row, Col, Space, Button, Card, Tooltip, Popconfirm, Switch } from 'antd'
import { MinusCircleOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { formItemLayout, formItemLayoutWithOutLabel } from '@/utils/contants'
import { JKUtil } from '@/utils/util'
import { NdUpload } from '@/components/custom/form'
import { ProductTypeSelect } from '@/components/custom/select'
import styles from './index.less'

function Add(props, ref) {
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
      <Form form={form} {...formItemLayout}>
        <Row>
          <Col span={12}>
            <Form.Item name="name" label="名称" rules={[{ required: true }]}>
              <Input
                {...{
                  allowClear: true,
                  placeholder: `请输入名称`,
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="productType" label="适用商品类型" rules={[{ required: true }]}>
              <ProductTypeSelect />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="urgent"
              label="是否设置刺绣内容"
              valuePropName="checked"
              disabled={viewModal}
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="urgent"
              label="是否设置版型"
              valuePropName="checked"
              disabled={viewModal}
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.List
              name="optionDTOS"
              initialValue={[
                {
                  name: '',
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }, i) => {
                    return (
                      <Card
                        title={`款式类型${i + 1}`}
                        extra={
                          <Space>
                            {!i ? (
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                type="primary"
                                icon={<PlusOutlined />}
                              >
                                添加款式
                              </Button>
                            ) : (
                              <Popconfirm title="确认移除吗" onConfirm={() => remove(name)}>
                                <Button
                                  type="dashed"
                                  block
                                  type="danger"
                                  icon={<MinusCircleOutlined />}
                                >
                                  删除款式
                                </Button>
                              </Popconfirm>
                            )}
                          </Space>
                        }
                        key={key}
                        style={{ marginBottom: '20px' }}
                      >
                        <Row>
                          <Col span={12}>
                            <Form.Item
                              {...formItemLayout}
                              {...restField}
                              label="款式类型名称"
                              name={[name, 'typeName']}
                              fieldKey={[fieldKey, 'typeName']}
                              rules={[{ required: true }]}
                            >
                              <Input
                                {...{
                                  allowClear: true,
                                  placeholder: `请输入款式类型名称`,
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.List
                              {...formItemLayoutWithOutLabel}
                              {...restField}
                              name={[name, 'imagesDTOList']}
                              fieldKey={[fieldKey, 'imagesDTOList']}
                              initialValue={[
                                {
                                  image: '',
                                  optionName: '',
                                },
                              ]}
                            >
                              {(fields, { add, remove }) => {
                                return (
                                  <>
                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                      <Row key={key} className={styles.wrapper}>
                                        <Col span={12}>
                                          <Form.Item
                                            {...formItemLayout}
                                            {...restField}
                                            name={[name, 'optionName']}
                                            label="类目名称"
                                            fieldKey={[fieldKey, 'optionName']}
                                            rules={[{ required: true }]}
                                          >
                                            <Input
                                              {...{
                                                allowClear: true,
                                                placeholder: `请输入`,
                                              }}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                          <Form.Item
                                            {...formItemLayout}
                                            {...restField}
                                            name={[name, 'image']}
                                            fieldKey={[fieldKey, 'image']}
                                            valuePropName="fileList"
                                            label="上传图片"
                                            getValueFromEvent={e => {
                                              if (Array.isArray(e)) {
                                                return e
                                              }
                                              return e && e.fileList
                                            }}
                                            rules={[{ required: true, type: 'array' }]}
                                          >
                                            <NdUpload
                                              {...{
                                                files:
                                                  (formData['optionDTOS'] &&
                                                    JKUtil.getObjProperty(
                                                      JKUtil.getObjProperty(
                                                        formData['optionDTOS'][i],
                                                        'imagesDTOList'
                                                      )[index],
                                                      'image'
                                                    )) ||
                                                  [],
                                                fileDirectorEnum: 'PRODUCT',
                                                mode: 'single',
                                              }}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <div className={styles.rightBtn}>
                                          {index ? (
                                            <Tooltip title="点击可移除类目">
                                              <Popconfirm
                                                title="确认移除吗"
                                                onConfirm={() => remove(name)}
                                              >
                                                <MinusCircleOutlined />
                                              </Popconfirm>
                                            </Tooltip>
                                          ) : (
                                            <Tooltip title="点击可新增· 类目">
                                              <PlusSquareOutlined onClick={() => add()} />
                                            </Tooltip>
                                          )}
                                        </div>
                                      </Row>
                                    ))}
                                  </>
                                )
                              }}
                            </Form.List>
                          </Col>
                        </Row>
                      </Card>
                    )
                  })}
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
