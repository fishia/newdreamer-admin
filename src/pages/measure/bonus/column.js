import { Switch } from 'antd'
import { enumSuperset, format } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'
import moment from 'moment'

export const tableFields = [
  [
    '资金名称',
    'desctiption',
    {
      filter: {
        isunions: true, //联合类型
      },
      width: 100,
    },
  ],
  [
    '金额',
    'introduce',
    {
      width: 80,
      render: (text, record) => {
        //展示详情
        return text && <ImagePreviewGroup images={text} />
      },
      form: {},
    },
  ],
  [
    '订单号',
    'publishTime',
    {
      form: {},
    },
  ],
  [
    '创建时间',
    'createTime',
    {
      render: text => (text ? moment(text).format(format) : ''),
      form: {
        type: 'datePicker',
        format,
      },
    },
  ],
  [
    '结算状态',
    'peoples',
    {
      form: {},
      filter: {
        elem: <MySelect datasource={enumSuperset['settleAccounts']} />,
      },
    },
  ],
  [
    '结算时间',
    'settlementDate',
    {
      render: text => (text ? moment(text).format(format) : ''),
      form: {
        type: 'datePicker',
        format,
      },
    },
  ],
  [
    '备注',
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
  createTime: data.createTime ? moment(data.createTime) : undefined,
  settlementDate: data.settlementDate ? moment(data.settlementDate) : undefined,
})
export const parseFormData = data => ({
  ...data,
  createTime: data.createTime ? moment(data.createTime).format(format) : undefined,
  settlementDate: data.settlementDate ? moment(data.settlementDate).format(format) : undefined,
}) //下拉保存给id给后台
