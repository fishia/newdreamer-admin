export default [{
    path: '/shop',
    name: '店铺设置111',
    children: [{
        path: '/home',
        name: '首页',
        component: require('../pages/shop/home').default
    }]
}]
