import request from '@/utils/request'

export function selectUser(params) {
  return request({
    url: '/selectUser',
    method: 'post',
    params
  })
}
