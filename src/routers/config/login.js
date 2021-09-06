export default [
  {
    title: '用户登录',
    exact: true,
    path: '/login',
    needLogin: false,
    hide: true,
    component: () => import('@/pages/login'),
  },
]
