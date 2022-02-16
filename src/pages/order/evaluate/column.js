import { Input } from 'antd'
const { TextArea } = Input
export const tableFields = [
  [
    '订单号',
    'order_Id',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
      },
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '姓名',
    'name',
    {
      width: 80,
      filter: {
        isunions: true, //联合类型
        orderIndex: -1,
      },
      form: {},
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
      form: {},
    },
  ],
  ['评价时间', 'evaluation_Time', { width: 100, form: {} }],
  ['评价内容', 'evaluation_Content', { width: 100, form: {} }],
  ['尺寸', 'size', { width: 80, form: {} }],
  ['面料', 'fabric', { width: 80, form: {} }],
  ['做工', 'work', { width: 80, form: {} }],
  ['量体', 'volumer', { width: 80, form: {} }],
  [
    '图片',
    'photos',
    {
      width: 120,
      form: {
        type: 'upload',
        fileDirectorEnum: 'SUPPLIER',
      },
    },
  ],
  [
    '回复评论',
    'contact',
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
]
export const parseColumns = data => ({
  ...data,
  photos: JSON.parse(data.photos),
})
export const parseFormData = data => ({
  ...data,
  photos: JSON.stringify(data.photos),
}) //下拉保存给id给后台
