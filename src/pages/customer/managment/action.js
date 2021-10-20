import request from '../../../assets/js/request'
import { exportFile } from '../../../assets/js/common'
export function requestOrderList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backCustomer/customerInfo',
    params: data,
  })
}

export function requestOrderExport(data) {
  return exportFile('/newdreamer/backCustomer/exportCustomer', { ids: data })
}
