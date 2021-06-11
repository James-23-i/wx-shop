// page/index/index.js
import { getBannerData, getMenuData, getFloorData} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    menu: [],
    floorData: []
  },

  getBannerData() {
    getBannerData().then(res => {
      const banners = res.data.message
      this.setData({
        banners
      })
    })
  },

  getMenuData() {
    getMenuData().then(res => {
      const menu = res.data.message
      this.setData({
        menu
      })
    })
  },

  getFloorData() {
    getFloorData().then(res => {
      const floorData = res.data.message
      this.setData({
        floorData
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerData()
    this.getMenuData()
    this.getFloorData()
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