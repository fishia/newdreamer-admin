
import request from '../../../../assets/js/request';
import { exportFile } from '../../../../assets/js/common'

export function requestPageDistributorDetail(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backReward/pageDistributorDetail',
        params: data
    })
}
// 


export function requestOrderExport() {
    // exportFile()
}