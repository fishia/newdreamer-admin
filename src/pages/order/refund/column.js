import { ShowVolumeInfo, StylesAndFabricsBtn } from '@/components/custom/Button'
import { orderInfoRemote } from '@/services/baseRemote'
import { enumSuperset } from '@/utils/contants'
import { Popover } from 'antd'
export const tableFields = status => [
  [
    '单品编号',
    'code',
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
    'item_Id',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
      },
    },
  ],
  ['退款金额', 'received_Amount', { width: 100 }],
  ['申请时间', 'applicationTime', { width: 120 }],
  ['审核时间', 'passion_Time', { width: 120, display: status !== 'REFUNDING' }],
  [
    '退款状态',
    'refund_Status',
    {
      width: 100,
      render: text => enumSuperset['refundStatus'].filter(item => item.value === text)[0]?.label,
    },
  ],
  [
    '退款备注',
    'refundRemark',
    {
      width: 200,
      display: status !== 'REFUNDING',
      render: (text, record) => {
        return (
          <Popover content={text} title="备注" placement="topLeft">
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
