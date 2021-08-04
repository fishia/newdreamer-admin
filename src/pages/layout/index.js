import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import { Layout, Menu, message, Breadcrumb } from 'antd'
import Routes from '@/routes'
import './index.less'
import { getCurrentUser, requestLoginOut } from '@/api/login'
import MenuTitle from './components/menuTitle'
import User from '@/utils/user'

const { Sider, Header, Content } = Layout

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      collapsed: false,
      routeList: [...Routes],
    }
  }
  async componentDidMount() {
    // await queryAllTree().then(res => {
    //     console.log(res.data, '所有权限')
    // });
    await getCurrentUser().then(res => {
      if (res.code === 200) {
        // console.log(res.data, '当前用户权限');
        // console.log(this.state.routeList, '本地路由');
        let permissionsObj = {} // 将所有拥有的权限放到该对象中
        res.data.permissions.forEach(item => {
          permissionsObj[item.remark] = item
        })
        // console.log(permissionsObj, 'permissionsObj')
        this.routeContrast(this.state.routeList, permissionsObj)
        // console.log(this.state.routeList, '对比之后的路由')
      }
    })
    this.setState({
      show: true,
    })
  }
  // 所有路由 和 当前登录权限对比
  routeContrast(data, permissionsObj) {
    for (let i = 0; i < data.length; i++) {
      // 如果权限中存在该页面 将isShow设置为true
      if (permissionsObj[data[i].name]) {
        data[i].isShow = true
      }
      if (data[i].children) {
        this.routeContrast(data[i].children, permissionsObj)
      }
    }
  }
  loginOut = () => {
    requestLoginOut().then(res => {
      if (res.code === 200) {
        // this.props.history.push('/login');
        message.success('退出登录')
        setTimeout(function () {
          window.location.href = window.location.origin + '/login'
        }, 1000)
      }
    })
  }
  render() {
    let { routeList, collapsed } = this.state
    let pathName = window.location.pathname
    let defaultKeys = pathName
      .split('/')
      .slice(1)
      .reduce((result, item) => {
        if (!result.length) {
          result.push(`/${item}`)
          return result
        }
        let last = result[result.length - 1]
        result.push(`${last}/${item}`)
        return result
      }, [])
    function renderRoute(routes, parent) {
      return routes.map((route, index) => {
        // if (route)
        // console.log(route, '来了11111111111')
        return (
          <React.Fragment key={route.path + index}>
            {route.isShow ? (
              <Route
                path={route.path}
                render={props => {
                  if (!route.component) {
                    return null
                  }
                  return (
                    <div style={{ padding: '20px' }}>
                      <Breadcrumb>
                        {route.bread.map((item, itemIndex) => (
                          <Breadcrumb.Item key={itemIndex}>{item}</Breadcrumb.Item>
                        ))}
                      </Breadcrumb>
                      {/*-----挂载路由-----*/}
                      <route.component {...props} />
                    </div>
                  )
                }}
              ></Route>
            ) : null}

            {route.children && renderRoute(route.children, route)}
          </React.Fragment>
        )
      })
    }
    function renderMenu(routes) {
      let startRoutes = routes[0].children
      let global = routes[0].path
      startRoutes = startRoutes.map(item => {
        item.path = global + item.path
        return item
      })
      const renderSubMenu = function (route, index) {
        if (route.isShow) {
          route.bread = route.bread || [route.name]
          return (
            <Menu.SubMenu
              key={route.path}
              title={
                <Link style={{ color: '#fff' }} to={route.path}>
                  {route.name}
                </Link>
              }
            >
              {route.children &&
                route.children.map((child, index2) => {
                  child.path = route.path + child.path
                  child.bread = [...(route.bread || []), ...[child.name]]
                  if (!child.children && child.isShow) {
                    return (
                      <Menu.Item key={child.path}>
                        <Link to={child.path}>{child.name}</Link>
                      </Menu.Item>
                    )
                  }
                  return renderSubMenu(child, index2)
                })}
            </Menu.SubMenu>
          )
        }
      }
      // console.log(routes, '来了')
      return startRoutes.map(renderSubMenu)
    }
    const MenuTitleProps = {
      ...User.getUserInfo(),
      collapsed,
      toggleCollapsed: collapsed => {
        this.setState({
          collapsed,
        })
      },
      loginout: User.logout,
    }
    return (
      <div className="App">
        {this.state.show ? (
          <BrowserRouter>
            <Layout className="layout">
              <div className="logo" />
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                  defaultSelectedKeys={[pathName]}
                  defaultOpenKeys={defaultKeys}
                  className="menu"
                  mode="inline"
                  theme="dark"
                >
                  {renderMenu(routeList)}
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                  <MenuTitle {...MenuTitleProps} />
                </Header>
              </Layout>
            </Layout>
            <Layout
              className="site-layout"
              style={{ paddingLeft: 200, height: '100vh', width: '100vw', overflow: 'scroll' }}
            >
              <Content>
                <Switch>{renderRoute(routeList)}</Switch>
              </Content>
            </Layout>
          </BrowserRouter>
        ) : null}
      </div>
    )
  }
}
