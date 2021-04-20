
import request from '../../../../assets/js/request';
import { exportFile } from '../../../../assets/js/common'

export function requestPageVolumerRewardDetail(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backReward/pageVolumerRewardDetail',
        params: data
    })
}
// 