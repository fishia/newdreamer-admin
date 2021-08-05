import {
  StrikethroughOutlined,
  BarsOutlined,
  SettingOutlined,
  AccountBookOutlined,
} from '@ant-design/icons'
import RouterContainer from '../components/RouterContainer'
export default [
  {
    path: '/bonus/measure',
    title: '着装顾问奖励提现',
    icon: <StrikethroughOutlined />,
    component: () => RouterContainer,
    routes: [
      {
        path: '/bonus/measure',
        exact: true,
        redirect: '/bonus/measure/withdraw',
        hide: true,
      },
      {
        path: '/bonus/measure/withdraw',
        title: '提现申请',
        exact: true,
        icon: <BarsOutlined />,
        show: true,
        component: () => import('@/pages/bonus/measure/withdraw'),
      },
      {
        path: '/bonus/measure/balance',
        title: '余额查询',
        exact: true,
        show: true,
        icon: <AccountBookOutlined />,
        component: () => import('@/pages/bonus/measure/balance'),
      },
      // ,{
      //     path: '/withdrawDetail',
      //     title:'提现明细',
      //     component: () => import('@/pages/bonus/measure/withdrawDetail')
      // }
    ],
  },
  {
    path: '/bonus/distribution',
    title: '分销奖励提现',
    icon: <StrikethroughOutlined />,
    component: () => RouterContainer,
    routes: [
      {
        path: '/bonus/distribution',
        exact: true,
        redirect: '/bonus/distribution/withdraw',
        hide: true,
      },
      {
        path: '/bonus/distribution/withdraw',
        title: '提现申请',
        exact: true,
        show: true,
        icon: <BarsOutlined />,
        component: () => import('@/pages/bonus/distribution/withdraw'),
      },
      {
        path: '/bonus/distribution/balance',
        title: '余额查询',
        exact: true,
        show: true,
        icon: <AccountBookOutlined />,
        component: () => import('@/pages/bonus/distribution/balance'),
      },
    ],
  },
  {
    path: '/bonus/setting',
    title: '提现金额设置',
    exact: true,
    icon: <SettingOutlined />,
    component: () => import('@/pages/bonus/setting'),
  },
]
