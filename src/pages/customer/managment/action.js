
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'
export function requestOrderList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backCustomer/customerInfo',
        params: data
    })

}



export function requestOrderExport(data) {
    console.log('---data----', data);
    return exportFile('/newdreamer/backCustomer/exportCustomer', data);
}