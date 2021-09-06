import { pathToRegexp } from 'path-to-regexp'
import { homePage } from '@utils/contants'
import { JKUtil } from './util'
import { unionBy } from 'lodash'
import routes from '@/routers'

// 处理菜单树 openkey
export class dealMenuTree {
  constructor(data) {
    this.data = data || []
    this.openkeys = {
      all: [],
      none: [],
      first: [],
    }
    this.menuNamePath = {}
    this.dealData = this.dealData.bind(this)
    this.dealData(data, 'root', '')
  }
  // 递归数据
  dealData(ary, key, nameList, keys) {
    const t = this
    ary.forEach((item, index) => {
      let nl = [...(nameList || [])]
      if (item.title)
        nl.push({
          path: item.path,
          title: item.title,
        })
      /*获取所有path对应的层级的中文面包屑导航*/
      if (item.path) {
        this.menuNamePath[item.path] = nl
      }
      /*获取所有openKeys*/
      let OKS = [...(keys || [])]
      OKS.push(item.path)
      this.openkeys[item.path] = OKS
      if (item.routes && Array.isArray(item.routes)) {
        item.children = item.routes
        this.openkeys.all.push(item.path)
        if ((key == 'root' || /^root0[0]*?$/.test(key)) && index == 0) {
          this.openkeys.first.push(item.path)
        }
        return t.dealData(item.routes, `${key}${index}`, nl, OKS)
      }
    })
  }
  getOpenkeys(key) {
    if (key) {
      return this.openkeys[key]
    }
    return []
  }
  getPageInfo(key) {
    if (key) {
      return {
        id: key,
        namePath: unionBy(this.menuNamePath[key], 'title'),
      }
    }
    return {}
  }
}
/**
 * 易推系统默认菜单
 *@menuData 原始routes树结构，route因为没有嵌套需求，所以仍然按照平级列表渲染，但是RouterContainer支持嵌套，只需要在父节点component组件上return这个方法即可
 *@AuthPathList 表示当前项目所有需要登陆权限的【pathname和权限】列表，用于匹配菜单栏选中、面包屑等操作
 *@menuPathMap 表示是否该路径已匹配（后需与后台返回权限对于的菜单列表进行对比）
 */

export const menu = {
  menuData: routes, //树结构的菜单
  AuthPathList: JKUtil.flatten(routes)
    .filter(item => !item.noLogin)
    .map(item => ({ path: pathToRegexp(item.path), author: item.author, pathname: item.path })),
  menuPathMap: JKUtil.flatten(routes).map(item => item.path), //用于和后台返回列表匹配，后将改为接口获取
  menuExpandType: 'first',
  firstPage: homePage,
}
