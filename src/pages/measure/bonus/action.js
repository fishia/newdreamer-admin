import request from '../../../assets/js/request'
import { exportFile } from '../../../assets/js/common'

export function requestBonusList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backVolumer/reward',
    params: data,
  })
}

/**
 * 修改商品信息
 * @param {} data
 */
export function requestForBonusEdit(data) {
  // TODO:奖励金修改接口
  return request({
    method: 'put',
    url: '/newdreamer/backVolumer/updateDeduction',
    params: data,
  })
}

export function requestForBonusExport(data) {
  exportFile('/newdreamer/backVolumer/exportReward', { ids: data })
}
