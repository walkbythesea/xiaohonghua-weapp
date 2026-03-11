const storage = require('../../utils/storage');
const util = require('../../utils/util');

Page({
  data: {
    name: '',
    date: '',
    dateLabel: '选择日期',
    nameFocus: false
  },

  onLoad() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    this.setData({
      date: dateStr,
      dateLabel: `${y} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`
    });
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },

  onNameFocus() {
    this.setData({ nameFocus: true });
  },

  onNameBlur() {
    this.setData({ nameFocus: false });
  },

  onDateChange(e) {
    const dateStr = e.detail.value;
    const parts = dateStr.split('-');
    this.setData({
      date: dateStr,
      dateLabel: `${parts[0]} 年 ${parseInt(parts[1])} 月 ${parseInt(parts[2])} 日`
    });
  },

  createGoal() {
    const name = this.data.name.trim();
    if (!name) {
      wx.showToast({ title: '请输入目标名称', icon: 'none' });
      return;
    }
    const startDate = this.data.date
      ? new Date(this.data.date + 'T00:00:00').toISOString()
      : new Date().toISOString();
    const goal = {
      id: util.generateId(),
      name: name,
      createdAt: startDate,
      records: [],
      done: false
    };
    storage.addGoal(goal);
    wx.redirectTo({ url: '/pages/detail/detail?id=' + goal.id });
  }
});
