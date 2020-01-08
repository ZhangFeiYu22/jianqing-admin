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

// 公司简介   查看 
export function getIntroduction() {
    return request({
        url: `/backend/introduction`,
        method: 'get'
    })
}
// 公司简介   修改
export function postIntroduction(data) {
    return request({
        url: `/backend/introduction`,
        method: 'post',
        data
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

// 案例展示  列表
export function getCase() {
    return request({
        url: `/backend/cases`,
        method: 'get'
    })
}
// 案例展示  添加
export function saveCase(data) {
    return request({
        url: '/backend/cases',
        method: 'post',
        data
    })
}
// 案例展示  修改
export function putCase(data,id) {
    return request({
        url: `/backend/cases/${id}`,
        method: 'put',
        data
    })
}
// 案例展示  删除
export function delCase(id) {
    return request({
        url: `/backend/cases/${id}`,
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


// 用户管理  列表
export function getUser() {
    return request({
        url: `/backend/user`,
        method: 'get'
    })
}
// 用户管理  添加
export function saveUser(data) {
    return request({
        url: '/backend/user',
        method: 'post',
        data
    })
}
// 用户管理  修改
export function putUser(data,id) {
    return request({
        url: `/backend/user/${id}`,
        method: 'put',
        data
    })
}
// 用户管理  删除
export function delUser(id) {
    return request({
        url: `/backend/user/${id}`,
        method: 'delete'
    })
}
