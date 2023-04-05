import request from '@/units/request.js'

const BASE_URL = 'http://192.168.158.37:3000'


export function applyList(data){
    return request({
        url:BASE_URL+ '/api/uniApply',
        method:'post',
        data:data
    })
}


export function applyAdd(data){
    return request({
        url:BASE_URL+ '/api/uniApply/add',
        method:'post',
        data:data
    })
}