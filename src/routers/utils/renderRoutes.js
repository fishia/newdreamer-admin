import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import DocumentTitle from 'react-document-title'
import User from '@utils/user'
import { Spin } from 'antd'
import dynamic from 'dva/dynamic'
import { app } from '@'

const renderRouteComponent = (route, props) => {
  const Component = dynamic({
    app,
    LoadingComponent: () => (
      <div style={{ paddingTop: 200, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    ),
    ...route,
  })

  const routeName = route.title || '梦想家'
  if (route.component) {
    return (
      <DocumentTitle title={`${routeName}`}>
        <Component {...{ ...props, app }} route={route} />
      </DocumentTitle>
    )
  } else {
    return null
  }
}
const redirectArr = ['/login']
const renderInterceptor = (route, props) => {
  const { redirect = '', needLogin = true } = route
  //如果已经登陆并且匹配到了以上路径直接跳转到首页
  if (User.isLogin() && redirectArr.indexOf(route.path) !== -1) {
    return <Redirect from={route.path} to={'/'} />
  }
  //判断是否进行重定向
  if (redirect) {
    return <Redirect from={route.path} to={redirect} />
  }

  // 判断用户是否登录
  if (needLogin && !User.isLogin()) {
    return <Redirect from={route.path} to={'/login'} />
  }
  return renderRouteComponent(route, props)
}
function renderRoutes(routes) {
  return routes ? (
    <Switch>
      {routes.map(({ path, ...dynamics }, key) => {
        return (
          <Route
            key={key}
            exact={dynamics.exact}
            path={path}
            render={props => {
              return renderInterceptor({ path, ...dynamics }, props)
            }}
          />
        )
      })}
    </Switch>
  ) : null
}

export default renderRoutes
