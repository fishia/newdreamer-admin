import { Input } from 'antd'
import moment from 'moment'
const { TextArea } = Input

export const tableFields = [
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
    '寄回数量',
    'number',
    {
      form: {},
      width: 100,
    },
  ],
  [
    '预计使用时间',
    'estimateTime',
    {
      width: 150,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      form: {
        type: 'datePicker',
      },
    },
  ],
  [
    '提交时间',
    'submitTime',
    {
      width: 150,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      form: {
        type: 'datePicker',
      },
    },
  ],
  [
    '返修内容',
    'repairContent',
    {
      width: 150,
      form: {
        type: 'other',
        children: props => (
          <TextArea {...props} placeholder="请输入返修内容" showCount maxLength={100} />
        ),
      },
    },
  ],
  [
    '快递单号',
    'shipmentId',
    {
      width: 150,
      form: {},
    },
  ],
  [
    '返修图片',
    'repairPhotos',
    {
      width: 150,
      display: false,
      form: {
        type: 'upload',
        fileDirectorEnum: 'PRODUCT',
      },
    },
  ],
  [
    '返修状态',
    'auditStatus',
    {
      width: 100,
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  estimateTime: data.estimateTime ? moment(data.estimateTime) : undefined,
  submitTime: data.submitTime ? moment(data.submitTime) : undefined,
})

export const parseFormData = data => ({
  ...data,
  estimateTime: data.estimateTime ? moment(data.estimateTime).format('YYYY-MM-DD') : undefined,
  submitTime: data.submitTime ? moment(data.submitTime).format('YYYY-MM-DD') : undefined,
  repairPhotos: data.repairPhotos && JSON.stringify(data.repairPhotos),
})
