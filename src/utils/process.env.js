const { APP_ENV } = process.env
// 请求后台接口IP端口
let api = ''
if (APP_ENV === 'development') {
  // 开发
  api = 'http://newdreamer.mynatapp.cc/' //https://test.newdreamer.cn/http://newdreamer.mynatapp.cc/
} else {
  // 生产
  api = 'http://newdreamer.mynatapp.cc/' //,https://www.hznewdreamer.cn/
}
export default {
  target: api,
}
