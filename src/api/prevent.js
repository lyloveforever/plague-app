import request from '@/units/request.js'

const BASE_URL = 'http://localhost:3000'

export function preventList(data){
    return request({
        url : BASE_URL+ '/api/prevent/all',
        method :'post',
        data : data
    })
}