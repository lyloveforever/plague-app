import request from '@/units/request.js'

const BASE_URL = 'http://192.168.158.37:3000'

export function noticeList(data){
    return request({
        url:BASE_URL + '/api/proclamation/all',
        method :'post',
        data : data
    })
}