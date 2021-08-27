import moment from 'moment'
import 'moment/locale/zh-cn'
import _, { isObject, cloneDeep, omit, pickBy } from 'lodash'
import { Input } from 'antd'
import { UnionSelect } from '@/components/custom/select'
import User from './user'
moment.locale('zh-cn')
/*
    时间util类
 */
export const JKTime = {
  /*
        获取时间
        time: 指定时间,  可以是任何类型的时间 
            默认:当前时间
        format: YYYY/MM/DD/HH/mm/ss
            类型: String
            默认: YYYY-MM-DD
        return: 返回匹配的时间字符串
     */
  getFormatTime: ({ time = new Date(), format = 'YYYY-MM-DD' } = {}) => {
    return moment(time).format(format)
  },
  /*
        时间加减
        time: 指定时间,  可以是任何类型的时间
            默认:当前时间
        format: YYYY/MM/DD/HH/mm/ss
            默认: YYYY-MM-DD
            类型: String
        type: 加/减   
            默认: add
            类型: String
            参数: add/subtract
        num: 正整数
            默认: 0
            类型: Number
        dateType: 加减的类型,如y代表加减几年, 参数: y/M/w/d/h/m/s/ms  默认d (String)
        return: 返回匹配的时间字符串
     */
  operationTime: ({
    time = new Date(),
    format = 'YYYY-MM-DD',
    type = 'add',
    num = 0,
    dateType = 'd',
  } = {}) => {
    num = JKNum.replaceInt(num)
    return moment(time, format)[type](num, dateType).format(format)
  },
  /*
        获取毫秒时间
        time: 需要转换的时间
            默认: 0
        return: 返回对应类型的时间
     */
  getMsTime: time => {
    if (time) {
      return new Date(time).getTime()
    } else {
      return new Date().getTime()
    }
  },
  //获取时间范围
  renderRangeDate: days => {
    return [
      moment()
        .add(-1, 'days')
        .subtract(days - 1, 'days')
        .format('YYYY-MM-DD'),
      moment().add(-1, 'days').format('YYYY-MM-DD'),
    ]
  },
  //禁止选未来时间
  isAfterDate: current => {
    return current && current.valueOf() > moment().subtract(1, 'd').valueOf()
  },
  //禁止选过去时间
  isPastDate: current => {
    return current && current.valueOf() < moment().subtract(1, 'd').valueOf()
  },
}
/*
    其他公共方法
 */
export const JKUtil = {
  /*
        获取url中 参数的值
        key: 参数前面的key
        return: 对应key的value
     */
  getUrlParam(key) {
    let paramObj = {}
    let matchList = window.location.href.match(/([^\?&]+)=([^&]+)/g) || []
    for (let i = 0, len = matchList.length; i < len; i++) {
      let r = matchList[i].match(/([^\?&]+)=([^&]+)/)
      paramObj[r[1]] = r[2]
    }
    if (key) {
      return paramObj[key]
    } else {
      return paramObj
    }
  },
  /*
        获取hash字符串
     */
  getHash() {
    let h = location.hash,
      xI = h.indexOf('/'),
      wI = h.indexOf('?')
    return h.substring(xI + 1, wI)
  },
  /*
        延迟时间
        time是延迟的时间  单位ms
     */
  delay: time => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  },
  /*
     设置抬头
     title 设置的title名
     */
  setTitle: title => {
    document.title = title
  },
  /*
        处理提交参数的前后空格
     */
  submitTrim(obj) {
    if (typeof obj == 'object') {
      let postData = {}
      for (let k in obj) {
        postData[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k]
      }
      return postData
    } else {
      return obj
    }
  },
  /*
        数组去除重复
        只限 数组中值是字符串或number的
     */
  ArraywipeOffRepetition(ary = []) {
    let na = []
    for (let i = 0; i < ary.length; i++) {
      if (na.indexOf(ary[i]) > -1) {
        continue
      } else {
        na.push(ary[i])
      }
    }
    return na
  },
  /*通用判断是否是数组*/
  isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]'
  },
  // 简单实现，参数只能从右到左传递
  createCurry(func, args) {
    var arity = func.length
    var args = args || []

    return function () {
      var _args = [].slice.call(arguments)
      ;[].push.apply(_args, args)

      // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
      if (_args.length < arity) {
        return createCurry.call(this, func, _args)
      }

      // 参数收集完毕，则执行func
      return func.apply(this, _args)
    }
  },
  //数组扁平化
  flatten(arr) {
    return arr.reduce((flat, item) => {
      return flat.concat(item, this.flatten(item.routes || []))
    }, [])
  },
  //获取数组中某些值
  mapName: name => element => {
    if (Array.isArray(name)) {
      let obj = {}
      name.forEach(item => {
        obj = Object.assign(obj, {
          [item]: element[item],
        })
      })
      return obj
    } else {
      return element[name]
    }
  },
  //获取id
  getId: data => {
    return Array.isArray(data) ? data.map(item => item.split('_')[0]).join(',') : null
  },
  //对象属性是否存在预判断。如果存在属性返回最后的值，反之返回false
  getObjProperty(obj, tree) {
    if (!obj || obj == 'undefined' || obj == undefined) {
      return false
    }
    var arr = tree.split('.')
    var tempObj = obj
    for (let i = 0; i < arr.length; i++) {
      if (tempObj[arr[i]] == undefined) {
        return null
      } else {
        tempObj = tempObj[arr[i]]
      }
    }
    return tempObj
  },
  toFixed(num, s) {
    var times = Math.pow(10, s)
    var des = num * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
  },
}

