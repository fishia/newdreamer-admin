

import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'

export function requestHomeConfig(data) {
    return request({
        method: 'get',
        url: '/newdreamer/homepageConfig'
    })
}

export function requestHomeSave(data) {
    return request({
        method: 'post',
        url: '/newdreamer/homepageConfig',
        data: data,
        type: 'json'
    })
}



// export function requestBonusSettingCreate(data) {
//     return request({
//         method: 'put',
//         url: '/newdreamer/volumeRewardConfig',
//         data: data
//     })
// }





// export function requestBonusSettingExport(data) {
//     return exportFile('/newdreamer/volumeRewardConfig/exportExcel', data);
// }