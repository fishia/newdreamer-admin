
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'

export function requestBonusSettingList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/rewardConfig',
        params: data
    })
}


export function requestBonusSettingCreate(data) {
    return request({
        method: 'put',
        url: '/newdreamer/rewardConfig',
        data: data
    })
}






export function requestBonusSettingExport(data) {
    return exportFile('/newdreamer/rewardConfig/exportExcel', data);
}