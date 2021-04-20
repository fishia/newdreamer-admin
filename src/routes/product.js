export default [{
    path: '/product',
    name: '商品详情',
    children: [{
        path: '/manager',
        name: '商品管理',
        component: require('../pages/product/manager').default
    },
    {
        path: '/fabric',
        name: '面料管理',
        component: require('../pages/product/fabric').default
    }
]
}]