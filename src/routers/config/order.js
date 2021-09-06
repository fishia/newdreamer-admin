import { SettingOutlined, HeartOutlined, BarsOutlined } from '@ant-design/icons'
export default [
  {
    path: '/voucher/info',
    title: '预约量体',
    exact: true,
    icon: <SettingOutlined />,
    component: () => import('@/pages/measure/appoint'),
  },
  {
    path: '/voucher/orderinfo',
    title: '订单信息',
    exact: true,
    icon: <HeartOutlined />,
    component: () => import('@/pages/order/voucher'),
  },
  {
    path: '/voucher/refund',
    title: '退款管理',
    exact: true,
    icon: <BarsOutlined />,
    component: () => import('@/pages/order/refund'),
  },
  {
    path: '/voucher/evaluate',
    title: '评价管理',
    exact: true,
    icon: <BarsOutlined />,
    component: () => import('@/pages/order/evaluate'),
  },
]
