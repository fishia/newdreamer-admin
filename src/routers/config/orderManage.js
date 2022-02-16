import { SkinOutlined, ScissorOutlined } from '@ant-design/icons'
import RouterContainer from '../components/RouterContainer'

export default path => {
  let defaultRoutes = [
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
  if (path === 'suppilerOrderManage') {
    defaultRoutes.push({
      title: '返修管理',
      icon: <ScissorOutlined />,
      path: `/${path}/repair`,
      show: true,
      component: () => RouterContainer,
      routes: [
        {
          path: `/${path}/repair`,
          exact: true,
          redirect: `/${path}/repair/repairManage`,
          hide: true,
        },
        {
          path: `/${path}/repair/repairManage`,
          title: '返修记录',
          exact: true,
          show: true,
          icon: <ScissorOutlined />,
          component: () => import('@/pages/suppilerOrderManage/repairManage'),
        },
      ],
    })
  }

  return defaultRoutes
}
