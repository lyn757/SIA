# Render 部署图文教程

## 当前步骤：连接 GitHub

### 你现在看到的页面：
```
No repositories found
Connect your Git provider to deploy from your existing repositories.
```

### 操作步骤：

#### 1. 点击 "GitHub" 按钮
在页面底部，点击带有 GitHub 图标的 **"GitHub"** 按钮

#### 2. 授权 Render 访问 GitHub
- 会跳转到 GitHub 授权页面
- 点击 **"Authorize Render"**（授权 Render）
- 可能需要输入 GitHub 密码确认

#### 3. 选择仓库访问权限
GitHub 会询问你要授权哪些仓库：
- 选择 **"All repositories"**（所有仓库）
- 或者选择 **"Only select repositories"**，然后勾选 `SIA` 仓库
- 点击 **"Install & Authorize"**

#### 4. 返回 Render
授权完成后，会自动返回 Render，此时你应该能看到你的仓库列表了

---

## 下一步：选择仓库

授权成功后，你会看到：

```
Rich-Radiant-Studio/SIA
```

在这个仓库右侧，点击 **"Connect"** 按钮

---

## 然后：填写配置

点击 Connect 后，会进入配置页面，你会看到以下表单：

### 表单字段说明：

1. **Name**（名称）
   - 填写：`main-web`
   - 这是你的应用名称，会出现在 URL 中

2. **Root Directory**（根目录）⭐ 重要！
   - 填写：`packages/main-web`
   - 这告诉 Render 你的应用在哪个文件夹

3. **Environment**（环境）
   - 自动选择：`Static Site`
   - 不需要修改

4. **Build Command**（构建命令）
   - 填写：`npm install && npm run build`
   - 或者简单填：`npm run build`

5. **Publish Directory**（发布目录）
   - 填写：`dist`
   - 注意：只填 `dist`，不是完整路径

6. **Auto-Deploy**（自动部署）
   - 选择：`Yes`
   - 这样每次 git push 会自动更新

7. **Branch**（分支）
   - 选择：`main`
   - 使用主分支

---

## 最后：创建网站

填写完所有配置后，滚动到页面底部，点击蓝色的大按钮：

**"Create Static Site"**

然后等待 2-5 分钟，构建完成！

---

## 📸 关键截图位置

如果你还是不确定，可以截图给我看：

1. 授权后的仓库列表页面
2. 填写配置的表单页面

我会告诉你具体怎么填！
