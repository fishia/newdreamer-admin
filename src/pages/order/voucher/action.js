
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'
import Url from '../../../env';


export function requestOrderList(data) {
    return request({
        method: 'get',
        url:Url+ '/newdreamer/backOrder/order',
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
 * 导出
 * @param {} data 
 */
export function requestForOrderExport(data) {
    return exportFile('/newdreamer/backOrder/exportOrder', data);
}

/**
 * 修改状态
 * @param {} data 
 */
export function requestForOrdrStatusUpdate(data) {
    return request({
        method: 'POST',
        url: Url+ '/newdreamer/backOrder/updateOrderStatus',
        params: data
    })
}



/**
 * 发货
 * @param {} data 
 */
export function requestForOrdrShip(data) {
    return request({
        method: 'get',
        url: '/newdreamer/deliver',
        params: data
    })
}


export function requestFindSizeInfoByOrder(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backOrder/findSizeInfoByOrder',
        params: data
    })
}