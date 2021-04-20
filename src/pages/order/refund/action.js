
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'
import Url from '../../../env';


export function requestRefundExport(data) {
    exportFile('/newdreamer/backOrder/exportRefund', data);
}

export function requestOrderRefundList(data) {
    return request({
        method: 'get',
        url: Url+ '/newdreamer/backOrder/refundDetails',
        params: data
    })
}

export function requestRefundDetail(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/backOrder/refundDetails',
        params: data
    })
    
}

export function requestRefundOperation(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/refund/authority',
        params: data
    })
    
}



/**
 * 更改订单状态
 * @param {} data 
 */


export function requestRefundStatusUpdate(data) {
    return request({
        method: 'put',
        url: Url + '/newdreamer/backOrder/updateRefundStatus',
        params: data
    })
    
}