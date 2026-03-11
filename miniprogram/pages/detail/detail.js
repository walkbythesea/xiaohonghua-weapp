const storage = require('../../utils/storage');
const util = require('../../utils/util');

Page({
  data: {
    goalName: '',
    days: 0,
    startDate: '',
    recordCount: 0,
    records: [],
    hasRecords: false
  },

  onLoad(options) {
    this.goalId = options.id;
  },

  onShow() {
    this.loadGoal();
  },

  loadGoal() {
    const goal = storage.getGoalById(this.goalId);
    if (!goal) return;

    const days = util.dayCount(goal.createdAt);
    const sd = new Date(goal.createdAt);
    const startDate = `${sd.getFullYear()}/${sd.getMonth() + 1}/${sd.getDate()}`;
    const records = [...goal.records].reverse().map((r, i) => ({
      id: r.id,
      dateStr: util.formatTime(r.ts),
      content: r.content,
      img: r.img || '',
      hasImg: !!r.img,
      praise: r.praise || '',
      hasPraise: !!r.praise,
      animDelay: i * 0.04 + 's'
    }));

    this.setData({
      goalName: goal.name,
      days: days,
      startDate: startDate,
      recordCount: goal.records.length,
      records: records,
      hasRecords: records.length > 0
    });

    wx.setNavigationBarTitle({ title: goal.name });
  },

  goRecord() {
    wx.navigateTo({ url: '/pages/record/record?id=' + this.goalId });
  }
});
