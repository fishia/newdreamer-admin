export default [{
    path: '/permission',
    name: '权限管理',
    children: [{
        path: '/account',
        name: '账号管理',
        component: require('../pages/permission/account').default
    },{
        path: '/role',
        name: '角色管理',
        component: require('../pages/permission/role').default
    },{
        path: '/adminNotify',
        name: '弹窗提醒',
        component: require('../pages/permission/adminNotify').default
    }]
}]
