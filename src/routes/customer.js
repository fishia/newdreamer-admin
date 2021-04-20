export default [{
    path: '/customer',
    name: '客户管理',
    children: [{
        path: '/managment',
        name: '基本信息',
        component: require('../pages/customer/managment').default
    },{
        path: '/volume',
        name: '量体数据',
        component: require('../pages/customer/volume').default
    }]
}]