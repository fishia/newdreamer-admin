import u from 'updeep'
import { findIndex, some, map } from 'lodash'
import { menu, dealMenuTree } from '@utils/menuConfig'
import { userRemote } from '@services/baseRemote'
import User from '@utils/user'
const { menuData, AuthPathList, firstPage } = menu
const oks = new dealMenuTree(menuData)

const STATE = {
  collapsed: false, //左侧菜单是否收起
  noMatch: false, //是否不匹配
  isForbidden: false, //是否是禁止访问页面
  menuList: oks.data, //菜单
  openKeys: [], // 默认展开的子菜单
  defaultkey: [], // 默认选中的菜单
  // 开始------------单标签参数----------------
  pageInfo: {}, //当前页面信息
}

export default {
  namespace: 'layout',

  state: u(STATE, null),

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const { permissions = [], role } = User.getUserInfo()
        /*监听除了菜单栏包含的路由变化，改变菜单栏默认打开的openKeys和选中key以及面包屑的显示*/
        if (pathname && some(AuthPathList, item => item.path.exec(pathname))) {
          /* 
            @frontRoute:前端定义（非后端返回）的菜单路由列表匹配的路由
            @beenAuthor:表示该路由下前端定义（非后端返回）的角色权限列表是否包含当前登录人的角色,如果author为[*]则表示所有角色都有权限
            @curRoute:表示当前能匹配到规则的路由
          */
          let frontRoute = AuthPathList[findIndex(AuthPathList, item => item.path.exec(pathname))],
            beenAutor = frontRoute.author
              ? frontRoute.author.indexOf('*') > -1
                ? true
                : frontRoute.author.indexOf(role) > -1
              : false,
            curRoute = frontRoute.pathname
          dispatch({
            type: 'updateState',
            payload: {
              openKeys: oks.getOpenkeys(curRoute), // 默认展开的子菜单
              pageInfo: oks.getPageInfo(curRoute), //当前页面信息
              noMatch: false,
              isForbidden: false,
              defaultkey: pathname, // 默认选中的菜单
            },
          })
        } else {
          /* 不为redirect页面，就显示404*/
          dispatch({
            type: 'updateState',
            payload: {
              noMatch: pathname !== '/',
            },
          })
        }
      })
    },
  },

  effects: {
    //获取后台匹配该登录者的权限路由列表
    *menuInit({ payload }, { select, put, call }) {
      //获取后台匹配该登录者的权限路由列表,如果有缓存直接取缓存
      if (!User.getUserInfo().permissions) {
        const { data, status } = yield call(userRemote.getMenus)
        if (status) {
          User.login({ token: true, ...data }) //存储,permission：按钮权限
        }
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return u(action.payload, state)
    },
    resetState(state, action) {
      return u(STATE, null)
    },
  },
}
