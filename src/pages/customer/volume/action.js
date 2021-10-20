import request from '../../../assets/js/request'
import { exportFile } from '../../../assets/js/common'

export function requestCustomeVolumeList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backCustomer/sizeInfo',
    params: data,
  })
}

export function requestCustomeVolumeExport(data) {
  return exportFile('/newdreamer/backCustomer/exportSizeInfo', { ids: data })
}

export function requestCustomeVolumeUpdate(data) {
  return request({
    method: 'post',
    url: '/newdreamer/backCustomer/updateSizeInfo',
    data: data,
  })
}
