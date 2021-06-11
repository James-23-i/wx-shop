// page/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['体验问题', '商品、商家投诉'],

    // 上传的图片
    imageChoose: []
  },

  // 点击删除图片
  delImage(event) {
    const index = event.currentTarget.dataset.index
    let { imageChoose } = this.data
    imageChoose.splice(index, 1)
    this.setData({
      imageChoose
    })
  },

  // 点击图片放大
  PreImage(event) {
    const urls = this.data.imageChoose.map(n => n.path)
    const current = event.currentTarget.dataset.item.path
    wx.previewImage({
      urls,
      current
    }) 
  },

  upImages() {
    // 选择图片
    wx.chooseImage({   
      success: (result) => {
        const tempFiles = result.tempFiles
        this.setData({
          // 加上老数组，添加新数组
          imageChoose: [...this.data.imageChoose, ...tempFiles]
        })
      }
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