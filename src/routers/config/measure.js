import {
  UserOutlined,
  TransactionOutlined,
  FileSearchOutlined,
  ReconciliationOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import RouterContainer from '../components/RouterContainer'
export default [
  {
    path: '/measure/managment',
    title: '着装顾问',
    exact: true,
    icon: <UserOutlined />,
    component: () => import('@/pages/measure/managment'),
  },
  {
    path: '/measure/collegeInfo',
    title: '高校管理',
    exact: true,
    icon: <ReconciliationOutlined />,
    component: () => import('@/pages/measure/collegeInfo'),
  },
  {
    path: '/measure/commission',
    title: '顾问提成',
    icon: <TransactionOutlined />,
    component: () => RouterContainer,
    routes: [
      {
        path: '/measure/Commission',
        exact: true,
        redirect: '/measure/commission/bonusSetting',
        hide: true,
      },
      {
        path: '/measure/commission/bonusSearch',
        title: '提成查询',
        exact: true,
        icon: <FileSearchOutlined />,
        component: () => import('@/pages/measure/bonus'),
      },
      {
        path: '/measure/commission/bonusSetting',
        title: '提成设置',
        exact: true,
        icon: <SettingOutlined />,
        component: () => import('@/pages/measure/bonusSetting'),
      },
    ],
  },
]
