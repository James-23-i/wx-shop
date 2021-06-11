// page/order/order.js
import request from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['全部', '待付款', '待发货', '退款/退货'],
    order: {}
  },

  // 发送网络请求接收历史订单数据
  async getOrders(type) {
    // 获取缓存中的token
    const token = wx.getStorageSync('token');
    const header = { Authorization: token }
    const res = await request({
      url: '/my/orders/all',
      data: { type },
      header
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取type
    // getCurrentPages：获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
    const pages = getCurrentPages()
    const type = pages[pages.length - 1].options
    console.log(type)

    this.getOrders(type)

    // 获取缓存中订单数据
    const order = wx.getStorageSync('his_order')
    this.setData({
      order,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})