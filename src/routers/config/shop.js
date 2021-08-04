import { SettingOutlined, BarcodeOutlined, AlibabaOutlined } from '@ant-design/icons'
export default [
  {
    path: '/nd/home',
    title: '界面设置',
    exact: true,
    show: true,
    icon: <SettingOutlined />,
    component: () => import('@/pages/shop/home'),
  },
  {
    path: '/nd/order',
    title: '上线商品',
    exact: true,
    show: true,
    icon: <BarcodeOutlined />,
    component: () => import('@/pages/shop/order'),
  },
  {
    path: '/nd/activity',
    title: '运营活动',
    exact: true,
    show: false,
    icon: <AlibabaOutlined />,
    component: () => import('@/pages/shop/home'),
  },
]
