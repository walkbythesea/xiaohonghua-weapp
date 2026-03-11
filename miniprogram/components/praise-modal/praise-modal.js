Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    meta: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: '太棒了！'
    },
    body: {
      type: String,
      value: '正在召唤夸夸能量…'
    },
    loading: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    noop() {}
  }
});
