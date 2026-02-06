# Render 部署详细步骤

## 第 1 步：注册 Render 账号

1. 访问：**https://render.com**
2. 点击右上角 **"Get Started"** 或 **"Sign Up"**
3. 选择 **"Sign up with GitHub"**（强烈推荐）
4. 授权 Render 访问你的 GitHub 账号

---

## 第 2 步：部署主应用 (main-web)

### 2.1 创建新的静态网站

1. 登录后，点击右上角 **"New +"**
2. 选择 **"Static Site"**

### 2.2 连接 GitHub 仓库

1. 在 "Connect a repository" 页面，找到 **`Rich-Radiant-Studio/SIA`** 仓库
2. 点击右侧的 **"Connect"** 按钮
   - 如果看不到仓库，点击 "Configure account" 授权访问

### 2.3 配置构建设置

填写以下信息：

```
Name: main-web
（或任意你喜欢的名称，例如：sia-main）

Root Directory: packages/main-web
（重要！必须填写）

Build Command: npm install && npm run build
（或者直接填：npm run build）

Publish Directory: dist
（注意：这里填 dist，不是 packages/main-web/dist）
```

### 2.4 高级设置（可选）

点击 "Advanced" 展开高级设置：

- **Auto-Deploy**: 选择 **"Yes"**（每次 git push 自动部署）
- **Branch**: 选择 **"main"**

### 2.5 开始部署

1. 点击底部的 **"Create Static Site"** 按钮
2. 等待构建完成（大约 2-5 分钟）
3. 构建成功后，会显示公网地址，例如：
   ```
   https://main-web.onrender.com
   ```
4. **记录下这个地址！**

---

## 第 3 步：部署设计师应用 (designer-web)

重复第 2 步，但修改配置：

```
Name: designer-web

Root Directory: packages/designer-web

Build Command: npm install && npm run build

Publish Directory: dist
```

记录地址，例如：`https://designer-web.onrender.com`

---

## 第 4 步：部署供应商应用 (supplier-web)

重复第 2 步，但修改配置：

```
Name: supplier-web

Root Directory: packages/supplier-web

Build Command: npm install && npm run build

Publish Directory: dist
```

记录地址，例如：`https://supplier-web.onrender.com`

---

## 第 5 步：部署用户应用 (user-web)

重复第 2 步，但修改配置：

```
Name: user-web

Root Directory: packages/user-web

Build Command: npm install && npm run build

Publish Directory: dist
```

记录地址，例如：`https://user-web.onrender.com`

---

## 第 6 步：测试访问

所有应用部署完成后，你会得到 4 个公网地址：

- **主应用**: https://main-web.onrender.com
- **设计师应用**: https://designer-web.onrender.com
- **供应商应用**: https://supplier-web.onrender.com
- **用户应用**: https://user-web.onrender.com

**直接访问主应用地址即可使用！**

---

## 常见问题

### Q1: 构建失败怎么办？

1. 点击失败的部署记录
2. 查看 "Logs" 标签页
3. 找到错误信息
4. 通常是依赖安装问题，可以尝试：
   - 修改 Build Command 为：`npm ci && npm run build`
   - 或者：`npm install --legacy-peer-deps && npm run build`

### Q2: 如何查看部署日志？

1. 进入项目页面
2. 点击左侧 "Events" 或 "Logs"
3. 可以看到详细的构建和部署日志

### Q3: 如何重新部署？

1. 进入项目页面
2. 点击右上角 "Manual Deploy" → "Deploy latest commit"
3. 或者直接 `git push`，会自动触发部署

### Q4: 如何删除项目？

1. 进入项目页面
2. 点击 "Settings" 标签
3. 滚动到最下方
4. 点击 "Delete Static Site"

### Q5: 免费版有什么限制？

- ✅ 无限静态网站
- ✅ 自动 HTTPS
- ✅ 自动部署
- ✅ 100GB 带宽/月
- ⚠️ 首次访问可能需要等待几秒（冷启动）

---

## 下一步（可选）

### 配置自定义域名

1. 进入项目 "Settings"
2. 找到 "Custom Domain" 部分
3. 点击 "Add Custom Domain"
4. 按照提示配置 DNS

### 配置环境变量

1. 进入项目 "Environment"
2. 点击 "Add Environment Variable"
3. 添加需要的环境变量

---

## 🎉 完成！

现在你的项目已经成功部署到 Render，可以分享给任何人访问了！

**主应用地址：** https://main-web.onrender.com

每次 `git push` 后，Render 会自动重新部署，无需手动操作。

---

**有任何问题随时问我！** 😊
