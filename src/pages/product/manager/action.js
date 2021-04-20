import request from '../../../assets/js/request';
import Url from '../../../env';
import { exportFile } from '../../../assets/js/common'


/**
 * 获取商品列表
 * @param {*} data 
 */
export function requestForProductList(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/productInfo',
        params: data
    })
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForProductEdit(data) {
    return request({
        method: 'post',
        url: Url +  '/newdreamer/productInfo',
        data: data,
        type: 'json'
    })
}


/**
 * 新建商品
 */

export function requestForProductCreate(data) {
    return request({
        method: 'put',
        url: Url + '/newdreamer/productInfo',
        data: data,
        type: 'json'
    })
}

/**
 * 删除
 * @param {} data 
 */
export function requestForProductDelete(data) {
    return request({
        method: 'post',
        url: Url + '/newdreamer/productInfo/batchUpdate',
        data: data
    })
}



/**
 * 导出
 * @param {} data 
 */
export function requestForProductExport(data) {
    return exportFile('/newdreamer/productInfo/exportExcel', data);
}


/**
 * 导入
 * @param {} data 
 */
export function requestForProductImport(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/productInfo/importExcel',
        params: data
    })
}