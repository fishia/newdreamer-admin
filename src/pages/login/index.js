import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './index.less'
import { requestLogin } from '../../api/login';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){

    }
    componentWillUnmount() {

    }
    render(){
        const onFinish = (values) => {
            console.log('Success:', values);
            requestLogin(values).then(res => {
                // console.log(res)
                if (res.code === 200) {
                    this.props.history.push('/');
                }
            })

        };
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        const tailLayout = {
            wrapperCol: { offset: 10, span: 16 },
        };
        return (
            <div className="login">
                <div className="login-box">
                    <h2>登录</h2>
                    <Form name="basic" {...layout} initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
