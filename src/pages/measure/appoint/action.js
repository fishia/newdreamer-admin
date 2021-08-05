import request from '../../../assets/js/request'
import { exportFile } from '../../../assets/js/common'

export function requestForAppointExport(data) {
  exportFile('/newdreamer/backVolumer/exportReservation', data)
}

export function requestAppointList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backVolumer/reservation',
    params: data,
  })
}

/**
 * 修改商品信息
 * @param {} data
 */
export function requestForAppointEdit(data) {
  // TODO: 预约单修改接口
  return request({
    method: 'post',
    url: '/newdreamer/volumer',
    data: data,
    type: 'json',
  })
}

export function requestForAppointUpdateStatus(data) {
  // TODO: 预约单修改接口
  return request({
    method: 'post',
    url: '/newdreamer/backVolumer/updateReservation',
    data: data,
  })
}

export function requestForVolumerList(data) {
  return request({
    method: 'get',
    url: '/newdreamer/volumer/list',
    params: data,
  })
}

export function requestForAppointCreate(data) {
  // TODO: 预约单创建
  return request({
    method: 'put',
    url: '/newdreamer/volumer',
    data: data,
    type: 'json',
  })
}

export function requestForAppointCancel(data) {
  // TODO: 预约单删除
  return request({
    method: 'get',
    url: '/newdreamer/Reservation/delete',
    params: data,
    //    type: 'json'
  })
}

export function requestOrderDetail(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backOrder/orderDetails',
    params: data,
  })
}

export function requestFindSizeInfoByOrder(data) {
  return request({
    method: 'get',
    url: '/newdreamer/backOrder/findSizeInfoById',
    params: data,
  })
}

export function requestForAppointDelete(data) {
  // TODO: 预约单删除
  // return request({
  //     method: 'delete',
  //     url: '/newdreamer/volumer',
  //     data: data,
  //     type: 'json'
  // })
}
