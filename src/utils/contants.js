//首页
export const homePage = '/nd/home'
//Copyright
export const Copyright = 'Copyright ©版权所有 2021 New Dreamer'
//时间选择
export const dateSeleteList = [
  {
    value: '7',
    label: '过去7天',
    selected: false,
  },
  {
    value: '30',
    label: '过去30天',
    selected: false,
  },
  {
    value: '365',
    label: '过去365天',
    selected: false,
  },
]
export const theme = 'themeA' //菜单主题
export const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}
export const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export const enumSuperset = {
  enabled: [
    { value: 'true', label: '启用' },
    { value: 'false', label: '停用' },
  ], //启用
  status: [
    { value: 'true', label: '上架' },
    { value: 'false', label: '下架' },
  ], //上架
  gender: [
    { value: '男', label: '男' },
    { value: '女', label: '女' },
    { value: '不限', label: '不限' },
  ],
  productType: [
    { value: 'FINISHED_PRODUCT', label: '成衣商品' },
    { value: 'TAILOR_MADE_PRODUCT', label: '量身定制' },
    { value: 'CUSTOMIZED_PRODUCT', label: '个性化定制' },
  ], //产品类型
  orderSource: [
    { value: 'WECHAT', label: '小程序' },
    { value: 'SHOP', label: '门店' },
    { value: 'HEADQUARTERS', label: '总部' },
    { value: 'OTHERS', label: '其他' },
  ],
  washingLabelPackaging: [
    '换洗唛包装',
    '不换洗唛换包装',
    '不换洗唛不换包装',
    '换洗唛不换包装',
  ].map(item => ({ value: item, label: item })), //洗唛包装
  onlineType: [
    { value: 'true', label: '单品' },
    { value: 'false', label: '组合商品' },
  ],
  userType: [
    { value: 'ND_TEAM', label: 'ND团队' },
    { value: 'SUPPLIER', label: '供应商' },
  ], //角色类型
  orderStatus: [
    { value: 'TO_BE_PREPARED', label: '待备货' },
    { value: 'TO_BE_DELIVERED', label: '待发货' },
    { value: 'TO_BE_RECEIVED', label: '待收货' },
    { value: 'TO_BE_EVALUATED', label: '待评价' },
    { value: 'COMPLETED', label: '已完成' },
    { value: 'ALL', label: '全部' },
  ],
  GoodsClassification: ['西服', '衬衫', '配饰', '其他'].map(item => ({ value: item, label: item })),
  finish: [
    { value: 'true', label: '已完成' },
    { value: 'false', label: '未完成' },
  ], //完成状态
  settleAccounts: [
    { value: 'true', label: '已结算' },
    { value: 'false', label: '待结算' },
  ], //结算状态
  refundStatus: [
    { value: 'REFUNDING', label: '退款中' },
    { value: 'REFUNDED', label: '已退款' },
    { value: 'REJECT', label: '已驳回' },
    { value: 'ALL', label: '全部' },
  ],
}

export const format = 'YYYY-MM-DD HH:mm:ss'
export const wrapColumnProps = { width: '20%', textWrap: 'word-break', ellipsis: true }
export const downloadUrl = 'http://wechat-miniapp-newdreamer.oss-cn-shanghai.aliyuncs.com/'
export const uploadSingleUrl = key => `/newdreamer/file/uploadSingle?fileDirectorEnum=${key}`
export const uploadUrl = key => `/newdreamer/file/upload?fileDirectorEnum=${key}`
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
//整行formItem
export const formFullItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
}
//不包含label
export const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 6 },
  },
}
