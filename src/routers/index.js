import {
  ShopOutlined,
  ShoppingCartOutlined,
  PayCircleOutlined,
  TeamOutlined,
  ShoppingOutlined,
  ClusterOutlined,
  RedEnvelopeOutlined,
  SettingOutlined,
  IdcardOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import RouterContainer from './components/RouterContainer'
import LoginLayout from '@/layouts/loginLayout' //登录壳子
import loginRoutes from './config/login'
import shopRoutes from './config/shop'
import bonusRoutes from './config/bonus'
import customerRoutes from './config/customer'
import distributionRoutes from './config/distribution'
import measureRoutes from './config/measure'
import orderRoutes from './config/order'
import productRoutes from './config/product'
import couponRoutes from './config/coupon'
import orderManageRoutes from './config/orderManage'
import permissionRoutes from './config/permission'

//TODO:后期需要把show状态去掉，直接和后台返回permissions字段做遍历
export default [
  {
    title: '用户登录',
    path: '/login',
    needLogin: false,
    hide: true,
    component: () => LoginLayout,
    routes: loginRoutes,
  },
  {
    path: '/',
    component: () => import('@/layouts/mainLayout'),
    routes: [
      {
        path: '/',
        exact: true,
        redirect: '/nd/home',
      },
      {
        title: 'New Dreamer',
        path: '/homePage',
        component: () => import('@/pages/homePage'),
      },
      {
        title: '线上店铺',
        icon: <ShopOutlined />,
        path: '/nd',
        routes: shopRoutes,
        show: true,
        component: () => RouterContainer,
      },
      {
        title: '订单管理',
        icon: <ShoppingCartOutlined />,
        path: '/voucher',
        routes: orderRoutes,
        show: true,
        component: () => RouterContainer,
      },
      // {
      //   title: '售后查询',
      //   icon: <LineChartOutlined />,
      //   path: '/shop',
      //   routes: shopRoutes,
      //   hide: true,
      //   component: () => RouterContainer,
      // },
      {
        title: '商品管理',
        icon: <ShoppingOutlined />,
        path: '/product',
        routes: productRoutes,
        show: true,
        component: () => RouterContainer,
      },
      {
        title: '人员管理',
        icon: <TeamOutlined />,
        path: '/measure',
        routes: measureRoutes,
        show: true,
        component: () => RouterContainer,
      },
      {
        title: '客户管理',
        icon: <IdcardOutlined />,
        path: '/customer',
        routes: customerRoutes,
        show: true,
        component: () => RouterContainer,
      },
      {
        title: '制单生产',
        icon: <SyncOutlined />,
        path: '/orderManage',
        routes: orderManageRoutes('orderManage'),
        component: () => RouterContainer,
      },
      {
        title: '供应商界面',
        icon: <SyncOutlined />,
        path: '/suppilerOrderManage',
        routes: orderManageRoutes('suppilerOrderManage'),
        component: () => RouterContainer,
      },
      {
        title: '优惠券',
        icon: <RedEnvelopeOutlined />,
        path: '/coupon',
        routes: couponRoutes,
        show: true,
        component: () => RouterContainer,
      },
      {
        title: '分销管理',
        icon: <ClusterOutlined />,
        path: '/distribution',
        routes: distributionRoutes,
        component: () => RouterContainer,
      },
      {
        title: '奖励发放',
        icon: <PayCircleOutlined />,
        path: '/bonus',
        routes: bonusRoutes,
        show: true,
        component: () => RouterContainer,
      },
      {
        title: '权限管理',
        icon: <SettingOutlined />,
        path: '/permission',
        routes: permissionRoutes,
        show: true,
        component: () => RouterContainer,
      },
    ],
  },
]
