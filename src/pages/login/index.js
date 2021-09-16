import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, message } from 'antd'
import { homePage } from '@utils/contants'
import { requestLogin } from '@/api/login'
import { JKUtil } from '@utils/util'
import pwd from '@assets/images/pwd.png' //密码
import user from '@assets/images/user.png' //用户
import styles from './index.less'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    const {
      history: { push },
      dispatch,
    } = this.props
    const onFinish = async values => {
      this.setState({ loading: true })
      requestLogin(values).then(res => {
        this.setState({ loading: false })
        if (res.code === 200) {
          message.success('登录成功')
          //获取后台匹配该登录者的权限路由列表,如果有缓存直接取缓存
          Promise.all([
            dispatch({
              type: 'layout/menuInit',
            }),
          ]).then(res => {
            if (JKUtil.getUrlParam('redirectUrl')) push(JKUtil.getUrlParam('redirectUrl'))
            // res[0].roleName === '供应商'
            //   ? push('/suppilerOrderManage/customized')
            //   : res[0].roleName === '超级管理员'
            //   ? push(homePage)
            //   : push('/homePage')
            else push('/homePage')
          })
        } else {
          message.warning(res.msg)
        }
      })
    }
    return (
      <div className={styles.formWrapper}>
        <Form
          className={styles.panel}
          initialValues={{ remember: true }}
          name="control-login"
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<img src={user} alt="用户" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<img src={pwd} alt="用户" />} type="password" placeholder="请输入密码" />
          </Form.Item>
          {/* <Form.Item
            {...{
              wrapperCol: { span: 6, offset: 18 },
            }}
          >
            <span
              className={styles.forget}
              onClick={() => {
                push('/login/findPassword')
              }}
            >
              忘记密码
            </span>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default connect(({ layout }) => ({ layout }))(Login)
