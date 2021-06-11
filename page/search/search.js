// page/search/search.js
import request from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchGoods: [],

    // 按钮是否隐藏
    isShow: true,

    // 输入框的值
    inputValue: ''
  },

  // 防抖变量
  timeID: -1,

  // 监听取消按钮
  btnCancel() {
    this.setData({
      searchGoods: [],
      isShow: true,
      inputValue: ''
    })
  },

  // 监听输入框的内容
  inputChange(event) {
    // 获取输入的值
    let value = event.detail.value
    // console.log(value);
    // 判断是否是有效字符
    if(!value.trim()) {
      // 无效value（包括为空）
      this.setData({
        searchGoods: [],
        isShow: true
      })
    }else{
      // 有效value
      this.setData({
        isShow: false
      })
    }
    // 获取请求的数据（加上防抖）
    clearTimeout(this.timeID)
    this.timeID = setTimeout(() => {
      this.getSearchData(value)
    }, 500)
    
  },

  // 请求搜索的数据
  async getSearchData(query) {
    const res = await request({
      url: '/goods/qsearch',
      data: { query }
    })
    const searchGoods = res.data.message
    this.setData({
      searchGoods
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