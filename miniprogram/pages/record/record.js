const storage = require('../../utils/storage');
const util = require('../../utils/util');
const api = require('../../utils/api');

Page({
  data: {
    content: '',
    imgPath: '',
    contentFocus: false,
    showPraise: false,
    showConfetti: false,
    praiseTitle: '太棒了！',
    praiseBody: '正在召唤夸夸能量…',
    praiseLoading: true,
    praiseMeta: '',
    submitting: false
  },

  onLoad(options) {
    this.goalId = options.id;
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  onContentFocus() {
    this.setData({ contentFocus: true });
  },

  onContentBlur() {
    this.setData({ contentFocus: false });
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempPath = res.tempFiles[0].tempFilePath;
        const fs = wx.getFileSystemManager();
        const ext = tempPath.split('.').pop();
        const savedPath = wx.env.USER_DATA_PATH + '/xhh_' + Date.now() + '.' + ext;
        fs.saveFile({
          tempFilePath: tempPath,
          filePath: savedPath,
          success: () => {
            this.setData({ imgPath: savedPath });
          },
          fail: () => {
            this.setData({ imgPath: tempPath });
          }
        });
      }
    });
  },

  removeImage() {
    this.setData({ imgPath: '' });
  },

  submit() {
    const content = this.data.content.trim();
    if (!content) {
      wx.showToast({ title: '请输入今天的进展', icon: 'none' });
      return;
    }
    if (this.data.submitting) return;
    this.setData({ submitting: true });

    const rec = {
      id: util.generateId(),
      ts: Date.now(),
      content: content,
      img: this.data.imgPath || null,
      praise: null
    };

    const goal = storage.addRecord(this.goalId, rec);
    if (!goal) {
      this.setData({ submitting: false });
      return;
    }

    const days = util.dayCount(goal.createdAt);
    const ms = util.isMilestone(days);

    this.setData({
      showConfetti: true,
      showPraise: true,
      praiseTitle: util.randomTitle(ms),
      praiseMeta: '「' + goal.name + '」· 第 ' + days + ' 天',
      praiseBody: '正在召唤夸夸能量…',
      praiseLoading: true
    });

    api.getPraise(goal.name, days, content, ms).then(praise => {
      storage.updateRecord(this.goalId, rec.id, { praise: praise });
      this.setData({
        praiseBody: praise,
        praiseLoading: false
      });
    });
  },

  closePraise() {
    this.setData({
      showPraise: false,
      showConfetti: false,
      submitting: false
    });
    wx.navigateBack();
  },

  onConfettiDone() {
    this.setData({ showConfetti: false });
  }
});
