export default [{
    path: '/distributor',
    name: '团队分销',
    children: [{
        path: '/manager',
        name: '团队分销',
        component: require('../pages/distributor/manager').default
    }]
}]