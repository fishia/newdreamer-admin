import moment from 'moment'
import { enumSuperset } from '@/utils/contants'
import { MySelect, SalesConsultanterSelect } from '@/components/custom/select'

export const tableFields = [
  [
    '客户姓名',
    'name',
    {
      form: {},
      filter: {
        isunions: true, //联合类型
      },
      width: 100,
    },
  ],
  [
    '手机号',
    'phone',
    {
      form: {
        disabled: 'edit',
      },
      filter: {
        isunions: true, //联合类型
      },
      width: 100,
    },
  ],
  [
    '性别',
    'gender',
    {
      form: {
        type: 'other',
        children: props => <MySelect datasource={enumSuperset['gender']} {...props} />,
      },
      filter: {
        isunions: true, //联合类型
      },
      width: 100,
    },
  ],
  [
    '销售顾问',
    'salesAdvisorName',
    {
      form: {
        type: 'other',
        name: 'salesAdvisorId',
        children: props => <SalesConsultanterSelect {...props} />,
      },
      width: 100,
      filter: {
        isunions: true,
        elem: ({ onChange }) => (
          <SalesConsultanterSelect
            onChange={v => {
              onChange({ salesAdvisorId: v })
            }}
          />
        ),
      },
    },
  ],
  [
    '最后一次登录时间',
    'lastLoginTime',
    {
      width: 200,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      form: {
        type: 'datePicker',
        disabled: 'edit',
      },
    },
  ],
  [
    '账户名称',
    'customer_Wechat_Name',
    {
      width: 100,
      form: {},
    },
  ],
  [
    '订单数量',
    'purchase_Count',
    {
      width: 100,
      form: {
        disabled: 'edit',
      },
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  lastLoginTime: data.lastLoginTime ? moment(data.lastLoginTime) : undefined,
})

export const parseFormData = data => ({
  ...data,
  lastLoginTime: data.lastLoginTime ? moment(data.lastLoginTime).format('YYYY-MM-DD') : undefined,
})
