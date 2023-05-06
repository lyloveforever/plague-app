import request from '@/units/request.js'

const BASE_URL = 'http://localhost:3000'

export function academyList(data){
    return request({
        url:BASE_URL + '/api/academy/search',
        method :'post',
        data : data
    })
}
export function addressList(data){
    return request({
        url:BASE_URL + '/api/address/search',
        method :'post',
        data : data
    })
}