import { axios } from '../axios'
import { jsonToUrl } from '@utils/util'
import { exportFile } from '@/assets/js/common'
import request from '@/assets/js/request'
//基础crud接口类
class baseCrudApi {
  constructor(url) {
    this.url = url
  }
  //获取分页或列表
  page(params) {
    return axios.get(`${this.url}/page?${jsonToUrl(params)}`, { type: 'page' })
  }
  //获取分页或列表
  list(params) {
    return axios.get(`${this.url}/list?${jsonToUrl(params)}`, { type: 'list' })
  }
  //新增、编辑
  saveOrUpdate(params) {
    return params.id
      ? axios.put(`${this.url}`, { ...params })
      : axios.post(`${this.url}`, { ...params })
  }
  //删除
  deletes(ids) {
    return axios.delete(`${this.url}`, { data: { ids } })
  }
  //面料类型
  listClassification(params) {
    return axios.get(`${this.url}/listClassification?${jsonToUrl(params)}`, { type: 'list' })
  }
  //商品类型
  listItemType(params) {
    return axios.get(`${this.url}/listItemType?${jsonToUrl(params)}`, { type: 'list' })
  }
}

//带子信息的crud接口类
class BornCroudApi extends baseCrudApi {
  constructor(props) {
    super(props)
  }
  //导入
  importExcel() {
    return `${this.url}/importExcel`
  }
  exportExcel(params) {
    return exportFile(`${this.url}/exportExcel`, { ...params })
  }
}

//用户
export const userRemote = (function (url) {
  return {
    //用户登录
    userLogin: params => {
      return axios.post(`${url}/user/login`, { ...params }, { needLogin: false })
    },
    //根据token获取用户信息
    getUserInfo: () => {
      return axios.get(`${url}/user/info`)
    },
    //退出登录
    logout: () => {
      return axios.post(`${url}/user/logout`)
    },
    //获取菜单
    getMenus: () => {
      return axios.get(`${url}/user/curr`)
    },
  }
})('/newdreamer')

//供应商管理
export const supplierRemote = new baseCrudApi('/newdreamer/supplier')
//面料管理
export const fabricRemote = new BornCroudApi('/newdreamer/fabric')
//款式管理
export const styleRemote = new baseCrudApi('/newdreamer/style')
//单品管理
export const singleItemRemote = new BornCroudApi('/newdreamer/singleItem')
//商品管理
export const productInfoRemote = new BornCroudApi('/newdreamer/productInfo')
//高校名称
export const collegeInfoRemote = new baseCrudApi('/newdreamer/collegeInfo')
//着装顾问
export const volumerRemote = new BornCroudApi('/newdreamer/volumer')
//顾问提成
export const bonusRemote = new BornCroudApi('/newdreamer/volumerRewardInfo')
//单条结算
bonusRemote.settle = params => {
  return axios.post(`/newdreamer/volumerRewardInfo/settle`, { ...params })
}
//批量结算
bonusRemote.batchSettle = params => {
  return axios.post(`/newdreamer/volumerRewardInfo/batchSettle`, { ...params })
}

//制单生产
let productInMakingRemote = new baseCrudApi('/newdreamer/productInMaking')
//订单状态更改
productInMakingRemote.updateStatus = params => {
  return axios.post(`/newdreamer/productInMaking/updateStatus`, { ...params })
}
//订单撤销
productInMakingRemote.cancel = params => {
  return axios.post(`/newdreamer/productInMaking/cancel`, { ...params })
}
//订单状态统计
productInMakingRemote.countStatus = params => {
  return axios.get(`/newdreamer/productInMaking/countStatus?${jsonToUrl(params)}`)
} //订单状态统计
productInMakingRemote.exportExcel = params => {
  return exportFile(`/newdreamer/productInMaking/exportExcel`, { ...params })
}
export { productInMakingRemote }

