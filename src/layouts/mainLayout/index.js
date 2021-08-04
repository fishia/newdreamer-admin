import React from 'react'
import RouterComponent from '@/utils/routerComponent'
import { connect } from 'dva'
import classNames from 'classnames'
import { theme } from '@utils/contants'
import styles from './index.less'
import themeStyles from './theme.less'
import MenuLeft from './menuLeft' /*菜单左侧栏*/
import MenuTitle from './menuTitle' /*菜单顶部*/
import CrumbsBar from './crumbsBar'
import layoutWrapper from './layoutWrapper'
import RouterContainer from '@routers/components/RouterContainer'
import User from '@utils/user'

export default layoutWrapper()(
  connect(({ layout, loading }) => ({ layout, loading: loading.effects }))(
    class Layouts extends RouterComponent {
      constructor(props) {
        super(props)
        this.namespace = 'layout'
      }
      componentDidMount() {
        document.body.className = themeStyles[theme || 'themeA']
      }
      // 生成公共组件的参数对象
      getComponentProps = () => {
        const { layout, history } = this.props
        const { menuList, defaultkey, openKeys, collapsed } = layout
        //菜单栏
        const MenuLeftProps = {
          menuList,
          title: '梦想家',
          defaultkey,
          openKeys,
          collapsed,
        }
        //面包屑
        const TabBarProps = {
          crumbs: this.getCurrentPageInfo().namePath || [],
          linkToPage: path => {
            history.push(path)
          },
        }
        //右上角功能栏
        const MenuTitleProps = {
          ...User.getUserInfo(),
          collapsed: layout.collapsed,
          toggleCollapsed: collapsed => {
            this.updateState({
              collapsed,
            })
          },
          loginout: this.logout,
        }
        return { MenuLeftProps, TabBarProps, MenuTitleProps }
      }
      // 获取当前打开页面信息
      getCurrentPageInfo = () => {
        const { layout } = this.props
        return layout.pageInfo || {}
      }
      // 登出
      logout = () => {
        User.logout()
      }
      render() {
        const { layout, route } = this.props
        const { MenuLeftProps, TabBarProps, MenuTitleProps } = this.getComponentProps()
        return (
          <div className={classNames(styles.normal)}>
            <MenuLeft {...MenuLeftProps} />
            <div className={classNames(styles.head, { [styles.expand]: !layout.collapsed })}>
              <MenuTitle {...MenuTitleProps} />
            </div>
            <div className={classNames(styles.tabPane, { [styles.expand]: !layout.collapsed })}>
              <CrumbsBar {...TabBarProps} />
              <div
                className={classNames(
                  styles.paneWithCrumbBar,
                  { [styles.full_window]: layout.fullWindow },
                  'page-main-content'
                )}
                id="iframeContainer"
              >
                <div className={styles.contentWrapper}>
                  <div className={styles.content}>
                    <RouterContainer route={route} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  )
)
