import { Input } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { VolumerSelect, SupplierSelect, MySelect } from '@/components/custom/select'
const { TextArea } = Input

export const tableFields = [
  [
    '客户名称',
    'customerName',
    {
      width: 100,
      filter: {
        isunions: true,
      },
    },
  ],
  [
    '供应商货号',
    'articleNumber',
    {
      width: 150,
    },
  ],
  [
    '供应商名称',
    'supplierName',
    {
      width: 150,
      filter: {
        isunions: true,
      },
      form: {
        type: 'other',
        name: 'supplierId',
        children: props => <SupplierSelect {...props} />,
        rules: [{ required: true }],
      },
    },
  ],
  [
    '尺码规格',
    'size',
    {
      width: 100,
    },
  ],
  [
    '数量',
    'count',
    {
      width: 60,
    },
  ],
  [
    '备注',
    'remark',
    {
      width: 160,
    },
  ],
  [
    '最晚寄出时间',
    'latestSendTime',
    {
      width: 150,
    },
  ],
  [
    '收货人',
    'volumerName',
    {
      width: 80,
      filter: {
        isunions: true,
      },
    },
  ],
  [
    '收货电话',
    'phoneNumber',
    {
      width: 120,
      filter: {
        isunions: true,
      },
    },
  ],
  [
    '收货地址',
    'address',
    {
      width: 100,
    },
  ],
  [
    'ND下单时间',
    'orderTime',
    {
      width: 150,
    },
  ],
  [
    '快递单号',
    'orderId',
    {
      width: 100,
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  styleJson: data.styleJson && JSON.parse(data.styleJson),
})
