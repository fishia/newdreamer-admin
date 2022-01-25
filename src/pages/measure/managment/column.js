import { Switch } from 'antd'
import moment from 'moment'
import { enumSuperset, format } from '@/utils/contants'
import { CollegeSelect, CollegePartSelect, MySelect } from '@/components/custom/select'

export const tableFields = [
  [
    'ND员工编号',
    'nd_Number',
    {
      display: false,
      form: {},
    },
  ],
  [
    '电话',
    'volumer_Phone',
    {
      width: 150,
      filter: {
        isunions: true, //联合类型
      },
      form: { rules: [{ required: true }] },
    },
  ],
  [
    '性别',
    'volumer_Gender',
    {
      width: 60,
      form: {
        type: 'other',
        children: props => <MySelect datasource={enumSuperset['gender']} {...props} />,
      },
    },
  ],
  [
    '高校',
    'volumer_College',
    {
      width: 150,
      filter: {
        isunions: true, //联合类型
      },
      form: {
        type: 'other',
        name: 'college_id',
        children: (props, { setFieldsValue }) => (
          <CollegeSelect
            {...props}
            onChange={(v, obj) => {
              setFieldsValue({
                college_id: v,
                part_id: '',
              })
            }}
          />
        ),
        rules: [{ required: true }],
      },
    },
  ],
  [
    '校区',
    'volumer_Part',
    {
      width: 100,
      form: {
        type: 'other',
        name: 'part_id',
        desp: 'college_id',
        shouldUpdate: true,
        children: ({ disabled, desp }) => <CollegePartSelect parentId={desp} disabled={disabled} />,
        rules: [{ required: true }],
      },
    },
  ],
  ['专业', 'volumer_Major', { width: 80, autoHide: true, form: {} }],
  ['收货地址', 'volumer_Address', { width: 150, autoHide: true, form: {} }],
  ['身份证号', 'identification_Number', { width: 200, autoHide: true, form: {} }],
  [
    '注册时间',
    'register_Time',
    {
      render: text => (text ? moment(text).format(format) : ''),
      width: 150,
      form: {
        type: 'datePicker',
        format,
        disabled: 'edit',
      },
    },
  ],
  [
    '停用时间',
    'disabled_Time',
    {
      width: 150,
      render: text => (text ? moment(text).format(format) : ''),
      form: {
        disabled: 'edit',
        type: 'datePicker',
        format,
      },
    },
  ],
  [
    '有效',
    'volumer_Status',
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
    '销售提成',
    'saleRole',
    {
      display: false,
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '销售提成',
    'saleCommission',
    {
      display: false,
      form: { addonAfter: '%' },
    },
  ],
  [
    '量体提成',
    'measureRole',
    {
      display: false,
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '量体提成',
    'measureCommission',
    {
      display: false,
      form: { addonAfter: '%' },
    },
  ],
  [
    '协助下单',
    'assistWithOrder',
    {
      display: false,
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '学习天地',
    'studyModule',
    {
      display: false,
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '任务发放',
    'releaseTask',
    {
      display: false,
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '运营活动',
    'operationalActivities',
    {
      display: false,
      form: {
        type: 'switch',
      },
    },
  ],
  [
    '兼职协议',
    'files',
    {
      display: false, //不展示在列表
      form: {
        type: 'upload',
        listType: 'text',
        fileDirectorEnum: 'VOLUMER',
        //rules: [{ required: true, type: 'array' }],
      },
    },
  ],
]
export const parseColumns = data => ({
  ...data,
  id: data.volumer_Id,
  disabled_Time: data.disabled_Time ? moment(data.disabled_Time) : undefined,
  register_Time: data.register_Time ? moment(data.register_Time) : undefined,
  files: data.files && JSON.parse(data.files),
})
export const parseFormData = data => ({
  ...data,
  volumer_Id: data.id,
  disabled_Time: data.disabled_Time ? moment(data.disabled_Time).format(format) : undefined,
  register_Time: data.register_Time ? moment(data.register_Time).format(format) : undefined,
  files: JSON.stringify(data.files),
}) //下拉保存给id给后台
