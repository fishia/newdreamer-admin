import React, { forwardRef, useEffect } from 'react'
import { omit } from 'lodash'
import { VtxModal } from '@vtx/components'
import { formItemLayout, formFullItemLayout } from '@/utils/contants'
import { Input, Form, Switch, Row, Col, DatePicker } from 'antd'
import { NdUpload } from '@/components/custom/form'
import { JKTime } from '@/utils/util'

export const renderFormItem = (item, form) => {
  let formItemProps = {
      ...omit(item, ['name', 'label', 'type', 'rules', 'isunions']),
    },
    omitProps = [
      'disabled',
      'onBlur',
      'type',
      'isFull',
      'fileDirectorEnum',
      'viewMode',
      'showUploadList',
      'listType',
      'desp',
      'format',
    ]
  switch (item.type) {
    case 'input':
      return (
        <Form.Item {...omit(item, [...omitProps])}>
          <Input
            {...{
              ...formItemProps,
              allowClear: true,
              placeholder: `请输入${item.label}`,
            }}
          />
        </Form.Item>
      )
    case 'datePicker':
      return (
        <Form.Item {...omit(item, [...omitProps])}>
          <DatePicker
            disabledDate={current => {
              return JKTime.isPastDate(current)
            }}
            {...formItemProps}
          />
        </Form.Item>
      )
    case 'switch':
      return (
        <Form.Item {...omit(item, [...omitProps])} valuePropName="checked">
          <Switch {...formItemProps} />
        </Form.Item>
      )
    case 'upload':
      return (
        <Form.Item
          {...omit(item, [...omitProps])}
          valuePropName="fileList"
          getValueFromEvent={e => {
            if (Array.isArray(e)) {
              return e
            }
            return e && e.fileList
          }}
        >
          <NdUpload
            {...{
              ...formItemProps,
            }}
          />
        </Form.Item>
      )
    default:
      return item.shouldUpdate ? (
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[item.desp] !== currentValues[item.desp]
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(item.desp) ? (
              <Form.Item name={item.name} label={item.label}>
                {item.children(
                  {
                    disabled: formItemProps.disabled,
                    desp: getFieldValue(item.desp),
                  },
                  form
                )}
              </Form.Item>
            ) : null
          }
        </Form.Item>
      ) : (
        <Form.Item {...omit(item, [...omitProps])}>
          {item.children({ disabled: formItemProps.disabled }, form)}
        </Form.Item>
      )
  }
}

export const renderFormList = (formData, list, viewMode, form) => (
  <Row>
    {list.map((item, i) => {
      let obj = { span: 12, ...item }
      //图片默认整行
      if (item.isFull || item.type === 'upload') {
        obj = Object.assign(obj, {
          span: 24,
          ...formFullItemLayout,
          files: formData[item.name] || [], //用来做编辑或查看
          viewMode,
        })
      }
      return (
        <Col key={i} span={obj.span || 12} offset={item.offset || 0}>
          {renderFormItem({ disabled: viewMode, ...obj }, form)}
        </Col>
      )
    })}
  </Row>
)

/*
 *viewMode：是否开启查看模式
 */
function Add(props, ref) {
  const {
    modalProps,
    formData = {},
    confirm,
    formList,
    initialValues = {},
    viewMode = false,
  } = props
  const [form] = Form.useForm()
  const { validateFields, resetFields, setFieldsValue } = form
  useEffect(() => {
    console.log(modalProps.visible, form)
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
      <Form ref={ref} form={form} {...formItemLayout} initialValues={{ ...initialValues }}>
        {renderFormList(formData, formList, viewMode, form)}
      </Form>
    </VtxModal>
  )
}

export default forwardRef(Add)
