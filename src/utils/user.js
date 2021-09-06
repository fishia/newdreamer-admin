import { requestLoginOut } from '@/api/login'
import { message } from 'antd'
const location = window.location
const USER_INFO = 'USER_INFO'

export default class User {
  static userInfo = {}

  /**
   * @desc 获取用户信息
   * @return {Object}
   */
  static getUserInfo() {
    return JSON.parse(localStorage.getItem(USER_INFO) || '{}')
  }

  /**
   * @desc 登录存入用户信息
   * @param userInfo {Object}
   */
  static login(userInfo) {
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
    this.userInfo = userInfo
    return Promise.resolve(userInfo)
  }

  /**
   * @desc 更新存入用户信息
   * @param userInfo {Object}
   */
  static updateUserInfo(userInfo) {
    localStorage.setItem(USER_INFO, JSON.stringify(Object.assign(this.getUserInfo(), userInfo)))
  }

  /**
   * @desc 清空UserInfo
   */
  static clearUserInfo() {
    localStorage.removeItem(USER_INFO)
    this.userInfo = {}
  }

  /**
   * @desc 登出
   */
  static async logout() {
    //后台也需要清除一些信息
    requestLoginOut().then(res => {
      if (res.code === 200) {
        message.success('您已成功退出')
        this.clearUserInfo()
        this.toLogin()
      }
    })
  }

  /**
   * @desc 是否登录
   * @return {Boolean}
   */
  static isLogin() {
    if (this.userInfo.token) {
      return true
    } else {
      let { token = false } = this.getUserInfo()
      return Boolean(token)
    }
  }

  /**
   * @desc 跳转登录页
   */
  static toLogin() {
    location.href = `${location.origin}/#/login`
  }
}
