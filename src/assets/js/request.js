import axios from 'axios'
import { message, Modal } from 'antd'
import User from '@utils/user'

export default function request(options) {
  // console.log(options)
  let header = options.header || {}
  if (options.type === 'json') {
    header['Content-Type'] = 'application/json;utf-8'
  }
  axios.interceptors.response.use(
    response => {
      // console.log(response)
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
            // 多接口报403时，只提示一次登录过期
            User.clearUserInfo()
            Modal.error({
              content: '你的账户信息已过期，请重新登录',
              okText: 'token已失效，请重新登录',
              keyboard: false,
              onOk() {
                User.toLogin()
              },
            })
            break
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
  // 将post请求的参数放在body中
  if (options.method === 'post' && options.version === 2) {
    return axios
      .post(options.url, options.params)
      .then(response => {
        // 200
        if (response) {
          let resCode = response.status
          let resSuccess = (resCode >= 200 && resCode < 300) || resCode === 304 // jq
          if (resSuccess) {
            return response.data
          } else {
            return Promise.reject(response.data)
          }
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else if (options.method === 'delete' && options.version === 2) {
    // console.log(options)
    return axios
      .delete(options.url, { params: options.params })
      .then(response => {
        // 200
        if (response) {
          let resCode = response.status
          let resSuccess = (resCode >= 200 && resCode < 300) || resCode === 304 // jq
          if (resSuccess) {
            return response.data
          } else {
            return Promise.reject(response.data)
          }
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    return axios(options)
      .then(response => {
        if (response) {
          let resCode = response.status
          let resSuccess = (resCode >= 200 && resCode < 300) || resCode === 304 // jq
          if (resSuccess) {
            return response.data
          } else {
            return Promise.reject(response.data)
          }
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
