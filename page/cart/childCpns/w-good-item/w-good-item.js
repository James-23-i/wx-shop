// page/cart/childCpns/w-good-item/w-good-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
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
    // 全选
    checkItem(event) {
      // 发射change事件并传递goods_id（由于组件内部不能通过setData修改页面数据，所以通过发射事件给父组件接收）
      const goods_id = event.currentTarget.dataset.id
      this.triggerEvent('checkItem', {goods_id})
    },

    // 数量编辑
    tapChangeNum(event) {
      const { operation, id } = event.currentTarget.dataset
      this.triggerEvent('changeNum', { operation, id })
    }
  }
})
