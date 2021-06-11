// components/w-up-image/w-up-image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 父组件遍历之后的数据决定数据类型
    src: {
      type: Object,
      value: {}
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
    delImage() {
      this.triggerEvent('delImage')
    }
  }
})
