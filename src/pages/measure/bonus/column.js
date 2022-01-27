import { enumSuperset } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'

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
  ['订单号', 'orderId'],
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
  ['备注', 'remark'],
]

export const parseColumns = data => ({
  ...data,
  status: data.status.toString(),
})
export const parseFormData = data => ({
  ...data,
}) //下拉保存给id给后台
