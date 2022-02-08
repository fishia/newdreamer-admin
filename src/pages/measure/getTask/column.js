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
    '完成截图',
    'taskPhotos',
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
]

export const parseColumns = data => ({
  ...data,
  taskPhotos: data.taskPhotos && JSON.parse(data.taskPhotos),
})
