
import request from '../../../../assets/js/request';
import { exportFile } from '../../../../assets/js/common'

export function requestWithDrawList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backReward/pageVolumerWithdraw',
        params: data
    })
}


export function requestUpdateVolumerWithdraw(data) {
    return request({
        method: 'put',
        url: '/newdreamer/backReward/updateVolumerWithdraw',
        params: data
    })
}

export function exportVolumerbutorWithdraw(data) {
    exportFile('/newdreamer/backReward/exportVolumerWithdraw', data);
}
