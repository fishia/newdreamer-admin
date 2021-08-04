import { Switch } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'

export const tableFields = [
  [
    '高校编号',
    'code',
    {
      filter: {},
      form: {},
    },
  ],
  [
    '高校名称',
    'college',
    {
      form: {},
    },
  ],
  [
    '有效',
    'enabled',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      filter: {
        elem: <MySelect datasource={enumSuperset['enabled']} />,
      },
      form: {
        type: 'switch',
      },
    },
  ],
]
//校区
export const campusFields = [
  [
    '校区名称',
    'part',
    {
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '校区地址',
    'address',
    {
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '有效',
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
