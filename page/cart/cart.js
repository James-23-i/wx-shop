// page/cart/cart.js
/* 
  修改购物车中的数据：
    1、必须先获取缓存中的数据，然后根据不同的事件修改不同的属性。
    2、修改完毕之后还必须重新setData和缓存
    3、通过商品的goods_id进行判断商品的下标值（结合方法findIndex）
    4、方法：findIndx filter reduce forEach every splice 对象解构
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储收货地址中的数据
    address: {},
    addressAll: '',

    // 存储购物车的数据
    cartList: [],

    // 购物车全选
    allChecked: false,

    // 购物车总价格和总数量
    allPrice: 0,
    allNum: 0
  },

    /* 
    设置商品的选中状态：
      1、添加绑定事件
      2、获取被修改的对象
      3、对商品的对象的选中状态进行取反
      4、重新填充到data和缓存中
      5、重新计算全选、总价格总数量
    */
   checkItem(event) {
    // id获取（通过id判断数据的index）
    const goods_id = event.detail.goods_id

    // 获取data中的商品对象
    let cartList = this.data.cartList

    // 获取被修改的商品对象的下标值（商品的goods_id是否与传递过来的goods_id相等）
    let index = cartList.findIndex(n => n.goods_id === goods_id)
    
    // 取反
    cartList[index].checked = !cartList[index].checked

    // 重新将数据填充到缓存中  
    wx.setStorageSync('cart', cartList)

    // 修改全选总价格总数量
    this.setCartList(cartList)
  },

  /* 
  数量的编辑：
    1、接收triggerEvent事件和参数
    2、通过goods_id判断商品
    3、获取购物车商品对象，修改num属性
    4、修改setData和缓存数据
    注：当商品的数量为1和operation为-1时，不能继续编辑。要继续编辑时，弹出是否删除该商品
  */
  changeNum(event) {
    // 获取data-operation和商品id
    const { id, operation } = event.detail

    // 获取商品对象
    const cartList = this.data.cartList
    const index = cartList.findIndex(n => n.goods_id === id)

    // 判断num是否为1和operation是否为-1
    if(cartList[index].num === 1 && operation === -1){
      wx.showModal({
        title: '提示',
        content: '确定删除该商品？',
        success: res => {
          if (res.confirm) {
            // 点击确定（通过数组的方法删除该商品），并且更新状态
            cartList.splice(index, 1)
            this.setCartList(cartList)
          }
        }
      })
    }else{
      // 修改index
      cartList[index].num += operation

      // setData和缓存
      this.setCartList(cartList)
      wx.setStorageSync('cart', cartList)
    }
  },

  // 获取收货地址
  chooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        // console.log(result);
        const address = result
        const addressAll = address.provinceName + address.cityName + address.countyName + address.detailInfo
        this.setData({
          address,
          addressAll
        })
        // 将地址存到缓存中，方便支付页面使用
        wx.setStorageSync('address', address)
      }
    })
  },

  // 修改全选、总价格、总数量
  setCartList(cartList){
    // 全选状态
    // every方法：当数组为空数组时，返回true（当购物车没有数据时，cartList为空数组，此时allChecked就会变为true）
    let allChecked = cartList.length ? cartList.every(n => n.checked) : false

    // 获取价格和数量（判断是否选中再进行计算）
    let allPrice = cartList.filter(n => n.checked)
                            .reduce((prev, n) => prev + n.goods_price * n.num, 0)

    let allNum = cartList.filter(n => n.checked)
                          .reduce((prev, n) => prev + n.num, 0)
    this.setData({
      cartList,
      allChecked,
      allPrice,
      allNum
    })
  },

  // toolbar的全选状态
  handleAllChecked() {
    // 获取商品对象和全选属性（通过对象的解构）
    let { cartList, allChecked } = this.data

    // 修改 allChecked状态
    allChecked = !allChecked

    // 对cartList进行遍历，然后修改checked属性
    cartList.forEach(n => n.checked = !n.checked)

    // 将数据修改到setData和缓存中
    this.setCartList(cartList)
    wx.setStorageSync('cart', cartList)
  },

  // 结算按钮（当有收货地址和有商品时，才能进行结算并且跳转到pay支付页面）
  calcPrice() {
    const { cartList, addressAll } = this.data
    if(cartList.length === 0) {
      wx.showToast({
        title: '请添加商品！',
        icon: 'none',
        mask: true
      })
    }else if(addressAll === '') {
      wx.showToast({
        title: '请添加收货地址！',
        icon: 'none',
        mask: true
      })
    }else {
      wx.navigateTo({
        url: '/page/pay/pay'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取数据
    let cartList = wx.getStorageSync('cart') || []

    // 修改全选、总价格、总数量
    this.setCartList(cartList)
  }
})