export default [{
    path: '/bonus',
    name: '奖励发放',
    children: [{
        path: '/measure',
        name: '量体师奖励',
        children: [{
            path: '/withdraw',
            name: '提现申请',
            component: require('../pages/bonus/measure/withdraw').default
        },{
            path: '/balance',
            name: '余额查询',
            component: require('../pages/bonus/measure/balance').default
        }
        // ,{
        //     path: '/withdrawDetail',
        //     name: '提现明细',
        //     component: require('../pages/bonus/measure/withdrawDetail').default
        // }
    ]
    }, {
        path: '/distribution',
            name: '分销奖励',
            children: [{
                path: '/withdraw',
                name: '提现申请',
                component: require('../pages/bonus/distribution/withdraw').default
            },{
                path: '/balance',
                name: '余额查询',
                component: require('../pages/bonus/distribution/balance').default
            }
            // ,{
            //     path: '/withdrawDetail',
            //     name: '提现明细',
            //     component: require('../pages/bonus/distribution/withdrawDetail').default
            // }
        ]
    },{
        path: '/setting',
            name: '提现金额设置',
            component: require('../pages/bonus/setting').default
    }]
}]