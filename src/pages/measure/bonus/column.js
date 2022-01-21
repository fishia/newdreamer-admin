import { Switch } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'

export const tableFields = [
  [
    '任务奖励',
    'college',
    {
      form: {},
    },
  ],
  [
    '任务概述',
    'desctiption',
    {
      form: {},
      width: 150,
    },
  ],
  [
    '任务介绍',
    'introduce',
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
      },
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
    'range',
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
      filter: {
        elem: <MySelect datasource={enumSuperset['enabled']} />,
      },
    },
  ],
]

export const parseColumns = data => ({ ...data })
