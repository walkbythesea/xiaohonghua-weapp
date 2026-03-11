const COLORS = ['#D94F3D', '#E8784A', '#E8A84A', '#E8C04A', '#E8A0A0', '#8ABCE8', '#8AE8B0'];

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    active: false,
    particles: []
  },

  observers: {
    'show': function (val) {
      if (val) this.burst();
    }
  },

  methods: {
    burst() {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        const sz = (10 + Math.random() * 16);
        particles.push({
          left: (Math.random() * 100) + '%',
          size: sz + 'rpx',
          color: COLORS[i % COLORS.length],
          radius: Math.random() > 0.5 ? '50%' : '4rpx',
          duration: (1.3 + Math.random() * 1.9) + 's',
          delay: (Math.random() * 0.55) + 's'
        });
      }
      this.setData({ active: true, particles });
      setTimeout(() => {
        this.setData({ active: false, particles: [] });
        this.triggerEvent('done');
      }, 4200);
    }
  }
});
