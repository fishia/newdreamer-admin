import { SolutionOutlined, UserOutlined, ExpandOutlined } from '@ant-design/icons'
export default [
  {
    path: '/permission/account',
    title: '账号管理',
    exact: true,
    show: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/permission/account'),
  },
  {
    path: '/permission/role',
    title: '角色管理',
    exact: true,
    show: true,
    icon: <UserOutlined />,
    component: () => import('@/pages/permission/role'),
  },
  {
    path: '/permission/adminNotify',
    title: '弹窗提醒',
    exact: true,
    show: true,
    icon: <ExpandOutlined />,
    component: () => import('@/pages/permission/adminNotify'),
  },
]
