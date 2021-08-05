import { SkinOutlined, ScissorOutlined } from '@ant-design/icons'
export default path => [
  {
    title: '成衣商品',
    exact: true,
    path: `/${path}/normal`,
    icon: <SkinOutlined />,
    component: () => import(`@/pages/${path}/normal`),
  },
  {
    title: '量身定制',
    exact: true,
    path: `/${path}/customized`,
    icon: <ScissorOutlined />,
    component: () => import(`@/pages/${path}/customized`),
  },
  {
    title: '个性化定制',
    exact: true,
    path: `/${path}/personalCustomized`,
    icon: <ScissorOutlined />,
    component: () => import(`@/pages/${path}/personalCustomized`),
  },
]
