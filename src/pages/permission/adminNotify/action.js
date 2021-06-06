import request from '../../../assets/js/request';
export function queryAllRole(data) {
  return request({
      method: 'get',
      url: '/newdreamer/role/queryAllRole',
      params: data
  })
}
// 查询所有权限 树结构
export function queryAll(data) {
    return request({
        method: 'get',
        url: '/newdreamer/adminNotify/queryAll',
        params: data
    })
}
// 查询所有用户信息
export function queryAllUser(data) {
    return request({
        method: 'get',
        url: '/newdreamer/user/queryAll',
        params: data
    })
}


// 创建
export function createAdminNotify(data) {
    return request({
        method: 'post',
        url: '/newdreamer/adminNotify/create',
        params: data,
        version: 2
    })
}
// 修改
export function updateAdminNotify(data) {
    return request({
        method: 'post',
        url: '/newdreamer/adminNotify/update',
        params: data,
        version: 2
    })
}
export function deleteRole(data) {
  return request({
    method: 'delete',
    url: '/newdreamer/adminNotify/delete',
    params: data,
    version: 2
  })
}

