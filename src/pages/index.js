import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import Routes from '../routes';
import '../App.less';

const { Sider } = Layout;

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
    return startRoutes.map(renderSubMenu);
}

function App() {
    // console.log(defaultKeys);
    // if (defaultKeys.indexOf('/nd/user/login')>=0) {
    //     return <div className="App">
    //      <BrowserRouter >
    //         <Route path="/nd/user/login"><Login /> </Route>
    //     </BrowserRouter>
    //     </div>
    // }
    return (
        <div className="App">
            <BrowserRouter >
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

                </Sider>
            </Layout>
            <Layout className="site-layout" style={{ paddingLeft: 200, height: '100vh', width: '100vw', overflow:'scroll' }}>
                <Switch>
                    {renderRoute(Routes)}
                </Switch>
            </Layout>

            </BrowserRouter>
        </div>
    );
}

export default App;
