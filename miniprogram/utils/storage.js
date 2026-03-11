const STORAGE_KEY = 'xhh3';

function getGoals() {
  return wx.getStorageSync(STORAGE_KEY) || [];
}

function saveGoals(goals) {
  wx.setStorageSync(STORAGE_KEY, goals);
}

function getGoalById(id) {
  const goals = getGoals();
  return goals.find(g => g.id === id) || null;
}

function addGoal(goal) {
  const goals = getGoals();
  goals.push(goal);
  saveGoals(goals);
}

function addRecord(goalId, record) {
  const goals = getGoals();
  const goal = goals.find(g => g.id === goalId);
  if (!goal) return null;
  goal.records.push(record);
  saveGoals(goals);
  return goal;
}

function updateRecord(goalId, recordId, updates) {
  const goals = getGoals();
  const goal = goals.find(g => g.id === goalId);
  if (!goal) return null;
  const rec = goal.records.find(r => r.id === recordId);
  if (!rec) return null;
  Object.assign(rec, updates);
  saveGoals(goals);
  return rec;
}

module.exports = {
  getGoals,
  saveGoals,
  getGoalById,
  addGoal,
  addRecord,
  updateRecord
};
