const util = require('./util');

function getPraise(goalName, days, content, ms) {
  return new Promise((resolve) => {
    wx.cloud.callFunction({
      name: 'getPraise',
      data: { goalName, days, content, isMilestone: ms },
      success(res) {
        resolve(res.result && res.result.praise ? res.result.praise : util.fallbackPraise());
      },
      fail() {
        resolve(util.fallbackPraise());
      }
    });
  });
}

module.exports = { getPraise };
