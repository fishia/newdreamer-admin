import { SolutionOutlined } from '@ant-design/icons'
export default [
  {
    path: '/coupon/couponSetting',
    title: '优惠券设置',
    exact: true,
    show: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/coupon/setting/index'),
  },
  {
    path: '/coupon/couponDetail',
    title: '优惠券明细',
    exact: true,
    show: true,
    icon: <SolutionOutlined />,
    component: () => import('@/pages/coupon/couponDetail/index'),
  },
]
