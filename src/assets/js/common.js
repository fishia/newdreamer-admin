import request from './request'
import React from 'react'
import { Modal } from 'antd'
import { jsonToUrl } from '@/utils/util'
const { confirm } = Modal
export function exportFile(url, params) {
  const link = document.createElement('a')
  link.target = '_blank'
  link.href = `${url}?${jsonToUrl(params)}`
  link.click()
  return Promise.resolve()
}

export function dealOssImageUrl(path) {
  return 'http://wechat-miniapp-newdreamer.oss-cn-shanghai.aliyuncs.com/' + path
}

export function matchNameFromImage(url) {
  if (!url) {
    return 'image'
  }
  console.log('---url', url)
  let end = url.split('/').pop()
  let match = end.match(/-\S*\.(png|gif|jpeg)/)
  if (match) {
    return match[0].substring(1, match[0].indexOf('.'))
  }
  return 'image'
}

export class UploadImages {
  imageToUploadImages = images => {
    if (!Array.isArray(images) || images.length === 0) {
      return []
    }
    return Array.from(images, (item, index) => ({
      uid: index,
      name: matchNameFromImage(item),
      status: 'done',
      url: item,
    }))
  }

  uploadImageToImages = uploadImages => {
    if (!Array.isArray(uploadImages) || uploadImages.length === 0) {
      return []
    }
    return Array.from(uploadImages, item => {
      if (item.url) {
        return item.url
      }
      if (item.response) {
        return dealOssImageUrl(item.response[0])
      }
    })
  }
}

export function upload(data) {
  return request({
    method: 'post',
    url: '/newdreamer/file/upload?FileDirectorEnum=PRODUCT',
    params: data,
  })
}

export function previewImage(img) {
  confirm({
    title: '预览',
    content: (
      <div>
        <img alt="preview" style={{ width: '100%' }} src={img} />
      </div>
    ),
  })
}

/*
 * 存储cookie
 * @c_name: 存储的cookie名称
 * @value: 存储的cookie值
 * @expiredays: 到期时间
 * */
export function setCookie(c_name, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie =
    c_name +
    '=' +
    escape(value) +
    (expiredays == null ? '' : ';expires=' + exdate.toGMTString() + ';path=/;domain=localhost')
}
/*
 * 读取cookies
 * @name: cookie名称
 * */
export function getCookie(name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  // console.log(document.cookie.match(reg));
  arr = document.cookie.match(reg)
  if (arr) return unescape(arr[2])
  else return null
}
