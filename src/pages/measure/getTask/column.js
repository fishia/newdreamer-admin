import { Switch } from 'antd'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'

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
    '领取时间',
    'receiveTime',
    {
      form: {},
    },
  ],
  [
    '着装顾问',
    'volumerName',
    {
      form: {},
    },
  ],
  [
    '完成状态',
    'statusName',
    {
      form: {},
    },
  ],
  [
    '完成时间',
    'finishTime',
    {
      width: 150,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      form: {
        type: 'datePicker',
      },
    },
  ],
  [
    '完成截图',
    'photos',
    {
      width: 300,
      render: (text, record) => {
        //展示详情
        return text && <ImagePreviewGroup images={text} />
      },
      form: {
        type: 'upload',
        fileDirectorEnum: 'PRODUCT',
      },
    },
  ],
  [
    '审核状态',
    'enabled',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  receiveTime: data.receiveTime ? moment(data.receiveTime) : undefined,
  finishTime: data.finishTime ? moment(data.finishTime) : undefined,
})

export const parseFormData = data => ({
  ...data,
  receiveTime: data.receiveTime ? moment(data.receiveTime).format('YYYY-MM-DD') : undefined,
  finishTime: data.finishTime ? moment(data.finishTime).format('YYYY-MM-DD') : undefined,
})
