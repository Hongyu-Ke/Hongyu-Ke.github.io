# 个人学术主页

纯静态的个人学术主页，版式、配色和交互复刻自 [yiren-lu.com](https://yiren-lu.com)（其底层是 MIT 协议的 [academic-homepage](https://github.com/luost26/academic-homepage) 模板）。
不需要构建，也不需要安装 Ruby / Node：所有内容写在 `data/` 里，浏览器直接打开 `index.html` 就能看到效果。

## 页面

| 文件 | 内容 |
|---|---|
| `index.html` | 首页：个人卡片、News、About Me、教育 / 经历、Selected Publications |
| `research.html` | 全部论文，按年份分组，可按研究方向筛选（`research.html?topic=robotics` 可直接分享） |
| `showcase.html` | Services & Awards |

## 修改内容

改完 `data/` 下的文件，刷新浏览器即可：

| 文件 | 内容 |
|---|---|
| `data/profile.js` | 导航栏终端提示符、菜单、页脚；姓名、头像、邮箱、社交链接；About Me；教育 / 经历 |
| `data/news.js` | News 列表（超过 `initiallyShown` 条会折叠到 Show more） |
| `data/publications.js` | 论文列表、研究方向标签、Research 页的 My Research 简介 |
| `data/showcase.js` | 学术服务与奖项 |

每个字段的含义都写在对应文件的注释里。几个常用点：

- **论文**：`selected: true` 的论文会出现在首页，并在 Research 页高亮；作者名与 `highlightName` 一致时自动绿色加粗；名字后加 `*` 自动显示 “(* equal contribution)”；没有封面图时会根据标题生成一张彩色气泡图。
- **视频封面**：把 mp4 放进 `assets/videos/`，在论文里写 `video: 'assets/videos/xxx.mp4'`，滚动到附近才加载，自动静音循环播放。
- **封面轮播**：把 `cover` 写成图片数组（如 `['a.jpg', 'b.jpg']`）就会自动淡入淡出轮播，鼠标悬停时暂停；各张图尺寸最好一致。
- **数学公式**：在 `data/profile.js` 里把 `math` 设为 `true`，标题和简介里就能写 `$...$`。

图片放在 `assets/images/`：头像、学校 / 公司 logo、论文封面。目前都是占位图，换成你自己的即可。

浏览器标签页标题和搜索引擎描述在各 HTML 文件的 `<title>` 和 `<meta name="description">` 里，需要手动改。

## 换配色

`assets/css/global.css` 顶部的 `:root` 定义了全部主题色（背景、主题绿、链接色、代表作高亮色、徽章色等），改这几个变量即可。

## 本地预览

- 直接双击 `index.html`；或
- 在 VS Code 里安装 **Live Server** 扩展，右键 `index.html` → Open with Live Server，保存文件后自动刷新。

## 部署

纯静态文件，任意静态托管都可以：

- **GitHub Pages**：新建名为 `<你的用户名>.github.io` 的仓库，把本目录全部文件推上去，访问 `https://<你的用户名>.github.io`。
- **Netlify / Vercel / Cloudflare Pages**：直接拖入文件夹或连接仓库，不需要构建命令，发布目录就是根目录。

## 致谢与许可

- 模板：[luost26/academic-homepage](https://github.com/luost26/academic-homepage)（MIT License）
- 版式与配色参考：[yiren-lu.com](https://yiren-lu.com)
- 字体：Lato，本地托管，SIL Open Font License 1.1（见 `assets/fonts/OFL.txt`）
- Bootstrap 4.6、Font Awesome 6、Academicons、jQuery 通过 cdnjs 引入
