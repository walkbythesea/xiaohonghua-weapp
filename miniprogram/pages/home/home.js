const storage = require('../../utils/storage');
const util = require('../../utils/util');

Page({
  data: {
    goals: []
  },

  onShow() {
    this.loadGoals();
  },

  loadGoals() {
    const allGoals = storage.getGoals();
    const active = allGoals.filter(g => !g.done);
    const goals = active.map(g => {
      const days = util.dayCount(g.createdAt);
      const last = g.records.length > 0 ? g.records[g.records.length - 1] : null;
      return {
        id: g.id,
        name: g.name,
        days: days,
        isMilestone: util.isMilestone(days),
        latestContent: last ? last.content : '',
        recordCount: g.records.length
      };
    });
    this.setData({ goals });
  },

  openDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id });
  },

  quickRecord(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/record/record?id=' + id });
  },

  goCreate() {
    wx.navigateTo({ url: '/pages/create/create' });
  }
});