/**
 * 表格columns的数据处理
 * 传入[title, key, {...other}]
 * title必须，key必须
 */
export const renderColumns = cols => {
  return cols
    .filter(item => item)
    .map(item => {
      let other = {}
      if (!!item[2] && isObject(item[2])) {
        other = cloneDeep(item[2])
      }
      if ('display' in other) {
        if (!other.display) {
          return ''
        }
      }
      delete other.display
      return {
        title: item[0],
        dataIndex: item[1],
        key: item[1],
        ...omit(other, ['filter', 'form']),
      }
    })
    .filter(item => item && !item.hide)
}
/**
 * 表格columns带filter属性的列转换成筛选条件组件的业务逻辑处理
 * tableFields:传入当前页面的列
 * filter:{isunions:boolean,//是否是联合类型,elem:<React Compoennt/>筛选组件，如果是联合类型，则给UionSelect,span:number//宽度占比}
 */
export const renderSearchFields = tableFields => {
  let filtersCols = tableFields.filter(
      item => !!item[2] && _.isObject(item[2]) && 'filter' in item[2]
    ), //带查询条件的列
    unionsfiltersList = _.filter(filtersCols, item => item[2].filter.isunions), //取出联合筛选的列
    searchFields = _.uniqBy(
      _.map(filtersCols, item => ({
        ...item[2].filter,
        span: item[2].filter.span || (item[2].filter.isunions ? 10 : 5),
        label: item[2].filter.isunions ? _.map(unionsfiltersList, o => o[0]).join('/') : item[0],
        name: item[2].filter.isunions ? 'unions' : item[2].filter.name || item[1],
        elem: item[2].filter.isunions ? (
          <UnionSelect
            list={_.map(unionsfiltersList, o => ({
              label: o[0],
              value: o[1],
              elem: o[2].filter.elem || undefined,
            }))}
          />
        ) : item[2].filter.elem ? (
          item[2].filter.elem
        ) : (
          <Input placeholder={`请输入${item[0]}`} />
        ),
      })),
      item => item.name
    ) //筛选列根据name去重,name指Form中存储变量的key
  return searchFields
}
/**
 * 表格columns带form属性的列转换成筛选条件组件的业务逻辑处理
 * tableFields:传入当前页面的列
 * form:{name: '',//form组件存储值的key
      label: '有效',//展示的label名称
      valuePropName: 'checked',//组件的value类型 checked表示是switch,fileList表示是文件
      type: 'switch'//组件类型，input,select,switch,upload
    }
 */
export const renderFormFields = (cols, mode) => {
  return cols
    .filter(item => !!item[2] && _.isObject(item[2]) && 'form' in item[2])
    .map(item => {
      return {
        name: item[1],
        label: item[0],
        ...item[2].form,
        disabled: item[2].form.disabled
          ? item[2].form.disabled
          : typeof item[2].form.disabled === 'string'
          ? item[2].form.disabled === mode
          : mode === 'view',
        type: item[2].form.type || 'input', //默认input
      }
    })
    .filter(item => item.hide !== mode || !item.hide) //某些字段可能需要根据新增、修改模式隐藏
}
//序列化数据
export function jsonToUrl(jsonData) {
  // 过滤掉值为 '' || undefined || null || 及空数组 的对象属性
  const postData = isObject(jsonData)
    ? pickBy(jsonData, function (value) {
        return value !== '' && value !== undefined && value !== null && value.toString().length
      })
    : {}
  let html = ''
  for (let i in postData) {
    html += `&${i}=${postData[i]}`
  }
  return encodeURI(html.slice(1))
}
