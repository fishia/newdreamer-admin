import { Switch } from 'antd'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'
import { MySelect } from '@/components/custom/select'
import { enumSuperset } from '@/utils/contants'

export const tableFields = [
  [
    '任务奖励',
    'college',
    {
      form: {},
      width: 100,
    },
  ],
  [
    '领取时间',
    'receiveTime',
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
    'statusName',
    {
      form: {},
      width: 100,
      filter: {
        elem: <MySelect datasource={enumSuperset['finish']} />,
      },
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
        maxCount: 3,
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
      width: 100,
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
