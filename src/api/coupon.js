import { exportFile } from '@/assets/js/common'
import request from '../assets/js/request'
// import Url from "../env";

// 新增优惠券
export function couponCreate(data) {
  return request({
    method: 'post',
    url: '/newdreamer/coupon/create',
    params: data,
    version: 2,
  })
}
// 新增优惠券
export function couponUpdate(data) {
  return request({
    method: 'post',
    url: '/newdreamer/coupon/update',
    params: data,
    version: 2,
  })
}
// 优惠券明细
export function queryAllCustomerCoupon(data) {
  return request({
    method: 'get',
    url: '/newdreamer/coupon/queryAllCustomerCoupon',
    params: data,
  })
}

// 优惠券详情
export function getDetailById(orderId) {
  return request({
    method: 'get',
    url: `/newdreamer/backOrder/order/${orderId}`,
  })
}
//优惠券明细导出
export function exportCustomerCoupon(ids) {
  return exportFile(`/newdreamer/coupon/exportCustomerCoupon`, { ids })
}
