export default [{
    path: '/measure',
    name: '量体师',
    children: [{
        path: '/managment',
        name: '人员管理',
        component: require('../pages/measure/managment').default
    },{
        path: '/appoint',
        name: '预约查询',
        component: require('../pages/measure/appoint').default
    },{
        path: '/bonus',
        name: '奖励金查询',
        component: require('../pages/measure/bonus').default
    },{
        path: '/bonusSetting',
        name: '奖励金设置',
        component: require('../pages/measure/bonusSetting').default
    }]
}]