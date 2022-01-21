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
  {
    path: '/measure/taskManage',
    title: '任务发放',
    icon: <TransactionOutlined />,
    component: () => RouterContainer,
    show: true,
    routes: [
      {
        path: '/measure/taskManage',
        exact: true,
        redirect: '/measure/taskManage/',
        hide: true,
      },
      {
        path: '/measure/taskManage/publishTask',
        title: '发布任务',
        exact: true,
        icon: <FileSearchOutlined />,
        component: () => import('@/pages/measure/publishTask'),
        show: true,
      },
      {
        path: '/measure/taskManage/getTask',
        title: '领取任务',
        exact: true,
        icon: <SettingOutlined />,
        component: () => import('@/pages/measure/getTask'),
        show: true,
      },
    ],
  },
]
