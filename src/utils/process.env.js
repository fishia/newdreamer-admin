const { APP_ENV } = process.env
// 请求后台接口IP端口
let api = ''
if (APP_ENV === 'development') {
  // 开发
  api = 'https://test.hznewdreamer.cn/' //https://test.hznewdreamer.cn/http://newdreamer.mynatapp.cc/
} else {
  // 生产
  api = 'https://www.hznewdreamer.cn/' //,https://www.hznewdreamer.cn/
}
export default {
  target: api,
}
