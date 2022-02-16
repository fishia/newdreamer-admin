import { ShowVolumeInfo, StylesAndFabricsBtn } from '@/components/custom/Button'
import { orderInfoRemote } from '@/services/baseRemote'
import { enumSuperset } from '@/utils/contants'
export const tableFields = [
  [
    '收货人名称',
    'receiver_Name',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
        orderIndex: -1,
      },
    },
  ],
  [
    '收货人电话',
    'receiver_Phone',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
      },
    },
  ],
  ['实收单据金额', 'total_Received_Amount', { width: 150 }],
  ['付款时间', 'payment_Time', { width: 100 }],
  ['预计使用时间', 'expectedUsingTime', { width: 150 }],
  ['量体顾问', 'volumerName', { width: 100 }],
  ['销售顾问', 'saleAdvisorName', { width: 100 }],
  ['备注', 'remarks', { width: 80 }],
  ['快递地址', 'receiver_Adress', { display: false }],
  [
    '状态',
    'order_Status',
    {
      width: 80,
    },
  ],
]
//子订单
export const childrenTableFields = (customerName, orderId) => [
  [
    '子订单号',
    'item_Id',
    {
      width: 100,
    },
  ],
  [
    'ND单品编号',
    'code',
    {
      width: 125,
    },
  ],
  [
    '单品名称',
    'name',
    {
      width: 200,
    },
  ],
  [
    '数量',
    'amounts',
    {
      width: 60,
    },
  ],
  [
    '产品类型',
    'classificationName',
    {
      width: 120,
    },
  ],
  [
    '尺码规格',
    'size',
    {
      width: 100,
      render: (text, record) => {
        //TODO:如果产品类型是成衣商品展示文字,其他展示量体信息按钮，
        return record.classification === 'FINISHED_PRODUCT' ? (
          text
        ) : record.volume_Id ? (
          <ShowVolumeInfo
            {...{ id: record.volume_Id, record, title: record.order_Id, showCustomized: false }}
          />
        ) : (
          '暂无数据'
        )
      },
    },
  ],
  //   [
  //     '上线价',
  //     'sellingPrice',
  //     {
  //       width: 100,
  //     },
  //   ],
  [
    '优惠券折扣',
    'couponDeduction',
    {
      width: 120,
    },
  ],
  [
    '手动折扣',
    'manualDeduction',
    {
      width: 100,
    },
  ],
  [
    '上线价',
    'sellingPrice',
    {
      width: 100,
    },
  ],
  [
    '实收金额',
    'received_Amount',
    {
      width: 100,
    },
  ],
  [
    '子订单状态',
    'itemStatusName',
    {
      width: 150,
    },
  ],
  [
    '物流单号',
    'shipment_Id',
    {
      width: 100,
    },
  ],
  [
    '款式及面料',
    'styleJson',
    {
      width: 150,
      render: (text, record) => {
        return text ? (
          <StylesAndFabricsBtn
            viewMode={false}
            remote={orderInfoRemote}
            record={text && JSON.parse(text)}
            formData={{ productType: record.itemType, id: record.item_Id }}
            title={`${customerName}-${orderId}-${record.item_Id}`}
          />
        ) : null
      },
    },
  ],
  [
    '退款状态',
    'refund_Status',
    {
      width: 100,
      render: text => enumSuperset['refundStatus'].filter(item => item.value === text)[0]?.label,
    },
  ],
]
export const parseColumns = data => ({
  ...data,
  styleJson: data.styleJson && JSON.parse(data.styleJson),
})
