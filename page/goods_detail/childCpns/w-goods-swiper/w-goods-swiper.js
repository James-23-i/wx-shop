// page/goods_detail/childCpns/w-goods-swiper/w-goods-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodBanners: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 轮播图点击放大事件
    previewImage(event) {
      console.log(event);
      const urls = this.properties.goodBanners.map(n => n.pics_big)
      const current = event.currentTarget.dataset.url
      wx.previewImage({
        current,
        urls
      })
    }
  }
})
