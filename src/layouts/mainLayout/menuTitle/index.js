import React from 'react'
import styles from './index.less'
import themeStyles from '../theme.less'
import { Menu, Dropdown } from 'antd'
import classNames from 'classnames'
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
} from '@ant-design/icons'

class MenuTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  render() {
    const { loginout, username, avatar, collapsed, hideCollapse } = this.props
    const userOp = (
      <Menu
        onClick={({ key }) => {
          switch (key) {
            case 'changepassword':
              this.setState({ visible: true })
              break
          }
        }}
      >
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => loginout()}>
          退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <div id="menu_head" className={classNames(styles.normal, themeStyles.head_text)}>
        <div
          className={styles.collapseIcon}
          onClick={
            hideCollapse
              ? () => {
                  return
                }
              : () => this.props.toggleCollapsed(!collapsed)
          }
        >
          {hideCollapse ? null : collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className={styles.action}>
          <Dropdown overlay={userOp} trigger={['click']} placement="bottomRight">
            <div className={styles.element}>
              <img
                style={{ width: '24px', height: '24px', marginRight: '10px' }}
                src={avatar || require('@/assets/images/avatar.png')}
              />
              {username}&nbsp;&nbsp;
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default MenuTitle
