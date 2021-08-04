import dva from 'dva'
import './index.less'
import createLoading from 'dva-loading'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { createHashHistory } from 'history'
export const history = new createHashHistory()

// 1. Initialize
export const app = dva(createLoading())

// 2. Plugins
// app.use({});

// 3. Model
/*使用webpack api require.context遍历models所有js文件。三个参数：文件目录，是否遍历子目录，匹配规则*/
const requireModels = require.context('./models', true, /\.js$/)
requireModels.keys().forEach(filename => {
  app.model(requireModels(filename).default)
})
// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
