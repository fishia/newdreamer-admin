import { Input } from 'antd'
import moment from 'moment'
import { enumSuperset } from '@/utils/contants'
import { SupplierSelect, MySelect, SingleNoSelect } from '@/components/custom/select'
import { ReceiverAutoCompolete } from '@/components/custom/autoComplete'
const { TextArea } = Input

export const tableFields = classification => [
  [
    '客户名称',
    'customerName',
    {
      width: 100,
      autoHide: true,
      filter: {
        isunions: true,
      },
      form: {
        rules: [{ required: true }],
      },
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
      form: {
        type: 'other',
        name: 'volumerName',
        shouldUpdate: true,
        children: ({ disabled, desp }) => <CollegePartSelect parentId={desp} disabled={disabled} />,
        children: (props, { setFieldsValue, getFieldValue }) => {
          return (
            <ReceiverAutoCompolete
              {...props}
              value={getFieldValue('volumerName')}
              onChange={(v, value, label) => {
                if (v)
                  setFieldsValue({
                    volumerId: value,
                    volumerName: label,
                    phoneNumber: v.volumer_Phone,
                    address: v.volumer_Address,
                  })
              }}
            />
          )
        },
        rules: [{ required: true }],
      },
    },
  ],
  [
    '收货电话',
    'phoneNumber',
    {
      width: 150,
      filter: {
        isunions: true,
      },
      form: {},
    },
  ],
  [
    'ND单品编号',
    'singleItemCode',
    {
      width: 120,
      form: {
        type: 'other',
        rules: [{ required: true }],
        children: (props, { setFieldsValue }) => (
          <SingleNoSelect
            {...props}
            classification={classification}
            onChange={(v, item) => {
              if (item[0])
                setFieldsValue({
                  articleNumber: item[0].articleNumber,
                  supplierId: item[0].supplierId,
                  styleJson: null,
                  productType: item[0].itemType,
                  volumeId: item[0].volume_Id,
                  singleItemCode: item[0].label,
                })
            }}
          />
        ),
      },
    },
  ],
  [
    '供应商货号',
    'articleNumber',
    {
      width: 150,
      form: {},
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
      form: {},
    },
  ],
  [
    '数量',
    'count',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '备注',
    'remark',
    {
      width: 150,
      form: {
        type: 'other',
        children: props => (
          <TextArea {...props} placeholder="请输入备注" showCount maxLength={100} />
        ),
      },
    },
  ],
  [
    '预计使用时间',
    'expectedUsingTime',
    {
      width: 150,
      autoHide: true,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      form: {
        type: 'datePicker',
      },
    },
  ],
  [
    '最晚寄出时间',
    'latestSendTime',
    {
      width: 150,
      autoHide: true,
      render: text => (text ? moment(text).format('YYYY-MM-DD') : ''),
      form: {
        type: 'datePicker',
      },
    },
  ],
  [
    '收货地址',
    'address',
    {
      width: 100,
      autoHide: true,
      form: {},
    },
  ],
  [
    '订单来源',
    'orderSourceName',
    {
      width: 100,
      form: {
        type: 'other',
        name: 'orderSource',
        rules: [{ required: true }],
        children: props => <MySelect {...props} datasource={enumSuperset['orderSource']} />,
      },
    },
  ],
  [
    '订单号',
    'orderId',
    {
      width: 200,
      filter: {
        isunions: true,
      },
      form: { rules: [{ required: true }] },
    },
  ],
  [
    '产品类型',
    'productType',
    {
      display: false,
      form: { hidden: true },
    },
  ],
  [
    '收货人',
    'volumerId',
    {
      display: false,
      form: { hidden: true },
    },
  ],
]

export const parseColumns = data => ({
  ...data,
  size: data.size === '量身定制' ? '' : data.size,
  expectedUsingTime: data.expectedUsingTime ? moment(data.expectedUsingTime) : undefined,
  latestSendTime: data.latestSendTime ? moment(data.latestSendTime) : undefined,
  styleJson: data.styleJson && JSON.parse(data.styleJson),
})

export const parseFormData = data => ({
  ...data,
  expectedUsingTime: data.expectedUsingTime
    ? moment(data.expectedUsingTime).format('YYYY-MM-DD')
    : undefined,
  latestSendTime: data.latestSendTime
    ? moment(data.latestSendTime).format('YYYY-MM-DD')
    : undefined,
  styleJson: JSON.stringify(data.styleJson),
})
