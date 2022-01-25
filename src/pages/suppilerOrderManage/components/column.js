import { SupplierSelect } from '@/components/custom/select'

export const tableFields = status => [
  [
    '客户名称',
    'customerName',
    {
      width: 100,
      filter: {
        isunions: true,
      },
      form: {
        rules: [{ required: true }],
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
      autoHide: status === 'TO_BE_DELIVERED',
      filter: {
        isunions: true,
        orderIndex: -1,
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
    '换洗唛包装',
    'packing',
    {
      width: 120,
    },
  ],
  [
    '备注',
    'remark',
    {
      width: 100,
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
      autoHide: status === 'TO_BE_CONFIRMED',
      filter: {
        isunions: true,
      },
    },
  ],
  [
    '收货电话',
    'phoneNumber',
    {
      width: 150,
      autoHide: status === 'TO_BE_CONFIRMED',
      filter: {
        isunions: true,
      },
    },
  ],
  [
    '收货地址',
    'address',
    {
      width: 150,
      autoHide: status === 'TO_BE_CONFIRMED',
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
    'shipmentId',
    {
      width: 100,
      autoHide: ['TO_BE_DELIVERED', 'TO_BE_CONFIRMED'].indexOf(status) > -1,
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  styleJson: data.styleJson && JSON.parse(data.styleJson),
})
