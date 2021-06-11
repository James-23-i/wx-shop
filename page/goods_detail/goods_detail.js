// page/goods_detail/goods_detail.js
import request from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: [],
    goodBanners: [],
    // 判断是否收藏了该商品
    isCollect: false
  },

  // 接口数据（对象接收，request中的data是个对象）
  goodsParams: {
    goods_id: 0
  },

  // 收藏商品
  collectGoods() {
    let isCollect = false
    // 判断缓存中收藏的商品
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(n => n.goods_id === this.data.goodsDetail.goods_id)
    if(index !== -1){
      // 收藏过（删除掉）
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消收藏！',
        mask: true
      })
    }else{
      // 没有收藏过（添加商品）
      collect.push(this.data.goodsDetail)
      isCollect = true
      wx.showToast({
        title: '收藏成功！',
        mask: true
      })
    }
    // 存到缓存中
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },

  // 加入购物车（使用本地存储技术）
  addCart() {
    // 1、获取缓存中的购物车数据 => 数组格式
    let cart = wx.getStorageSync('cart') || []

    // 2、判断商品对象是否存在购物车数组中
    let index = cart.findIndex(n => n.goods_id === this.data.goodsDetail.goods_id)

    // 3、判断数据
    if(index === -1){
      // 不存在数据，第一次添加
      // 添加属性：商品的数量num、商品选中的状态checked
      this.data.goodsDetail.num = 1
      this.data.goodsDetail.checked = true
      cart.push(this.data.goodsDetail)
    }else{
      // 存在数据，对num++
      cart[index].num++
    }

    // 4、把购物车数据存到缓存中
    wx.setStorageSync('cart', cart)

    // 5、弹窗效果
    wx.showToast({
      title: '加入购物车成功',
      mask: true
    })
  },

  async getDetailData() {
    const res = await request({
      url: '/goods/detail',
      data: this.goodsParams
    })

    const goodsDetail = res.data.message
    const goodBanners = res.data.message.pics
    this.setData({
      goodsDetail: {
        // 筛选要用到的数据（对介绍的图片后缀进行修改，适配IPone）
        goods_id: goodsDetail.goods_id,
        goods_img: goodsDetail.goods_small_logo,
        goods_price: goodsDetail.goods_price,
        goods_name: goodsDetail.goods_name,
        goods_introduce: goodsDetail.goods_introduce.replace(/\.webp/, '.jpg')
      },
      goodBanners
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取跳转的id
    let pages = getCurrentPages()
    let currentPages = pages[pages.length - 1]
    const goods_id = currentPages.options.goods_id
    this.goodsParams.goods_id = goods_id
    this.getDetailData()

    // 获取缓存中商品收藏的数组
    let collect = wx.getStorageSync('collect') || []
    // 判断当前商品是不是被收藏（通过goods_id判断）
    let isCollect = collect.some(n => n.goods_id === this.goodsDetail.goods_id)
    this.setData({
      isCollect
    })
  }
})