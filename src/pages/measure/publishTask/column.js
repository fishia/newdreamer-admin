import { Switch } from 'antd'
import moment from 'moment'
import { enumSuperset, format } from '@/utils/contants'
import { ScopeNameSelect, MySelect } from '@/components/custom/select'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'

export const tableFields = [
  [
    '任务奖励',
    'reward',
    {
      form: {},
    },
  ],
  [
    '任务概述',
    'content',
    {
      form: { rules: [{ required: true }] },
      width: 150,
    },
  ],
  [
    '任务介绍',
    'brief',
    {
      width: 150,
      render: (text, record) => {
        //展示详情
        return text && <ImagePreviewGroup images={text} />
      },
      form: {
        type: 'upload',
        fileDirectorEnum: 'PRODUCT',
        mode: 'single',
        rules: [{ required: true }],
      },
    },
  ],
  [
    '发布时间',
    'createTime',
    {
      render: text => (text ? moment(text).format(format) : ''),
    },
  ],
  [
    '发布状态',
    'publishStatus',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      form: {
        type: 'other',
        valuePropName: 'checked',
        children: (props, { setFieldsValue, getFieldValue }) => {
          return (
            <Switch
              {...props}
              checked={getFieldValue('publishStatus')}
              onChange={checked => {
                let obj = {
                  publishStatus: checked,
                }

                setFieldsValue({
                  ...obj,
                  endTime: checked ? '' : moment(),
                })
              }}
            />
          )
        },
      },
      filter: {
        elem: <MySelect datasource={enumSuperset['enabled']} />,
      },
    },
  ],
  [
    '截止时间',
    'endTime',
    {
      form: {
        type: 'datePicker',
        format,
      },
      form: {
        type: 'datePicker',
        rules: [{ required: true }],
      },
      render: text => (text ? moment(text).format(format) : ''),
    },
  ],
  ['领取人数', 'receiveCount', {}],
  [
    '适用范围',
    'scopeName',
    {
      form: {
        name: 'scopeId',
        type: 'other',
        children: props => <ScopeNameSelect />,
      },
    },
  ],
]
//适用范围
export const rangeFields = [
  [
    '模块名称',
    'name',
    {
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '启用',
    'enabled',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      form: {
        type: 'switch',
      },
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  createTime: data.createTime ? moment(data.createTime) : undefined,
  endTime: data.endTime ? moment(data.endTime) : undefined,
  brief: data.brief && JSON.parse(data.brief),
})

export const parseFormData = data => ({
  ...data,
  createTime: data.createTime ? moment(data.createTime).format('YYYY-MM-DD') : undefined,
  endTime: data.endTime ? moment(data.endTime).format('YYYY-MM-DD') : undefined,
  brief: data.brief && JSON.stringify(data.brief),
})
