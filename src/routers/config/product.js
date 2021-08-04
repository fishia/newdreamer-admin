import { GiftOutlined, SolutionOutlined, SkinOutlined } from '@ant-design/icons'
import RouterContainer from '../components/RouterContainer'
export default [
  {
    path: '/product/stroage',
    title: '商品库管理',
    show: true,
    icon: <GiftOutlined />,
    component: () => RouterContainer,
    routes: [
      {
        path: '/product/stroage',
        exact: true,
        redirect: '/product/stroage/goods',
        hide: true,
      },
      {
        path: '/product/stroage/goods',
        title: '单品管理',
        exact: true,
        show: true,
        icon: <SolutionOutlined />,
        component: () => import('@/pages/product/goods'),
      },
      {
        path: '/product/stroage/fabric',
        title: '面料管理',
        exact: true,
        show: true,
        icon: <SolutionOutlined />,
        component: () => import('@/pages/product/fabric'),
      },
      {
        path: '/product/stroage/style',
        title: '款式管理',
        exact: true,
        show: true,
        icon: <SkinOutlined />,
        component: () => import('@/pages/product/style'),
      },
    ],
  },
  {
    path: '/product/supplier',
    title: '供应商入库',
    exact: true,
    show: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/product/supplier'),
  },
]
