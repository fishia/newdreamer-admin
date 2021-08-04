import axios from 'axios'
import { TIMEOUT } from './config'
import AlertInterceptor from './alert-interceptor'

let instance = axios.create()

// 超时
instance.defaults.timeout = TIMEOUT
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;'
// http request 拦截器
/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */
/* eslint arrow-body-style: 0 */
AlertInterceptor.use(instance)

export { instance as axios }