export default [{
    path: '/distribution',
    name: '分销设置',
    children: [{
        path: '/detail',
        name: '分销明细',
        component: require('../pages/distribution/detail').default
    },{
        path: '/setting',
        name: '分销金设置',
        component: require('../pages/distribution/setting').default
    }]
}]