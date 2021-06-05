import request from '../../../assets/js/request';
export function queryAllRole(data) {
  return request({
      method: 'get',
      url: '/newdreamer/role/queryAllRole',
      params: data
  })
}
// 查询所有权限 树结构
export function queryAllTree(data) {
    return request({
        method: 'get',
        url: '/newdreamer/permission/queryAllTree',
        params: data
    })
}
// 创建角色
export function createRole(data) {
    return request({
        method: 'post',
        url: '/newdreamer/role/createRole',
        params: data,
        version: 2
    })
}
// 创建角色
export function updateRole(data) {
    return request({
        method: 'post',
        url: '/newdreamer/role/updateRole',
        params: data,
        version: 2
    })
}
// 根据id查询角色权限
export function queryPermissionByRoleId(data) {
    return request({
        method: 'get',
        url: '/newdreamer/role/queryPermissionByRoleId',
        params: data
    })
}

export function deleteRole(data) {
  return request({
    method: 'delete',
    url: '/newdreamer/role/deleteRole',
    params: data,
    version: 2
  })
}

