import request from '../assets/js/request';
// import Url from "../env";

export function requestLogin(data) {
    return request({
        method: 'post',
        // url: '/newdreamer/auth/login',
        url: '/newdreamer/user/login',
        params: data
    })
}
export function requestLoginOut() {
    return request({
        method: 'get',
        // url: '/newdreamer/auth/logout'
        url: '/newdreamer/user/logout'
    })
}
// 获取当前登录用户信息
export function getCurrentUser() {
    return request({
        method: 'get',
        // url: '/newdreamer/auth/logout'
        url: '/newdreamer/user/curr'
    })
}
// 获取所有权限
export function queryAllTree() {
    return request({
        method: 'get',
        // url: '/newdreamer/auth/logout'
        url: '/newdreamer/permission/queryAllTree'
    })
}
