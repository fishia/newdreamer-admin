import { Switch } from 'antd'
import { VtxImage } from '@vtx/components'
import { enumSuperset } from '@/utils/contants'
import { MySelect } from '@/components/custom/select'
import ImagePreviewGroup from '@/components/custom/ImagePreviewGroup'

export const tableFields = [
  [
    '上线商品名称',
    'name',
    {
      width: 150,
      filter: {
        isunions: true,
      },
      form: {
        rules: [{ required: true }],
      },
    },
  ],
  [
    '上线商品分类',
    'productType',
    {
      width: 150,
      form: {},
    },
  ],
  [
    '产品分类',
    'classification',
    {
      width: 100,
      render: (_, record) => record.classificationName,
      filter: {
        isunions: true,
        elem: ({ onChange, style }) => (
          <MySelect
            datasource={enumSuperset['productType']}
            onChange={v => {
              onChange({ classification: v })
            }}
            style={style}
          />
        ),
      },
      form: {
        type: 'other',
        children: props => <MySelect datasource={enumSuperset['productType']} {...props} />,
      },
    },
  ],
  [
    '商品显示价',
    'price',
    {
      width: 150,
      form: {},
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
    '排序',
    'sortNum',
    {
      width: 60,
      form: {},
    },
  ],
  [
    '面料成分',
    'ingredient',
    {
      width: 60,
      display: false,
      form: {},
    },
  ],
  [
    '款式',
    'style',
    {
      width: 60,
      display: false,
      form: {},
    },
  ],
  [
    '版型',
    'type',
    {
      width: 60,
      display: false,
      form: {},
    },
  ],
  [
    '颜色',
    'color',
    {
      width: 60,
      display: false,
      form: {},
    },
  ],
  [
    '材质',
    'material',
    {
      width: 60,
      display: false,
      form: {},
    },
  ],
  [
    '厚度',
    'thickness',
    {
      width: 60,
      display: false,
      form: {},
    },
  ],
  [
    '弹力',
    'elasticity',
    {
      width: 60,
      display: false,
      form: {},
    },
  ],
  [
    '上架',
    'status',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      width: 80,
      filter: {
        elem: <MySelect datasource={enumSuperset['status']} />,
      },
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '商品主图',
    'images',
    {
      width: 300,
      render: (text, record) => {
        //展示详情
        return text && <ImagePreviewGroup images={text} />
      },
      form: {
        type: 'upload',
        fileDirectorEnum: 'PRODUCT',
        // rules: [{ required: true, type: 'array' }],
      },
    },
  ],
  [
    '商品详情图',
    'detailImages',
    {
      width: 150,
      render: (text, record) => {
        //展示详情
        return text && <ImagePreviewGroup images={text} />
      },
      form: {
        type: 'upload',
        mode: 'single',
        fileDirectorEnum: 'PRODUCT',
        // rules: [{ required: true, type: 'array' }],
      },
    },
  ],
]

//子商品
export const childTableFields = [
  [
    '上线类型',
    'single',
    {
      width: 100,
      render: text =>
        enumSuperset['onlineType'].filter(item => item.value == text.toString())[0]?.label || text,
      form: {
        type: 'other',
        children: props => <MySelect datasource={enumSuperset['onlineType']} {...props} />,
      },
    },
  ],
  [
    '子商品名称',
    'subName',
    {
      width: 150,
      form: { rules: [{ required: true }] },
    },
  ],
  [
    '零售价',
    'retailPriceTotal',
    {
      width: 80,
      form: {
        disabled: true,
        rules: [{ required: true }],
      },
    },
  ],
  [
    '上线价',
    'sellingPriceTotal',
    {
      width: 80,
      form: {
        disabled: true,
        rules: [{ required: true }],
      },
    },
  ],
  [
    '量体数据',
    'optionalData',
    {
      render: (text, record) => {
        return <Switch checked={text} disabled />
      },
      width: 100,
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '面料选择',
    'optionalFabric',
    {
      width: 100,
      render: (_, record) => {
        return record.fabricClassification ? record.fabricClassification : '/'
      },
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '款式选择',
    'optionalStyle',
    {
      width: 100,
      render: (_, record) => {
        return record.styleType ? record.styleType : '/'
      },
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '子商品图',
    'images',
    {
      display: false,
      form: {
        type: 'upload',
        mode: 'single',
        fileDirectorEnum: 'PRODUCT',
        // rules: [{ required: true, type: 'array' }],
      },
    },
  ],
]
//孙子商品
export const grandsonTableFields = [
  [
    'ND单品名称',
    'name',
    {
      width: 150,
      form: { disabled: true, rules: [{ required: true }] },
    },
  ],
  [
    '产品类型',
    'classificationName',
    {
      width: 100,
      form: { disabled: true, rules: [{ required: true }] },
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
    '零售价',
    'retailPrice',
    {
      width: 80,
      form: {
        disabled: true,
        rules: [{ required: true }],
      },
    },
  ],
  [
    '上线单价',
    'sellingPrice',
    {
      width: 100,
      form: {
        rules: [{ required: true }],
      },
    },
  ],
]
export const parseColumns = data => ({
  ...data,
  images: data.images && JSON.parse(data.images),
  detailImages: data.detailImages && JSON.parse(data.detailImages),
  subProducts: data.subProducts?.map(item => ({
    ...item,
    single: item.single.toString(),
    images: item.images && JSON.parse(item.images),
  })),
})
export const parseFormData = data => ({
  ...data,
  images: JSON.stringify(data.images),
  detailImages: JSON.stringify(data.detailImages),
  subProducts: data.subProducts?.map(item => ({ ...item })),
}) //下拉保存给id给后台
//复制重置formData
export const resetFormData = data => ({
  ...data,
  subProducts: data.subProducts?.map(item => ({
    ...item,
    id: '',
    detailList: item.detailList?.map(item => ({ ...item, id: '' })),
  })),
})
