# 小红花目标簿 — 微信小程序版

记录目标与进步，每一步都会被好好夸一夸。

## 快速开始

### 1. 配置 AppID

打开 `project.config.json`，将 `"appid": "YOUR_APPID_HERE"` 替换为你的真实 AppID。

### 2. 配置云开发

1. 用微信开发者工具打开本项目根目录 `xiaohonghua-weapp/`
2. 点击工具栏「云开发」按钮，开通云开发环境
3. 记下你的云环境 ID（如 `cloud1-xxx`）
4. 打开 `miniprogram/app.js`，在 `wx.cloud.init()` 中添加环境 ID：
   ```js
   wx.cloud.init({ env: '你的云环境ID' });
   ```

### 3. 配置 AI 夸夸（Anthropic API）

1. 打开 `cloudfunctions/getPraise/index.js`
2. 将 `YOUR_ANTHROPIC_API_KEY` 替换为你的 Anthropic API Key
3. 在微信开发者工具中，右键点击 `cloudfunctions/getPraise` 文件夹
4. 选择「上传并部署：云端安装依赖」

### 4. 运行

在微信开发者工具中点击编译即可预览。

## 项目结构

```
xiaohonghua-weapp/
  project.config.json        # 微信开发者工具配置
  miniprogram/
    app.js / app.json / app.wxss  # 全局配置与样式
    pages/
      home/                  # 首页 - 目标列表
      create/                # 创建目标
      detail/                # 目标详情 + 时间轴
      record/                # 记录进展 + 夸夸弹层
    components/
      praise-modal/          # 夸夸弹层组件
      confetti/              # 烟花庆祝动画
    utils/
      storage.js             # 本地数据存储
      api.js                 # 云函数调用
      util.js                # 工具函数
    images/                  # 静态图片资源
  cloudfunctions/
    getPraise/               # AI 夸夸云函数
```

## 功能列表

- 创建与管理目标
- 记录每日进展（文字 + 图片）
- AI 生成个性化夸夸鼓励
- 进展时间轴回顾
- 里程碑（第7/30/100天）特别庆祝
- 烟花庆祝动画
