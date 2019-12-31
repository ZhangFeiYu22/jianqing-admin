import request from '@/utils/request'

//登录
export function getArticleList() {
    return request({
        url: '/backend/article',
        method: 'get'
    })
}
