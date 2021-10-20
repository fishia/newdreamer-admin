import request from '../../../assets/js/request'
import { exportFile } from '../../../assets/js/common'

export function requestBonusSettingList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/volumeRewardConfig',
    params: data,
  })
}

export function requestBonusSettingCreate(data) {
  return request({
    method: 'put',
    url: '/newdreamer/volumeRewardConfig',
    data: data,
  })
}

export function requestBonusSettingExport(data) {
  return exportFile('/newdreamer/volumeRewardConfig/exportExcel', { ids: data })
}
