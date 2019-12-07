import request from '@/utils/request'

//登录
export function loginBy(data) {
    return request({
        url: '/member/admin/login',
        method: 'post',
        data
    })
}
/*******  临时写的 解决报错(不可用) *******/
export function getCodeForPassword(data) {
    return request({
        url: '/ucenter/user/loginbypassword',
        method: 'post',
        data
    })
}

export function getCode(data) {
    return request({
        url: '/ucenter/user/loginbypassword',
        method: 'post',
        data
    })
}

export function findPassword(data) {
    return request({
        url: '/ucenter/user/loginbypassword',
        method: 'post',
        data
    })
}

export function signup(data) {
    return request({
        url: '/ucenter/user/loginbypassword',
        method: 'post',
        data
    })
}
