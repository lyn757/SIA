# Vercel 部署指南

## 📋 部署步骤

### 1. 准备工作

#### 1.1 注册 Vercel 账号
1. 访问 https://vercel.com
2. 点击 "Sign Up" 注册账号
3. 建议使用 GitHub 账号登录（方便后续操作）

#### 1.2 安装 Vercel CLI（可选）
```bash
npm install -g vercel
```

---

### 2. 推送代码到 GitHub

#### 2.1 初始化 Git 仓库（如果还没有）
```bash
git init
git add .
git commit -m "Initial commit for Vercel deployment"
```

#### 2.2 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 创建一个新仓库（例如：`home-decoration-platform`）
3. 不要初始化 README、.gitignore 或 license

#### 2.3 推送代码
```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

---

### 3. 部署到 Vercel

由于这是一个 monorepo 项目，需要分别部署 4 个应用：

#### 3.1 部署主应用（main-web）

1. 登录 Vercel Dashboard
2. 点击 "Add New..." → "Project"
3. 导入你的 GitHub 仓库
4. 配置项目：
   - **Framework Preset**: Vite
   - **Root Directory**: `packages/main-web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 点击 "Deploy"
6. 部署完成后，记录下域名（例如：`https://main-web-xxx.vercel.app`）

#### 3.2 部署设计师应用（designer-web）

1. 在 Vercel Dashboard 点击 "Add New..." → "Project"
2. 选择同一个 GitHub 仓库
3. 配置项目：
   - **Framework Preset**: Vite
   - **Root Directory**: `packages/designer-web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 点击 "Deploy"
5. 记录域名（例如：`https://designer-web-xxx.vercel.app`）

#### 3.3 部署供应商应用（supplier-web）

1. 重复上述步骤
2. **Root Directory**: `packages/supplier-web`
3. 记录域名（例如：`https://supplier-web-xxx.vercel.app`）

#### 3.4 部署用户应用（user-web）

1. 重复上述步骤
2. **Root Directory**: `packages/user-web`
3. 记录域名（例如：`https://user-web-xxx.vercel.app`）

---

### 4. 配置子应用地址

部署完成后，需要更新主应用的子应用地址配置：

#### 4.1 修改 `packages/main-web/src/utils/wujie.ts`

```typescript
// 子应用配置 - 使用 Vercel 部署的地址
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

#### 4.2 重新部署主应用

1. 提交代码更改：
```bash
git add .
git commit -m "Update micro app URLs for Vercel"
git push
```

2. Vercel 会自动检测到更改并重新部署

---

### 5. 使用 Vercel CLI 快速部署（推荐）

如果你已经安装了 Vercel CLI，可以使用命令行快速部署：

#### 5.1 部署主应用
```bash
cd packages/main-web
vercel --prod
```

#### 5.2 部署其他应用
```bash
cd packages/designer-web
vercel --prod

cd packages/supplier-web
vercel --prod

cd packages/user-web
vercel --prod
```

---

## 🎯 部署后的访问地址

部署完成后，你会得到 4 个公网地址：

- **主应用**: https://main-web-xxx.vercel.app
- **设计师应用**: https://designer-web-xxx.vercel.app
- **供应商应用**: https://supplier-web-xxx.vercel.app
- **用户应用**: https://user-web-xxx.vercel.app

访问主应用地址即可使用完整功能！

---

## ✅ 优势

- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动构建和部署
- ✅ 支持自定义域名
- ✅ 不需要保持电脑开机
- ✅ 永久可访问
- ✅ Git 推送自动部署

---

## 🔧 常见问题

### Q: 构建失败怎么办？
A: 检查 Vercel 的构建日志，通常是依赖安装或构建命令的问题。确保本地 `npm run build` 可以成功。

### Q: 子应用加载失败？
A: 检查 CORS 配置和子应用 URL 是否正确。Vercel 配置文件中已经添加了 CORS 头。

### Q: 如何绑定自定义域名？
A: 在 Vercel 项目设置中，进入 "Domains" 选项卡，添加你的域名并按照提示配置 DNS。

### Q: 如何更新部署？
A: 只需要 `git push` 推送代码，Vercel 会自动检测并重新部署。

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Vercel 官方文档：https://vercel.com/docs
2. 检查构建日志找出错误原因
3. 确保所有配置文件正确

---

**祝部署顺利！🎉**
