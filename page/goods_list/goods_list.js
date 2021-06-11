// page/goods_list/goods_list.js
import request from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['综合', '销量', '价格'],
    goodsList: []
  },

  // 请求的接口参数数据（对象接收）
  queryParams: {
    query: '',
    cid: '',
    // 当前的页码和页容量
    pagenum: 1,
    pagesize: 10
  },

  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.queryParams
    })
    console.log(res);

    // 获取数据的总条数
    const total = res.data.message.total
    // 由于设置的页容量为 pageSize = 10，可以获取页数，向上取整
    this.page = Math.ceil( total / this.queryParams.pagesize )

    // 获取数据
    const goodsList = res.data.message.goods
    this.setData({
      // 拼接新的数据（数组的扩展运算符）
      goodsList: [...this.data.goodsList, ...goodsList]
    })

    wx.stopPullDownRefresh({})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在分类页面点击商品跳转，接收商品信息传递的参数cid
    console.log(options);
    this.queryParams.cid = options.cid

    this.getGoodsList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置数据，重置页码，重新发送请求，关闭下拉加载（函数执行的地方）
    this.setData({
      goodsList: []
    })
    this.queryParams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载更多（当前页码和总页码进行比较）
    if(this.queryParams.pagenum >= this.page){
      // 当前页码大于等于总页码，没有数据可以加载
      // console.log('没有数据加载');
      wx.showToast({
        title: '没有数据了！',
        mask: true,
        image: '/assets/toast/感叹号.png'
      })
    }else{
      // console.log('有数据加载');
      // 对当面页码加一，函数进行调用（注意必须对setData数据进行解构赋值，不然只会加载渲染后来的数据）
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  }
})