
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'

export function requestDistributionRewardList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backReward/pageDistributorReward',
        params: data
    })
}

export function requestDistributionRewardExport(data) {
    alert('分销明细导出没有接口');
}


export function requestBonusSettingCancel(id) {
    return request({
        method: 'post',
        url: `/newdreamer/backReward/cancelDistributorReward?ids=${id}`,
    })
}
