import { SolutionOutlined } from '@ant-design/icons'
export default [
  {
    path: '/customer/managment',
    title: '基本信息',
    exact: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/customer/managment/index'),
  },
  {
    path: '/customer/volume',
    title: '量体数据',
    exact: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/customer/volume'),
  },
]
