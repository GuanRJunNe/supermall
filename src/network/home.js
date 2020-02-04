import { request } from './request';

// 首页展示数据
export function getHomeMultidata () {
  return request({
    url:'/home/multidata'
  })
}
// 首页分类的数据
export function getHomeGoods (type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
