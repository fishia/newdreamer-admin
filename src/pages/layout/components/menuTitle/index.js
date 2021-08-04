import React from 'react'
import './index.less'
import { Menu, Dropdown } from 'antd'
import classNames from 'classnames'
import {
  LogoutOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
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
      <Menu>
        {/* <Menu.Item key="changepassword" icon={<FormOutlined />}>
          修改密码
        </Menu.Item> */}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => loginout()}>
          退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <div id="menu_head" className={classNames('normal')}>
        <div
          className="collapseIcon"
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
        <div className="action">
          <Dropdown overlay={userOp} trigger={['click']} placement="bottomRight">
            <div className="element">
              <img
                style={{ width: '24px', height: '24px', marginRight: '10px' }}
                src={avatar || require('@/console.info/avatar.png')}
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
