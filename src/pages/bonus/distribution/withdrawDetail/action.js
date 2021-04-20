
import { dataSource } from './data';
import { exportFile } from '../../../../assets/js/common'

export function requestOrderList(data) {
    return Promise.resolve(dataSource);
}