export default [{
    path: '/order',
    name: '订单管理',
    children: [{
        path: '/voucher/info',
        name: '单据信息',
        component: require('../pages/order/voucher').default
    },{
        path: '/voucher/refund',
        name: '退款管理',
        component: require('../pages/order/refund').default
    },{
        path: '/voucher/evaluate',
        name: '评价管理',
        component: require('../pages/order/evaluate').default
    }]
}]