import { Switch } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'

export const tableFields = [
  [
    '概述',
    'desctiption',
    {
      form: {},
    },
  ],
  [
    '所述模块',
    'moduleName',
    {
      form: {},
      filter: {
        isunions: true, //联合类型
      },
    },
  ],
  [
    '网页地址',
    'webUrl',
    {
      form: {},
    },
  ],
  [
    '启用',
    'enabled',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      filter: {
        elem: <MySelect datasource={enumSuperset['enabled']} />,
      },
    },
  ],
]
//适用范围
export const rangeFields = [
  [
    '模块名称',
    'moduleName',
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
export const parseColumns = data => ({ ...data })