//发布任务
export const taskRemote = new BornCroudApi('/newdreamer/task')
//适用范围
export const taskScopeRemote = new baseCrudApi('/newdreamer/taskScope')
//任务领取
export const taskReceiveRecordRemote = new BornCroudApi('/newdreamer/taskReceiveRecord')

//订单信息
export const orderInfoRemote = (url => {
  return {
    //获取分页或列表
    page(params) {
      return axios.get(`${url}/order?${jsonToUrl(params)}`, { type: 'page' })
    },
    findSizeInfoById(params) {
      return axios.get(`${url}/findSizeInfoById?${jsonToUrl(params)}`)
    },
    //获取商品类型
    detail(params) {
      return axios.get(`${url}/orderDetails?${jsonToUrl(params)}`)
    },
    //修改状态
    updateOrderStatus(params) {
      return axios.post(`${url}/updateOrderStatus`, { ...params })
    },
    //备货
    produce(params) {
      return axios.post(`${url}/produce`, { ...params })
    },
    //撤销
    cancelProduce(params) {
      return axios.post(`${url}/cancelProduce`, { ...params })
    },
    //设置子订单样式
    updateStyle(params) {
      return axios.post(`${url}/updateStyle`, { ...params })
    },
    //发货
    deliver(params) {
      return axios.get(`${url}/deliver?${jsonToUrl(params)}`)
    },
    //导出
    exportExcel(params) {
      return exportFile(`${url}/exportOrder`, { ...params })
    },
    //订单状态数量统计
    orderStatusCount() {
      return axios.get(`${url}/orderStatusCount`)
    },
    //退款状态数量统计
    refundStatusCount() {
      return axios.get(`${url}/refundStatusCount`)
    },
    //绑定销售顾问、量体数据
    bind(params) {
      return axios.post(`${url}/bind`, { ...params })
    },
    //退款订单列表
    refundPage(params) {
      return axios.get(`${url}/refund?${jsonToUrl(params)}`, { type: 'page' })
    },
    //退款
    refundApply(params) {
      return axios.post(`${url}/refundApply`, { ...params })
    },
    //撤销退款
    refundCancel(params) {
      return axios.post(`${url}/refundCancel`, { ...params })
    },
    //退款审批
    refundAudit(params) {
      return axios.post(`${url}/refundAudit`, { ...params })
    },
    //撤销备注
    refundRemark(params) {
      return axios.post(`${url}/refundRemark`, { ...params })
    },
    //退款导出
    exportRefund(params) {
      return exportFile(`${url}/exportRefund`, { ...params })
    },
  }
})('/newdreamer/backOrder')

//评价管理
export const evaluateRemote = (url => {
  return {
    //评价列表
    page(params) {
      return axios.get(`${url}/evaluation`, { ...params })
    },
    //删除
    deletes(params) {
      return axios.get(`${url}/deleteEvaluation`, { ...params })
    },
    //新增、编辑
    saveOrUpdate(params) {
      return params.id
        ? axios.put(`${this.url}`, { ...params })
        : axios.post(`${this.url}`, { ...params })
    },
    //导入
    importExcel() {
      return `${this.url}/importExcel`
    },
    exportExcel(params) {
      return exportFile(`${this.url}/exportExcel`, { ...params })
    },
  }
})('/newdreamer/backOrder')

//获取二维码
export const getQrcode = params => {
  return request(`/api/QRcode/get?${jsonToUrl(params)}`, '')
}

//客户管理
export const backCustomerRemote = (url => {
  return {
    //评价列表
    page(params) {
      return axios.get(`${url}/customerInfo?${jsonToUrl(params)}`, { type: 'page' })
    },
    //删除
    deletes(params) {
      return axios.get(`${url}/deleteEvaluation`, { ...params })
    },
    //新增、编辑
    saveOrUpdate(params) {
      return axios.post(`${url}/partialUpdate`, { ...params })
    },
    exportExcel(params) {
      return exportFile(`${url}/exportCustomer`, { ...params })
    },
  }
})('/newdreamer/backCustomer')
