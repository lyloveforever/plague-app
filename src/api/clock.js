import request from '@/units/request.js'

const BASE_URL = 'http://192.168.158.37:3000'


export function clockList(data){
    return request({
        url:BASE_URL+ '/api/uniClock',
        method:'post',
        data:data
    })
}

export function clockAdd(data){
    return request({
        url:BASE_URL+ '/api/uniClock/add',
        method:'post',
        data:data
    })
}