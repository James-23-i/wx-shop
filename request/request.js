import { baseUrl } from './config'
// 由于首页中调用了三次，当结束回调时，hideLoading只会执行一次，所以三次请求的数据只会加载第一个之后就执行hideLoading
// 定义一个变量来保存返回的次数
let ajaxTime = 0
export default function request(options) {
  // 执行时进行++
  ajaxTime++
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      header: options.header,
      method: options.method || 'get',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete: (res) => {
        // 结束时进行--，当数据都全部请求再执行hideLoading
        ajaxTime--
        if(ajaxTime === 0){
          wx.hideLoading({})
        }
      }
    })
  }) 
}