import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { withRouter } from 'react-router'
import User from '@utils/user'
import { Exception404, Exception403 } from '@/components/exception'
import _isEqual from 'lodash/isEqual'

/**
 * @requireLogin 是否要求登陆才能访问控制台
 * @noMatch除了菜单栏包含的路径外其他一律展示404
 * @Layout 页面布局组件
 */

export default (requireLogin = true) => Layout => {
  return withRouter(
    connect(({ layout }) => ({ ...layout }))(
      class extends PureComponent {
        state = {
          isLogin: false,
          noMatch: this.props.noMatch,
          isForbidden: this.props.isForbidden,
        }
        async UNSAFE_componentWillMount() {
          const {
            history: {
              location: { search, pathname },
              push,
            },
          } = this.props
          /*判断有没有登录、过期逻辑,根据后端逻辑来判断*/
          if (requireLogin) {
            const isLogin = User.isLogin()
            if (isLogin) {
              this.setState({ isLogin })
            } else {
              //若无token，未登录，携带参数挑战登陆页面
              push(`/login?redirectUrl=${pathname}${search}`)
            }
          }
        }
        UNSAFE_componentWillReceiveProps(nextProps) {
          /*是否匹配*/
          if (!_isEqual(nextProps.noMatch, this.props.noMatch)) {
            this.setState({
              noMatch: nextProps.noMatch,
            })
          }
          /*是否是禁止访问页面*/
          if (!_isEqual(nextProps.isForbidden, this.props.isForbidden)) {
            this.setState({
              isForbidden: nextProps.isForbidden,
            })
          }
        }
        render() {
          const { isLogin, isForbidden, noMatch } = this.state
          const { route, history } = this.props

          return isForbidden ? (
            <Exception403 />
          ) : noMatch ? (
            <Exception404 />
          ) : isLogin ? (
            <Layout {...{ route, history }} />
          ) : null
        }
      }
    )
  )
}
