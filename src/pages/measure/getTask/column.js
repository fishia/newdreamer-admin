import { Switch } from 'antd'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'
import { MySelect } from '@/components/custom/select'
import { enumSuperset } from '@/utils/contants'

export const tableFields = [
  [
    '任务奖励',
    'reward',
    {
      form: {},
      width: 100,
    },
  ],
  [
    '领取时间',
    'createTime',
    {
      form: {},
      width: 100,
    },
  ],
  [
    '着装顾问',
    'volumerName',
    {
      form: {},
      filter: {
        isunions: true, //联合类型
      },
      width: 100,
    },
  ],
  [
    '完成状态',
    'completeStatus',
    {
      form: {},
      render: text => (text ? '已完成' : '未完成'),
      width: 100,
      filter: {
        elem: <MySelect datasource={enumSuperset['finish']} />,
      },
    },
  ],
  [
    '完成时间',
    'completeTime',
    {
      width: 150,
      form: {
        type: 'datePicker',
      },
    },
  ],
  [
    '任务截图',
    'brief',
    {
      width: 300,
      render: (text, record) => {
        //展示详情
        return text && <ImagePreviewGroup images={text} />
      },
      form: {
        type: 'upload',
        fileDirectorEnum: 'PRODUCT',
        maxCount: 3,
      },
    },
  ],
  [
    '审核状态',
    'auditStatus',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      width: 100,
    },
  ],
  [
    '完成度',
    'percent',
    {
      render: text => (text ? `${text}%` : ''),
      form: {
        addonAfter: '%',
        placeholder: '请输入1-100的数字',
      },
      width: 100,
    },
  ],
  [
    '实际奖励',
    'actualReward',
    {
      form: {
        addonAfter: '元',
      },
      width: 100,
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  brief: data.brief && JSON.parse(data.brief),
})
export const parseFormData = data => ({
  ...data,
  taskId: data.taskId,
  brief: data.brief && JSON.stringify(data.brief),
})
