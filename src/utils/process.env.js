const { NODE_ENV } = process.env
// 请求后台接口IP端口
let api = ''
if (NODE_ENV === 'development') {
  // 开发
  api = 'https://www.hznewdreamer.cn/' //https://test.newdreamer.cn/http://newdreamer.mynatapp.cc/
} else {
  // 生产
  api = 'https://www.hznewdreamer.cn/'
}
export default {
  target: api,
}
