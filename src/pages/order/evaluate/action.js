import request from '@/assets/js/request'
import { exportFile } from '@/assets/js/common'

export function requestEvaluateList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backOrder/evaluation',
    params: data,
  })
}

export function requestOrderDetail(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backOrder/orderDetails',
    params: data,
  })
}

/**
 * 删除
 * @param {}} data
 */
export function requestEvaluateDelete(data) {
  return request({
    method: 'delete',
    url: '/newdreamer/backOrder/deleteEvaluation',
    data: data,
  })
}

export function requestEvaluateExport(data) {
  return exportFile('/newdreamer/backOrder/exportEvaluation', { ids: data })
}
