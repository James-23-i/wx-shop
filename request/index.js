import request from './request'
export function getBannerData() {
  return request({
    url: '/home/swiperdata'
  })
}

export function getMenuData() {
  return request({
    url: '/home/catitems'
  })
}

export function getFloorData() {
  return request({
    url: '/home/floordata'
  })
}