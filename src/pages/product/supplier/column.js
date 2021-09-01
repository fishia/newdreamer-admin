import { Switch } from 'antd'
import { enumSuperset } from '@/utils/contants'
import { JKUtil } from '@/utils/util'
import { UnionSelect, MySelect } from '@/components/custom/select'
const { getObjProperty } = JKUtil

export const tableFields = [
  [
    '供应商名称',
    'supplierName',
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
    '供应商类型',
    'classification',
    {
      width: 120,
      filter: {
        isunions: true, //联合类型
      },
      form: {},
    },
  ],
  ['收款方式', 'payWay', { width: 100, autoHide: true, form: {} }],
  ['收款名称', 'payee', { width: 100, autoHide: true, form: {} }],
  ['收款账号', 'payeeAccount', { width: 100, autoHide: true, form: {} }],
  ['开户行', 'bankName', { width: 80, autoHide: true, form: {} }],
  ['税点', 'taxRate', { width: 100, form: {} }],
  ['公司名称', 'companyName', { width: 100, form: {} }],
  ['收货地址', 'receivingAddress', { width: 100, autoHide: true, form: {} }],
  ['收货人', 'receiver', { width: 100, form: {} }],
  ['联系方式', 'contact', { width: 100, form: {} }],
  [
    '启用',
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
    '营业执照',
    'licence',
    {
      display: false, //不展示在列表
      form: {
        type: 'upload',
        fileDirectorEnum: 'SUPPLIER',
        mode: 'single',
        //rules: [{ required: true, type: 'array' }],
      },
    },
  ],
]
export const parseColumns = data => ({
  ...data,
  licence: JSON.parse(data.licence),
})
export const parseFormData = data => ({
  ...data,
  licence: JSON.stringify(data.licence),
}) //下拉保存给id给后台
