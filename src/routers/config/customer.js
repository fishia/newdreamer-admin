import { SolutionOutlined } from '@ant-design/icons'
export default [
  {
    path: '/customer/managment',
    title: '基本信息',
    exact: true,
    show: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/customer/managment'),
  },
  {
    path: '/customer/volume',
    title: '量体数据',
    exact: true,
    show: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/customer/volume'),
  },
]
