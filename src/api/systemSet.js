import request from '@/utils/request'

export function classroomDetail(id) {
  return request({
    url: '/teaching/classroom/read',
    method: 'get',
    params: {
      id: id
    }
  })
}
//教室(编辑)
export function classroomUpdata(data) {
  return request({
    url: '/teaching/classroom/update',
    method: 'post',
    data
  })
}
