import axios from 'axios';
import { message } from 'antd';

export default function request (options) {
    let header = options.header || {};
    if (options.type === 'json') {
        header['Content-Type'] = 'application/json;utf-8';
    }
    axios.interceptors.response.use(
        response => {
            console.log(response)
            // 当链接是从cLogin、pLogin、adminLogin 页面跳转过来时执行
            // if (
            //   response.config.url.indexOf('/cLogin') !== -1 ||
            //   response.config.url.indexOf('/pLogin') !== -1 ||
            //   response.config.url.indexOf('/adminLogin') !== -1
            // ) {
            //   localStorage.setItem(
            //     'QllToken',
            //     response.headers['access-token']
            //   )
            // }
            // 这里暂时不需要了，因为cookie在登陆页面已经存储了
            // if(response.headers['access-token']){
            //   localStorage.setItem('QllToken', response.headers['access-token']);
            // }
            if (response.config.url.indexOf('/login') !== -1) {
                localStorage.setItem('NdToken', response.headers['access-token']
              )
            }

            return response
        },
        error => {
            // console.log(error.response)
            if (error.response) {
                switch (error.response.status) {
                    case 403:
                        message.error('系统错误！')
                        break
                    case 401:
                        // console.log(error.response.data.errors[0].errmsg)
                        // 多接口报403时，只提示一次登录过期
                        if (localStorage.getItem('NdToken')) {
                            // if (getCookie('access-token')){
                            message.error('未登录或登录已过期')
                            // window.location.href = window.location.origin + '/login'
                            localStorage.removeItem('NdToken');
                            // setCookie('access-token', '', -1);
                        }
                        break;
                    case 500:
                        message.error('服务异常')
                        break
                    case 400:
                        message.error('请求失败')
                        break
                    case 502:
                        message.error('网络错误')
                        break
                    case 504:
                        message.error('网络超时')
                        break
                    default:
                        break
                }

            } else {
                // 无网络时error无response
                message.error('请求超时')
            }
            // 此处不返回reject则会跳到.then中，且res不会返回任何值，为undefined
            // return Promise.reject(error)
        }
    )
    return axios(options).then(response => {
        let resCode = response.status;
        let resSuccess = resCode >= 200 && resCode < 300 || resCode === 304; // jq
        if (resSuccess) {
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    })
}
