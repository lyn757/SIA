# Vercel 网页部署指南（推荐）

由于 CLI 登录问题，我们使用 Vercel 网页界面部署，这个方法更简单直观！

## 🚀 快速部署步骤

### 第 1 步：注册/登录 Vercel

1. 访问：https://vercel.com
2. 点击右上角 **"Sign Up"** 或 **"Login"**
3. **强烈建议**：选择 **"Continue with GitHub"** 用 GitHub 账号登录
   - 如果没有 GitHub 账号，先去 https://github.com 注册一个

### 第 2 步：推送代码到 GitHub

#### 2.1 如果还没有 GitHub 仓库：

1. 访问 https://github.com/new
2. 创建新仓库：
   - Repository name: `home-decoration-platform`（或任意名称）
   - 选择 **Public**（公开）或 **Private**（私有）
   - **不要**勾选 "Initialize this repository with a README"
3. 点击 **"Create repository"**

#### 2.2 推送代码：

打开命令行，执行：

```bash
# 如果还没有初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Ready for Vercel deployment"

# 添加远程仓库（替换成你的 GitHub 用户名和仓库名）
git remote add origin https://github.com/你的用户名/home-decoration-platform.git

# 推送
git branch -M main
git push -u origin main
```

### 第 3 步：在 Vercel 部署主应用

1. 登录 Vercel 后，点击 **"Add New..."** → **"Project"**
2. 点击 **"Import Git Repository"**
3. 选择你刚才创建的 GitHub 仓库
4. 配置项目：

```
Project Name: main-web（或任意名称）
Framework Preset: Vite
Root Directory: packages/main-web  ← 重要！
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. 点击 **"Deploy"**
6. 等待 2-3 分钟，部署完成！
7. **记录下域名**，例如：`https://main-web-xxx.vercel.app`

### 第 4 步：部署设计师应用

1. 回到 Vercel Dashboard
2. 点击 **"Add New..."** → **"Project"**
3. 再次选择**同一个** GitHub 仓库
4. 配置项目：

```
Project Name: designer-web
Framework Preset: Vite
Root Directory: packages/designer-web  ← 重要！
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. 点击 **"Deploy"**
6. **记录下域名**，例如：`https://designer-web-xxx.vercel.app`

### 第 5 步：部署供应商应用

重复第 4 步，但配置改为：

```
Project Name: supplier-web
Root Directory: packages/supplier-web  ← 重要！
```

**记录下域名**，例如：`https://supplier-web-xxx.vercel.app`

### 第 6 步：部署用户应用

重复第 4 步，但配置改为：

```
Project Name: user-web
Root Directory: packages/user-web  ← 重要！
```

**记录下域名**，例如：`https://user-web-xxx.vercel.app`

---

## ✅ 部署完成！

现在你有 4 个公网地址：

- **主应用**: https://main-web-xxx.vercel.app
- **设计师应用**: https://designer-web-xxx.vercel.app
- **供应商应用**: https://supplier-web-xxx.vercel.app
- **用户应用**: https://user-web-xxx.vercel.app

**访问主应用地址即可使用！**

---

## 🔧 可选：配置子应用地址（如果需要微前端功能）

如果你需要在主应用中加载子应用，需要更新配置：

1. 编辑 `packages/main-web/src/utils/wujie.ts`
2. 将子应用 URL 改为 Vercel 部署的地址：

```typescript
const MICRO_APP_CONFIG = {
  'designer-web': {
    url: 'https://designer-web-xxx.vercel.app',  // 替换为实际域名
    name: 'designer-web'
  },
  'supplier-web': {
    url: 'https://supplier-web-xxx.vercel.app',  // 替换为实际域名
    name: 'supplier-web'
  },
  'user-web': {
    url: 'https://user-web-xxx.vercel.app',      // 替换为实际域名
    name: 'user-web'
  }
}
```

3. 提交并推送：

```bash
git add .
git commit -m "Update micro app URLs"
git push
```

4. Vercel 会自动检测到更改并重新部署主应用！

---

## 💡 提示

- ✅ 每次 `git push` 后，Vercel 会自动重新部署
- ✅ 部署历史可以在 Vercel Dashboard 查看
- ✅ 可以回滚到任意历史版本
- ✅ 支持自定义域名（在项目设置中配置）
- ✅ 完全免费，无需信用卡

---

## ❓ 常见问题

### Q: 构建失败怎么办？
A: 点击部署记录查看详细日志，通常是依赖安装问题。确保本地 `npm run build` 可以成功。

### Q: 如何查看部署日志？
A: 在 Vercel Dashboard → 选择项目 → Deployments → 点击具体的部署记录

### Q: 如何删除项目？
A: 项目设置 → 最下方 → Delete Project

### Q: 可以绑定自己的域名吗？
A: 可以！项目设置 → Domains → 添加域名并配置 DNS

---

**祝部署顺利！🎉**

有任何问题随时问我！
