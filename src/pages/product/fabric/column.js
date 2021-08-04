import { Switch } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { SupplierSelect, MySelect } from '@/components/custom/select'

export const tableFields = [
  [
    '面料类型',
    'fabric_Classsification',
    {
      width: 100,
      filter: {
        isunions: true, //联合类型
      },
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '供应商',
    'supplierName',
    {
      width: 100,
      form: {
        type: 'other',
        name: 'supplierId',
        children: props => <SupplierSelect {...props} />,
        rules: [{ required: true }],
      },
    },
  ],
  [
    '供应商面料号',
    'supplierCode',
    {
      width: 150,
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '颜色',
    'fabric_Color',
    {
      width: 60,
      form: {},
    },
  ],
  ['厚度', 'thickness', { width: 60, form: {} }],
  ['成分', 'material', { width: 60, form: {} }],
  ['克重', 'fabricWeight', { width: 60, form: {} }],
  ['支数', 'fabricCount', { width: 60, form: {} }],
  ['弹力', 'elasticity', { width: 60, form: {} }],
  ['上架年份', 'year', { width: 100, form: {} }],
  ['采购价', 'purchasePrice', { width: 80, form: {} }],
  ['零售价', 'retailPrice', { width: 80, form: {} }],
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
    '面料图片',
    'fabric_Image',
    {
      display: false, //不展示在列表
      form: {
        type: 'upload',
        fileDirectorEnum: 'FABRIC',
        rules: [{ required: true, type: 'array' }],
      },
    },
  ],
]
export const parseColumns = data => ({
  ...data,
  code: data.fabric_Id,
  fabric_Image: JSON.parse(data.fabric_Image),
})
export const parseFormData = data => ({
  ...data,
  fabric_Id: data.code,
  fabric_Image: JSON.stringify(data.fabric_Image),
}) //下拉保存给id给后台
