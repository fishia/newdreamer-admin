import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'

export function requestcoupomList(data) {
  return request({
      method: 'get',
      url: '/newdreamer/coupon/queryAll',
      params: data
  })
}

