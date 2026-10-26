# 给女朋友的小站

一个纯静态、手机优先、像素风的小网站，不依赖后端和前端框架。

## 已完成

- 首页宫格入口
- 关于你的 100 件小事
- 随机情话
- 刮刮乐
- 问答小游戏
- 本地留言板
- 吃什么转盘
- iPhone Safari 安全区和 `dvh` 适配

## 本地运行

任选一种方式：

```bash
python3 -m http.server 5500
```

或者用 VS Code 的 **Live Server** 插件打开 `index.html`。

## VS Code 插件建议

不需要安装任何依赖包，只需要下面这两个插件就很舒服：

- **Live Server**：本地实时预览
- **Prettier**：格式化 HTML / CSS / JS

可选：

- **Auto Rename Tag**
- **HTML CSS Support**
- **Path Intellisense**
- **Image preview**
- **Chinese (Simplified) Language Pack**

如果你愿意，也可以在 `.vscode/settings.json` 里加上：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "liveServer.settings.donotShowInfoMsg": true
}
```

## 自定义内容

所有可编辑文案都集中在 `js/data.js`：

- `THINGS`：100 件小事
- `LOVE_NOTES`：随机情话
- `PRIZES`：30 个刮刮乐奖励
- `QUIZ`：问答题目、选项和正确答案
- `WHEEL_OPTIONS`：转盘选项
- `PRESET_MESSAGES`：留言板初始留言

想换配色、圆角、间距，主要改 `css/style.css`。

## 留言板说明

当前版本使用 `localStorage`，数据只保存在这台手机或电脑上，不会同步到其他设备。适合先做“她写心情、你提前埋回复”的轻量版本。

如果之后想双方都能写、跨设备同步，再把 `js/message.js` 换成 Supabase 或 Firebase。

## 图片

图片放在 `images/` 目录里，建议使用 WebP，并加上：

```html
<img src="images/xxx.webp" alt="描述" loading="lazy">
```

## 部署

可以部署到：

- GitHub Pages
- Vercel
- Netlify

如果这是私密网站，建议保持各页面里的 `noindex` 和根目录的 `robots.txt`，避免被搜索引擎收录。

想用短域名的话，可以买好域名后在 GitHub Pages、Vercel 或 Netlify 里绑定自定义域名。
