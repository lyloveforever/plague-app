import request from '@/units/request.js'

const BASE_URL = 'http://localhost:3000'

export function noticeList(data){
    return request({
        url:BASE_URL + '/api/uniapp/proclamation',
        method :'post',
        data : data
    })
}