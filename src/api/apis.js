import request from '@/utils/request'

//登录
export function loginBy(data) {
    return request({
        url: '/user_login',
        method: 'post',
        data
    })
}

// 查看首页
export function homeSee() {
    return request({
        url: '/backend/homepage',
        method: 'get'
    })
}
// 首页保存
export function homeSave(data) {
    return request({
        url: '/backend/homepage',
        method: 'post',
        data
    })
}

//文章列表  查看
export function getArticleList() {
    return request({
        url: '/backend/article',
        method: 'get'
    })
}
//文章列表   保存
export function saveArticle(data) {
    return request({
        url: '/backend/article',
        method: 'post',
        data
    })
}
//文章列表   修改
export function putArticle(data,id) {
    return request({
        url: `/backend/article/${id}`,
        method: 'put',
        data
    })
}
//文章列表   删除
export function delArticle(id) {
    return request({
        url: `/backend/article/${id}`,
        method: 'delete'
    })
}

// 业务范围  列表
export function getBusiness() {
    return request({
        url: `/backend/business`,
        method: 'get'
    })
}
//业务范围   保存
export function saveBusiness(data) {
    return request({
        url: '/backend/business',
        method: 'post',
        data
    })
}
//业务范围   修改
export function putBusiness(data,id) {
    return request({
        url: `/backend/business/${id}`,
        method: 'put',
        data
    })
}
//业务范围   删除
export function delBusiness(id) {
    return request({
        url: `/backend/business/${id}`,
        method: 'delete'
    })
}

//联系我们   增加
export function postContacUs(data) {
    return request({
        url: `/backend/company`,
        method: 'post',
        data
    })
}
//联系我们   查看
export function getContacUs() {
    return request({
        url: `/backend/company`,
        method: 'get'
    })
}