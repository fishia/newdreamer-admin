import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import themeStyles from '../theme.less'
import { Menu } from 'antd'
import { Link } from 'dva/router'
import _isEqual from 'lodash/isEqual'
import _every from 'lodash/every'
import User from '@utils/user'
import menulogo from '@assets/images/menulogo.png'
import ico from '@assets/images/logo.png'
const SubMenu = Menu.SubMenu

class MenuLeft extends React.Component {
  constructor(props) {
    super(props)
    this.menuTop = null
    this.openKeys = []
    this.menuNamePath = {}
    this.pageUri = {}
    this.state = {
      collapsed: props.collapsed,
      selectedKeys: props.defaultkey,
      openKeys:
        props.openKeys && props.openKeys.length
          ? props.openKeys
          : sessionStorage.getItem('menuopenkeys')
          ? sessionStorage.getItem('menuopenkeys').split(',')
          : [],
      menuList: props.menuList,
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed != this.props.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed,
      })
    }
    if (!_isEqual(this.openKeys, this.state.openKeys)) {
      this.setState({
        openKeys: this.openKeys,
      })
    }
    if (!_isEqual(this.props.openKeys, nextProps.openKeys)) {
      this.setState({
        openKeys: nextProps.openKeys || [],
      })
    }
    if (!_isEqual(this.props.defaultkey, nextProps.defaultkey)) {
      this.setState({
        selectedKeys: nextProps.defaultkey || [],
      })
    }
  }
  isIE() {
    //ie?
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return true
    } else {
      return false
    }
  }
  componentDidMount() {
    let t = this,
      { permissions } = User.getUserInfo()
    if (permissions)
      t.setState({
        menuList: t.routeContrast(
          [...t.state.menuList],
          permissions.map(o => o.remark)
        ),
      })
  }
  // 所有路由 和 当前登录权限对比
  routeContrast(data, permissionsObj) {
    return data.map(item => {
      return {
        ...item,
        show: item.show ? item.show : permissionsObj.indexOf(item.title) > -1,
        children: item.children ? this.routeContrast(item.children, permissionsObj) : null,
      }
    })
  }
  renderMenu(ary) {
    let t = this,
      { role } = User.getUserInfo()
    return (ary || []).map(item => {
      if (item.path === '/') {
        return t.renderMenu(item.children)
      } else if (
        item.show &&
        item.children &&
        item.children.length > 0 &&
        !_every(item.children, { show: false })
      ) {
        /*
          过滤菜单栏如果包含二级导航且子项不应该出现在菜单栏中需要隐藏，所以需要过滤childen是否有隐藏
       */
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                {item.icon ? item.icon : null}
                <span>{item.title}</span>
              </span>
            }
          >
            {t.renderMenu(item.children)}
          </SubMenu>
        )
      }
      if ((item.show && !item.hide && !item.children) || item.author?.indexOf(role.id) > -1) {
        t.pageUri[item.path] = { ...item }
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              {item.icon ? item.icon : null}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }
  render() {
    let { collapsed, openKeys, selectedKeys, menuList } = this.state
    if (openKeys.length > 0) {
      this.openKeys = [...openKeys]
    }
    let menuOpenkey = {
      openKeys: collapsed ? [] : this.openKeys,
    }
    console.log(menuList)
    return (
      <div>
        <div
          className={`${themeStyles.normal_omit} ${
            collapsed ? styles.menuWidth : styles.expandMenuWidth
          }`}
        >
          <div
            className={`${themeStyles.menuTitle} ${
              collapsed ? themeStyles.enter : themeStyles.leave
            }`}
          >
            <div className={styles.systemTitle}>
              <img src={collapsed ? ico : menulogo} />
            </div>
          </div>
          <div
            className={`${themeStyles.menuContent} ${collapsed ? themeStyles.adjust : ''}`}
            style={{ overflowX: collapsed ? 'hidden' : 'auto' }}
            ref={menu => (this.menuTop = menu)}
          >
            <Menu
              mode="inline"
              inlineIndent={12}
              theme={'dark'}
              selectedKeys={selectedKeys}
              {...menuOpenkey}
              inlineCollapsed={collapsed}
              onOpenChange={openKeys => {
                //缓存菜单打开情况
                sessionStorage.setItem('menuopenkeys', openKeys.join(','))
                if (!openKeys.length) {
                  this.openKeys = []
                }
                this.setState({
                  openKeys,
                })
              }}
              onClick={obj => {
                this.setState({
                  selectedKeys: [obj.key],
                })
              }}
            >
              {this.renderMenu(menuList)}
            </Menu>
          </div>
        </div>
        <div
          className={`${styles.shade} ${collapsed || !this.props.collapsed ? styles.hidden : ''}`}
        ></div>
      </div>
    )
  }
}

MenuLeft.propTypes = {
  menuList: PropTypes.array.isRequired,
}

export default MenuLeft
