// page/category/category.js
import { getCategoryData } from '../../request/category'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0,
    scrollTop: 0
  },

  // 整体的数据menuList
  menuList: [],

  menuClick(event) {
    // 获取index
    const index = event.currentTarget.dataset.index

    // 由于这里能获取到index的值，所以右边的菜单数据可以通过不同的index渲染
    const rightMenuList = this.menuList[index].children

    // 设置状态
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop: 0
    })
  },

  async getCategoryData() {
    const res = await getCategoryData()
    //获取整体的数据
    this.menuList = res.data.message
    // 将接口的数据存储到本地中
    wx.setStorageSync('cates',{time:Date.now(), data:this.menuList})
    // 获取左边列表数据（通过 map方法进行数据筛选）
    const leftMenuList = this.menuList.map(n => n.cat_name)
    // 获取右边列表数据 
    const rightMenuList = this.menuList[0].children
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1、获取本地存储的数据
    const cates = wx.getStorageSync('cates')
    // 2、判断
    if(!cates){
      // 没有旧数据直接发送新请求
      this.getCategoryData()
    }else{
      // 有旧数据，定义过期时间
      if(Date.now() - cates.time > 1000 * 1000){
        // 重新请求
        this.getCategoryData()
      }else{
        console.log('使用旧数据');
        // 使用旧数据
        this.menuList = cates.data
        // 获取左边列表数据（通过 map方法进行数据筛选）
        const leftMenuList = this.menuList.map(n => n.cat_name)
        // 获取右边列表数据 
        const rightMenuList = this.menuList[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
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