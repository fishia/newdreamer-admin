import { UserAddOutlined, SolutionOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons'
import RouterContainer from '../components/RouterContainer'
export default [
  {
    path: '/distribution/personal',
    title: '个人分销',
    show: true,
    icon: <UserAddOutlined />,
    component: () => RouterContainer,
    routes: [
      {
        path: '/distribution/personal',
        exact: true,
        redirect: '/distribution/personal/setting',
        hide: true,
      },
      {
        path: '/distribution/personal/detail',
        title: '分销明细',
        exact: true,
        show: true,
        icon: <SolutionOutlined />,
        component: () => import('@/pages/distribution/detail'),
      },
      {
        path: '/distribution/personal/setting',
        title: '分销金设置',
        exact: true,
        show: true,
        icon: <SettingOutlined />,
        component: () => import('@/pages/distribution/setting'),
      },
    ],
  },
  {
    path: '/distribution/team/detail',
    title: '团队分销',
    exact: true,
    show: true,
    icon: <TeamOutlined />,
    component: () => import('@/pages/distributor/manager'),
  },
]
