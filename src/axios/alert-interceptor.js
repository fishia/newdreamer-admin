import { message } from 'antd'
import { Modal } from 'antd'
import User from '@utils/user'
import uuid from 'react-uuid'
import { codeMessage } from './config'

const install = axios => {
  axios.interceptors.request.use(
    config => {
      config.headers = {
        //当只设置cacahe-control: 'no-cache'时，IE浏览器始终返回304，抓包工具抓不到包，请求不和服务器确认
        //当只设置cacahe-control: 'no-cache'时，google浏览器始终返回200，抓包工具可以抓取包，请求重新从服务器获取数据，没有利用到浏览器的缓存功能
        'cache-control': 'no-cache',
        //当只设置Pragma: 'no-cache'时，IE浏览器始终返回200，抓包工具可以抓到所有包，请求重新从服务器获取数据，没有利用到浏览器的缓存功能
        //当只设置Pragma: 'no-cache'时，google浏览器始终返回200，抓包工具可以抓到所有包，请求重新从服务器获取数据，没有利用到浏览器的缓存功能
        Pragma: 'no-cache',
      }
      const { needLogin = true } = config
      // 需要登录且未登录,直接去登陆
      if (!User.isLogin() && needLogin) {
        User.toLogin()
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  //响应后拦截
  axios.interceptors.response.use(
    response => {
      let {
        data: { data, success, msg },
        config: { method, type, beenFile = false },
      } = response
      let status = success
      if (!status) {
        message.error(msg || '请求出错', 3)
      }
      //特殊相应结构解析
      switch (type) {
        //分页
        case 'page':
          return {
            status,
            data: {
              content: Array.isArray(data.content) ? data.content : [],
              ...data,
            },
          }
        //集合
        case 'list':
          return { status, data: Array.isArray(data) ? data : [] }
      }
      //是否是下载文件
      if (beenFile) {
        return response.data
      }
      return Promise.resolve({ ...response.data, status, data })
    },
    error => {
      const {
        response: {
          data,
          status,
          config: { type, method },
        },
      } = error
      const { errors, message: msg } = data
      switch (status) {
        case 401:
          User.clearUserInfo()
          Modal.error({
            content: '你的账户信息已过期，请重新登录',
            okText: 'token已失效，请重新登录',
            keyboard: false,
            onOk() {
              User.toLogin()
            },
          })
          return Promise.reject(msg)
        case 422:
          if (Array.isArray(errors)) {
            message.error(msg || codeMessage[status], 3)
            return { status: false, data }
          }
          return Promise.resolve({
            status: false,
            data: {
              message: msg,
              errors: Object.keys(errors).map(item => ({
                name: [item],
                errors: errors[item],
                validateStatus: true,
              })),
            },
          })
        default:
          message.error(data.message || codeMessage[status], 3)
          //特殊相应结构解析
          switch (type) {
            //分页
            case 'page':
              return { status: false, data: { info: [], count: 0 } }
            //集合
            case 'list':
              return { status: false, data: [] }
          }
          return Promise.resolve({ status: false, data: { message, errors: [] } })
      }
    }
  )
}

export default {
  use: install,
}
