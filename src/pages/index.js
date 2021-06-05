import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Button, message, Input, Table, Modal, Form, Select} from 'antd';
import Routes from '../routes';
import '../App.less';
import {getCurrentUser, requestLoginOut, queryAllTree} from '../api/login';

const { Sider } = Layout;

// let pathName = window.location.pathname;
// let defaultKeys = pathName.split('/').slice(1).reduce((result, item) => {
//     if (!result.length) {
//         result.push(`/${item}`);
//         return result;
//     }
//     let last = result[result.length - 1];
//     result.push(`${last}/${item}`);
//     return result;
// }, [])
// function renderRoute(routes, parent) {
//     return routes.map((route, index) => {
//         return <React.Fragment key={route.path + index}>
//         <Route
//             path={route.path}
//             render={props => {
//                 if (!route.component) {
//                     return null;
//                 }
//                 return <div style={{padding: '20px'}}>
//                     <Breadcrumb>
//                         {route.bread.map((item, itemIndex) => <Breadcrumb.Item key={itemIndex}>{item}</Breadcrumb.Item>)}
//                     </Breadcrumb>
//                     <route.component  {...props} />
//                 </div>
//             }}
//         >
//         </Route>
//         { route.children && renderRoute(route.children, route) }
//     </React.Fragment>
//     })
// }


// function renderMenu(routes) {
//     let startRoutes = routes[0].children;
//     let global = routes[0].path;
//     startRoutes = startRoutes.map(item => {
//         item.path=global + item.path;
//         return item;
//     })
//     const renderSubMenu = function(route, index) {
//         route.bread = route.bread || [route.name];
//         return <Menu.SubMenu key={route.path} title={<Link style={{color: '#fff'}} to={route.path}>{route.name}</Link>}>
//         {route.children && route.children.map((child, index2) =>  {
//             child.path =  route.path + child.path;
//             child.bread = [...route.bread || [], ...[child.name]]
//             if (!child.children) {
//                 return <Menu.Item key={child.path}>
//                 <Link to={child.path}>{child.name}</Link>
//             </Menu.Item>
//             }
//             return renderSubMenu(child, index2)
//         })}
//     </Menu.SubMenu>
//     }
//     console.log(Routes)
//     return startRoutes.map(renderSubMenu);
// }

// function App() {
//     // console.log(defaultKeys);
//     // if (defaultKeys.indexOf('/nd/user/login')>=0) {
//     //     return <div className="App">
//     //      <BrowserRouter >
//     //         <Route path="/nd/user/login"><Login /> </Route>
//     //     </BrowserRouter>
//     //     </div>
//     // }
//     let loginOut = () => {
//         requestLoginOut().then(res => {
//             if (res.code === 200) {
//                 // this.props.history.push('/login');
//                 message.success('退出登录');
//                 setTimeout(function () {
//                     window.location.href = window.location.origin + '/login';
//                 }, 1000)
//
//             }
//         })
//     };
//     return (
//         <div className="App">
//             <BrowserRouter >
//             <Layout >
//                 <Sider  style={{
//                     overflow: 'auto',
//                     height: '100vh',
//                     position: 'fixed',
//                     left: 0,
//                 }} >
//                     <Menu
//                         defaultSelectedKeys={[pathName]}
//                         defaultOpenKeys={defaultKeys}
//                         mode="inline"
//                         theme="dark"
//                         >
//                              {renderMenu(Routes)}
//                         </Menu>
//                     <div className="loginOut">
//                         <Button type="primary" size="small" onClick={loginOut}>退出登录</Button>
//                     </div>
//                 </Sider>
//             </Layout>
//             <Layout className="site-layout" style={{ paddingLeft: 200, height: '100vh', width: '100vw', overflow:'scroll' }}>
//                 <Switch>
//                     {renderRoute(Routes)}
//                 </Switch>
//             </Layout>
//
//             </BrowserRouter>
//         </div>
//     );
// }

// export default App;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            routeList: [...Routes]
        }
    }
    async componentDidMount() {
        await queryAllTree().then(res => {
            console.log(res, '所有权限')
        });
        console.log(123);
        await getCurrentUser().then(res => {
            if (res.code === 200) {
                console.log(res);
                console.log(this.state.routeList);
            }
        });
        this.setState({
            show: true
        })

    }
    loginOut = () => {
        requestLoginOut().then(res => {
            if (res.code === 200) {
                // this.props.history.push('/login');
                message.success('退出登录');
                setTimeout(function () {
                    window.location.href = window.location.origin + '/login';
                }, 1000)

            }
        })
    };
    render() {
        let pathName = window.location.pathname;
        let defaultKeys = pathName.split('/').slice(1).reduce((result, item) => {
            if (!result.length) {
                result.push(`/${item}`);
                return result;
            }
            let last = result[result.length - 1];
            result.push(`${last}/${item}`);
            return result;
        }, [])
        function renderRoute(routes, parent) {
            return routes.map((route, index) => {
                // console.log(route)
                return <React.Fragment key={route.path + index}>
                    <Route
                        path={route.path}
                        render={props => {
                            if (!route.component) {
                                return null;
                            }
                            return <div style={{padding: '20px'}}>
                                <Breadcrumb>
                                    {route.bread.map((item, itemIndex) => <Breadcrumb.Item key={itemIndex}>{item}</Breadcrumb.Item>)}
                                </Breadcrumb>
                                {/*-----挂载路由-----*/}
                                <route.component  {...props} />
                            </div>
                        }}
                    >
                    </Route>
                    { route.children && renderRoute(route.children, route) }
                </React.Fragment>
            })
        }
        function renderMenu(routes) {
            let startRoutes = routes[0].children;
            let global = routes[0].path;
            startRoutes = startRoutes.map(item => {
                item.path=global + item.path;
                return item;
            })
            const renderSubMenu = function(route, index) {
                route.bread = route.bread || [route.name];
                return <Menu.SubMenu key={route.path} title={<Link style={{color: '#fff'}} to={route.path}>{route.name}</Link>}>
                    {route.children && route.children.map((child, index2) =>  {
                        child.path =  route.path + child.path;
                        child.bread = [...route.bread || [], ...[child.name]]
                        if (!child.children) {
                            return <Menu.Item key={child.path}>
                                <Link to={child.path}>{child.name}</Link>
                            </Menu.Item>
                        }
                        return renderSubMenu(child, index2)
                    })}
                </Menu.SubMenu>
            }
            console.log(Routes)
            return startRoutes.map(renderSubMenu);
        }
        return (
            <div className="App">
                { this.state.show ?  <BrowserRouter >
                    <Layout >
                        <Sider  style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }} >
                            <Menu
                                defaultSelectedKeys={[pathName]}
                                defaultOpenKeys={defaultKeys}
                                mode="inline"
                                theme="dark"
                            >
                                {renderMenu(Routes)}
                            </Menu>
                            <div className="loginOut">
                                <Button type="primary" size="small" onClick={this.loginOut}>退出登录</Button>
                            </div>
                        </Sider>
                    </Layout>
                    <Layout className="site-layout" style={{ paddingLeft: 200, height: '100vh', width: '100vw', overflow:'scroll' }}>
                        <Switch>
                            {renderRoute(Routes)}
                        </Switch>
                    </Layout>

                </BrowserRouter> : null}

            </div>
        )

    }
}
