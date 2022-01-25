import { ShowVolumeInfo, StylesAndFabricsBtn } from '@/components/custom/Button'
import { orderInfoRemote } from '@/services/baseRemote'
import { Popover } from 'antd'
export const tableFields = [
  [
    '单品编号',
    'item_Id',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
        orderIndex: 4,
      },
    },
  ],
  [
    '单品名称',
    'name',
    {
      width: 120,
    },
  ],
  [
    '客户名称',
    'customerName',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
      },
    },
  ],
  [
    '手机号',
    'phone',
    {
      width: 100,
      filter: {
        isunions: true, //联合类型
      },
    },
  ],
  [
    '订单号',
    'order_Id',
    {
      width: 100,
      filter: {
        isunions: true, //联合类型
      },
    },
  ],
  [
    '子订单号',
    'volumerName',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
      },
    },
  ],
  ['退款金额', 'received_Amount', { width: 100 }],
  ['申请时间', 'application_Time', { width: 120 }],
  ['审核时间', 'passion_Time', { width: 120 }],
  [
    '退款状态',
    'refund_Status',
    {
      width: 100,
    },
  ],
  [
    '退款备注',
    'refund_memo',
    {
      width: 200,
      render: (text, record) => {
        return (
          <Popover content={text} title="备注">
            <div
              style={{
                width: '200px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </div>
          </Popover>
        )
      },
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  styleJson: data.styleJson && JSON.parse(data.styleJson),
})
