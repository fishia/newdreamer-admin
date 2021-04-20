
import request from '../../../assets/js/request';
import Url from '../../../env';
import { exportFile } from '../../../assets/js/common'

export function requestEvaluateList(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/backOrder/evaluation',
        params: data
    })
}

export function requestOrderDetail(data) {
    return request({
        method: 'get',
        url: Url+ '/newdreamer/backOrder/orderDetails',
        params: data
    })
    
}

/**
 * 删除
 * @param {}} data 
 */
export function requestEvaluateDelete(data) {
    return request({
        method: 'delete',
        url: Url + '/newdreamer/backOrder/deleteEvaluation',
        data: data
    })
}



export function requestEvaluateExport(data) {
    return exportFile('/newdreamer/backOrder/exportEvaluation', data);
}