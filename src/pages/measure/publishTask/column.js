import { Switch } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'

export const tableFields = [
  [
    '任务名称',
    'name',
    {
      form: {},
      filter: {
        isunions: true,
      },
    },
  ],
  [
    '任务奖励',
    'college',
    {
      form: {},
    },
  ],
  [
    '任务介绍',
    'introduce',
    {
      form: {},
    },
  ],
  [
    '发布时间',
    'publishTime',
    {
      form: {},
    },
  ],
  [
    '截止时间',
    'endTime',
    {
      form: {},
    },
  ],
  [
    '领取人数',
    'peoples',
    {
      form: {},
    },
  ],
  [
    '适用范围',
    'college',
    {
      form: {},
    },
  ],
  [
    '发布状态',
    'enabled',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
    },
  ],
]
//适用范围
export const campusFields = [
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
