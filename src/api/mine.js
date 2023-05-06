import request from '@/units/request.js'

const BASE_URL = 'http://localhost:3000'

export function updateMine(data){
    return request({
        url: BASE_URL + '/api/uniGeren',
        method:'post',
        data:data
    })
}
export function feedback(data){
    return request({
        url: BASE_URL + '/api/unifeedback',
        method:'post',
        data:data
    })
}