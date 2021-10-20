import request from '../../../../assets/js/request'
import { exportFile } from '../../../../assets/js/common'

export function requestDistributorWithdrawList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backReward/pageDistributorWithdraw',
    params: data,
  })
}
//

export function requestUpdateDistributorWithdraw(data) {
  return request({
    method: 'put',
    url: '/newdreamer/backReward/updateDistributorWithdraw',
    params: data,
  })
}

export function exportDistributorWithdraw(data) {
  exportFile('/newdreamer/backReward/exportDistributorWithdraw', { ids: data })
}
