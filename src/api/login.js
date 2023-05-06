import request from '@/units/request.js'

const BASE_URL = 'http://localhost:3000'

export function adminLogin(data){
    return request({
        url : BASE_URL+ '/api/uniLogin',
        method :'post',
        //header: { 'content-type': 'application/x-www-form-urlencoded' },
        data : data
    })
}
export function adminRegist(data){
    return request({
        url:BASE_URL+ '/api/uniRegist',
        method:'post',
        data:data
    })
}
export function adminPsw(data){
    return request({
        url:BASE_URL+ '/api/uniPassword',
        method:'post',
        data:data
    })
}