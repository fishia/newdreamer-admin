
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'
import Url from '../../../env';

export function requestMeasureList(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/volumer',
        params: data
    })
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForMeasureEdit(data) {
    return request({
        method: 'post',
        url: Url + '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}

export function requestForMeasureCreate(data) {
    return request({
        method: 'put',
        url: Url + '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}

export function requestForMeasureDelete(data) {
    return request({
        method: 'delete',
        url: Url + '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}


export function requestForMeasureExport(data) {
    return  exportFile('/newdreamer/volumer/exportExcel', data);
}

