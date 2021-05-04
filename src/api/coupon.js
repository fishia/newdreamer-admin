import request from '../assets/js/request';
// import Url from "../env";

// 新增优惠券
export function couponCreate(data) {
    return request({
        method: 'post',
        url: '/newdreamer/coupon/create',
        params: data,
        version: 2
    })
}
// 新增优惠券
export function couponUpdate(data) {
    return request({
        method: 'post',
        url: '/newdreamer/coupon/update',
        params: data,
        version: 2
    })
}
// 优惠券明细
export function queryAllCustomerCoupon(data) {
    return request({
        method: 'get',
        url: '/newdreamer/coupon/queryAllCustomerCoupon',
        params: data
    })
}

