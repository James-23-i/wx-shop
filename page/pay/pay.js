
import request from '../../request/request'
// page/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储收货地址中的数据
    address: {},
    addressAll: '',

    // 存储购物车中选中商品的数据
    checkedCart: [],

    // 购物车总价格和总数量
    allPrice: 0,
    allNum: 0,

    order_goods: []
  },

  // 商品的支付
  async handlePay() {
    // 先判断缓存有没有token
    const token = wx.getStorageSync('token')
    // 当没有token时跳转到授权
    if(!token) {
      wx.navigateTo({
        url: '/page/auth/auth',
      })
    }
    // 创建订单
    // 获取请求头参数，请求体参数
    const header = { Authorization: token }
    const order_price = this.data.allPrice
    const consignee_addr = this.data.addressAll

    // 往goods添加参数 goods_id、goods_number、goods_price
    const goods = []
    const cart = this.data.checkedCart
    cart.forEach(n => goods.push({
      goods_id: n.goods_id,
      goods_number: n.num,
      goods_price: n.goods_price
    }))

    // 发送请求的data参数数据
    const orderParams = { order_price, consignee_addr, goods }
    const res1 = await request({
      url: '/my/orders/create',
      data: orderParams,
      header,
      method: 'post',
    })
    const order_number = res1.data.message.order_number

    // 获取支付参数
    const res2 = await request({
      url: '/my/orders/req_unifiedorder',
      // data中的数据必须是对象形式
      data: { order_number },
      header,
      method: 'post'
    })

    // 获取订单日期（时间戳格式）、订单编号、价格
    const order_num = res2.data.message.order_number
    const timeStamp = res2.data.message.pay.timeStamp
    const order_pri = res1.data.message.order_price
    const payGoods = { order_num, timeStamp, order_pri }
    // 将payGoods存入到缓存中，可以在历史订单中使用
    const order_goods = {
      data: []
    }
    // 判断支付的商品有多少checkedCart（通过循环给数组push多少个元素）
    const payCartList = this.data.checkedCart.length
    for(let i = 0; i < payCartList; i++) {
      order_goods.data.push(payGoods)
    }
    // 将数据存到缓存中
    const his_order = wx.setStorageSync('his_order', order_goods)

    // 进行微信支付（由于权限问题，不能进行支付。所以通过点击弹窗支付成功，将购物车中的数据删除掉即可）
    // const res3 = await requestPayment(pay)
    // console.log(res3);
    wx.showToast({
      title: '支付成功',
      mask: true
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '/page/order/order',
      })
    }, 1500)

    // 在缓存中获取购物车数组，将没有选中的商品过滤然后重新设置到缓存中
    let newCart = wx.getStorageSync('cart')
    newCart = newCart.filter(n => !n.checked)
    wx.setStorageSync('cart',newCart)
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
    // 获取数据
    let cartList = wx.getStorageSync('cart') || []

    // 获取缓存中的地址
    let address = wx.getStorageSync('address')
    let addressAll = address.provinceName + address.cityName + address.countyName + address.detailInfo

    // 计算总价格、总数量（对购物车中选中的商品进行支付计算）
    // 获取购物车中选中的商品checkedCart
    let checkedCart = cartList.filter(n => n.checked)

    // 对选中的商品进行支付计算
    let allPrice = checkedCart.reduce((prev, n) => prev + n.goods_price * n.num, 0)
    let allNum = checkedCart.reduce((prev, n) => prev + n.num, 0)
    this.setData({
      checkedCart,
      allPrice,
      allNum,
      address,
      addressAll
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