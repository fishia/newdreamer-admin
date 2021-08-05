import { Switch } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { SupplierSelect, MySelect } from '@/components/custom/select'

export const tableFields = [
  [
    '单品名称',
    'name',
    {
      width: 120,
      filter: {
        isunions: true,
      },
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '商品类型',
    'itemType',
    {
      width: 100,
      form: {},
    },
  ],
  [
    '产品分类',
    'classificationName',
    {
      width: 100,
      filter: {
        isunions: true,
      },
      form: {
        type: 'other',
        name: 'classification',
        children: props => <MySelect datasource={enumSuperset['productType']} {...props} />,
      },
    },
  ],
  [
    '性别',
    'gender',
    {
      width: 60,
      form: {
        type: 'other',
        children: props => <MySelect datasource={enumSuperset['gender']} {...props} />,
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
    '供应商',
    'supplierName',
    {
      width: 80,
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
    '供应商货号',
    'articleNumber',
    {
      width: 150,
      filter: {
        isunions: true,
      },
      form: {},
    },
  ],
  [
    '成分',
    'ingredient',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '材质',
    'material',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '厚度',
    'thickness',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '弹力',
    'elasticity',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '版型',
    'type',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '颜色',
    'color',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '采购价',
    'purchasePrice',
    {
      width: 80,
      form: { rules: [{ required: true }] },
    },
  ],
  [
    '零售价',
    'retailPrice',
    {
      width: 80,
      form: { rules: [{ required: true }] },
    },
  ],
  [
    '有效',
    'enabled',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      width: 80,
      filter: {
        elem: <MySelect datasource={enumSuperset['enabled']} />,
      },
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '商品图片',
    'images',
    {
      display: false, //不展示在列表
      form: {
        type: 'upload',
        fileDirectorEnum: 'SINGLEITEM',
        rules: [{ required: true, type: 'array' }],
      },
    },
  ],
]
export const parseColumns = data => ({
  ...data,
  images: data.images ? JSON.parse(data.images) : [],
})
export const parseFormData = data => ({
  ...data,
  images: JSON.stringify(data.images),
}) //下拉保存给id给后台
