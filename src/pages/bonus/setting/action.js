import request from '../../../assets/js/request'
import { exportFile } from '../../../assets/js/common'

export function requestBonusSettingList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/withdrawConfig',
    params: data,
  })
}

export function requestBonusSettingCreate(data) {
  return request({
    method: 'put',
    url: '/newdreamer/withdrawConfig',
    data: data,
    type: 'json',
  })
}

export function requestBonusSettingExport(data) {
  return exportFile('/newdreamer/withdrawConfig/exportExcel', { ids: data })
}
