export default [{
    path: '/coupon',
    name: '优惠券',
    children: [{
        path: '/couponSetting',
        name: '优惠券设置',
        component: require('../pages/coupon/setting/index').default
    }]
}]
