import Cookies from 'js-cookie'

const TokenKey = 'accessToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//设置校区
export function setsite_child_id(token) {
  return Cookies.set('child_id', token)
}

export function getsite_child_id() {
  return Cookies.get('child_id')
}

// 设置site_id
const siteId = 'site_id'

export function getSite() {
  return Cookies.get(siteId)
}

export function setSite(id) {
  return Cookies.set(siteId, id)
}

export function removeSite() {
  return Cookies.remove(siteId)
}
