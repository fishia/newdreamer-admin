import request from '../assets/js/request';
// import Url from "../env";

export function requestLogin(data) {
    return request({
        method: 'post',
        url: '/newdreamer/auth/login',
        params: data
    })
}
