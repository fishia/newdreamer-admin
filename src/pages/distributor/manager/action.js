import request from '../../../assets/js/request';

import { exportFile } from '../../../assets/js/common'

/**
 * 获取商品列表
 * @param {*} data 
 */
export function requestForFabricList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/distributionTeam',
        params: data
    })
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForFabricEdit(data) {
    return request({
        method: 'post',
        url: '/newdreamer/distributionTeam',
        data: data,
        type: 'json'
    })
}


/**
 * 新建商品
 */

export function requestForFabricCreate(data) {
    return request({
        method: 'put',
        url: '/newdreamer/fabric',
        data: data,
        type: 'json'
    })
}

/**
 * 删除
 * @param {} data 
 */
export function requestForFabricDelete(data) {
    return request({
        method: 'post',
        url: '/newdreamer/fabric/batchUpdate',
        data: data
    })
}


/**
 * 导出
 * @param {} data 
 */
export function requestForFabricExport(data) {
    return exportFile('/newdreamer/distributionTeam/exportExcel', data);
}