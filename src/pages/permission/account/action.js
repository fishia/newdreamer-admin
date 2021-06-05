import request from '../../../assets/js/request';
export function queryAll(data) {
  return request({
      method: 'get',
      url: '/newdreamer/user/queryAll',
      params: data
  })
}
// 查询所有角色
export function queryAllRole(data) {
    return request({
        method: 'get',
        url: '/newdreamer/role/queryAllRole',
        params: data
    })
}
// 新增用户
export function registerUser(data) {
    return request({
        method: 'post',
        url: '/newdreamer/user/registerUser',
        params: data,
        version: 2
    })
}
// 修改用户
export function updateUser(data) {
    return request({
        method: 'post',
        url: '/newdreamer/user/updateUser',
        params: data,
        version: 2
    })
}
// 删除用户
export function deleteUser(data) {
  return request({
    method: 'delete',
    url: '/newdreamer/user/deleteUser',
    params: data,
    version: 2
  })
}

