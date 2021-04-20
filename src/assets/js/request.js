import axios from 'axios';

export default function request (options) {
    let header = options.header || {};
    if (options.type === 'json') {
        header['Content-Type'] = 'application/json;utf-8';
    }
    return axios(options).then(response => {
        let resCode = response.status;
        let resSuccess = resCode >= 200 && resCode < 300 || resCode === 304; // jq
        if (resSuccess) {
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    })   
}