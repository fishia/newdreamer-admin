import { Input } from 'antd'
import { enumSuperset, format } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'
import moment from 'moment'
const { TextArea } = Input

export const tableFields = [
  [
    '资金名称',
    'type',
    {
      filter: {
        isunions: true, //联合类型
      },
      width: 100,
      form: {},
    },
  ],
  [
    '金额',
    'amount',
    {
      width: 80,
      form: {
        inputType: 'number',
      },
    },
  ],
  [
    '订单号',
    'orderId',
    {
      form: {
        disabled: true,
        hide: 'add',
      },
    },
  ],
  ['创建时间', 'createTime'],
  [
    '结算状态',
    'status',
    {
      form: {
        type: 'other',
        children: props => <MySelect datasource={enumSuperset['settleAccounts']} {...props} />,
      },
      filter: {
        elem: <MySelect datasource={enumSuperset['settleAccounts']} />,
      },
      render: text =>
        enumSuperset['settleAccounts'].filter(item => item.value == text.toString())[0]?.label ||
        text,
    },
  ],
  ['结算时间', 'settleDate'],
  [
    '生效时间',
    'effectiveTime',
    {
      width: 150,
      render: text => (text ? moment(text).format(format) : ''),
      form: {
        type: 'datePicker',
        format,
      },
    },
  ],
  [
    '备注',
    'remark',
    {
      form: {
        type: 'other',
        children: props => (
          <TextArea {...props} placeholder="请输入备注" showCount maxLength={100} />
        ),
      },
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  status: data.status.toString(),
  effectiveTime: data.effectiveTime ? moment(data.effectiveTime) : undefined,
})
export const parseFormData = data => ({
  ...data,
  effectiveTime: data.effectiveTime ? moment(data.effectiveTime).format(format) : undefined,
}) //下拉保存给id给后台
