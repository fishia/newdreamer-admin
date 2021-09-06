import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { Router, Switch } from 'dva/router'
import { ClientErrorFallback } from '@/components/exception'
import errorBoundary from './utils/hoc/error-boundary'
import renderRoutes from './routers/utils/renderRoutes'
import routes from './routers'

const ErrorBoundary = errorBoundary(() => <ClientErrorFallback />)

function RouterConfig({ app, history }) {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <Router history={history}>
          <Switch>{renderRoutes(routes)}</Switch>
        </Router>
      </ConfigProvider>
    </ErrorBoundary>
  )
}

export default RouterConfig
