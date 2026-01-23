# 连接到 GitHub 仓库：SIA

## 仓库信息
- **仓库地址**: https://github.com/Rich-Radiant-Studio/SIA.git
- **组织**: Rich-Radiant-Studio
- **项目**: SIA

---

## 方案选择

### 方案 1: 保留本地代码并推送到远程（推荐）
适用于：你想保留当前所有的本地修改和代码

### 方案 2: 克隆远程仓库
适用于：远程仓库已有代码，你想获取远程代码

---

## 方案 1: 推送本地代码到远程（推荐）

### 步骤 1: 初始化本地仓库
```bash
cd D:\soft-deco-pc
git init
```

### 步骤 2: 配置 Git 用户信息（首次使用）
```bash
# 设置用户名
git config --global user.name "你的名字"

# 设置邮箱（使用你的 GitHub 邮箱）
git config --global user.email "your.email@example.com"
```

### 步骤 3: 添加所有文件
```bash
# 添加所有文件到暂存区
git add .

# 查看将要提交的文件
git status
```

### 步骤 4: 创建首次提交
```bash
git commit -m "Initial commit: 微前端项目初始化"
```

### 步骤 5: 连接远程仓库
```bash
# 添加远程仓库
git remote add origin https://github.com/Rich-Radiant-Studio/SIA.git

# 验证远程仓库
git remote -v
```

### 步骤 6: 推送到远程
```bash
# 重命名主分支为 main（GitHub 默认）
git branch -M main

# 推送到远程（首次推送）
git push -u origin main
```

**注意**: 推送时需要输入 GitHub 用户名和密码（或 Personal Access Token）

---

## 方案 2: 克隆远程仓库

如果远程仓库已有代码，使用此方案：

### 步骤 1: 备份当前代码
```bash
# 在文件资源管理器中，将 D:\soft-deco-pc 重命名为 D:\soft-deco-pc-backup
```

### 步骤 2: 克隆远程仓库
```bash
cd D:\
git clone https://github.com/Rich-Radiant-Studio/SIA.git soft-deco-pc
```

### 步骤 3: 合并你的修改
```bash
cd soft-deco-pc

# 手动从备份文件夹复制你修改的文件
# 或使用命令复制
```

---

## 认证方式

### 方式 1: HTTPS + Personal Access Token（推荐）

GitHub 已不再支持密码认证，需要使用 Personal Access Token。

#### 创建 Token:
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置：
   - Note: `SIA Project`
   - Expiration: 选择过期时间
   - 勾选权限: `repo` (完整仓库访问权限)
4. 点击 "Generate token"
5. **复制 Token**（只显示一次，请保存好）

#### 使用 Token:
```bash
# 推送时，用户名输入你的 GitHub 用户名
# 密码输入刚才复制的 Token
git push -u origin main
```

#### 保存凭据（避免每次输入）:
```bash
# Windows 使用凭据管理器
git config --global credential.helper wincred

# 或使用缓存（15分钟）
git config --global credential.helper cache
```

### 方式 2: SSH（更安全）

#### 步骤 1: 生成 SSH 密钥
```bash
# 生成密钥（替换为你的 GitHub 邮箱）
ssh-keygen -t ed25519 -C "your.email@example.com"

# 按提示操作，直接回车使用默认设置
```

#### 步骤 2: 复制公钥
```bash
# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 或复制到剪贴板
clip < ~/.ssh/id_ed25519.pub
```

#### 步骤 3: 添加到 GitHub
1. 访问 https://github.com/settings/keys
2. 点击 "New SSH key"
3. Title: `My Computer`
4. 粘贴公钥内容
5. 点击 "Add SSH key"

#### 步骤 4: 测试连接
```bash
ssh -T git@github.com
```

成功会显示：
```
Hi username! You've successfully authenticated...
```

#### 步骤 5: 修改远程仓库为 SSH
```bash
# 如果已经添加了 HTTPS 远程仓库，修改为 SSH
git remote set-url origin git@github.com:Rich-Radiant-Studio/SIA.git

# 或直接添加 SSH 远程仓库
git remote add origin git@github.com:Rich-Radiant-Studio/SIA.git
```

---

## 完整操作流程（推荐）

### 使用 HTTPS + Token

```bash
# 1. 进入项目目录
cd D:\soft-deco-pc

# 2. 初始化 Git
git init

# 3. 配置用户信息（首次使用）
git config --global user.name "你的名字"
git config --global user.email "your.email@example.com"

# 4. 添加所有文件
git add .

# 5. 创建首次提交
git commit -m "Initial commit: 微前端项目初始化"

# 6. 添加远程仓库
git remote add origin https://github.com/Rich-Radiant-Studio/SIA.git

# 7. 重命名分支为 main
git branch -M main

# 8. 推送到远程（需要输入 GitHub 用户名和 Token）
git push -u origin main

# 9. 配置凭据保存
git config --global credential.helper wincred
```

---

## 验证连接

推送成功后，访问仓库查看：
https://github.com/Rich-Radiant-Studio/SIA

应该能看到你的代码已经上传。

---

## 后续操作

### 拉取远程更新
```bash
git pull origin main
```

### 推送本地更新
```bash
# 1. 添加修改的文件
git add .

# 2. 提交
git commit -m "描述你的修改"

# 3. 推送
git push origin main
```

### 查看状态
```bash
# 查看本地修改
git status

# 查看提交历史
git log --oneline

# 查看远程仓库信息
git remote -v
```

---

## 常见问题

### 问题 1: 推送被拒绝（403 错误）
**原因**: 没有权限或认证失败

**解决**:
1. 确认你是仓库的协作者
2. 使用 Personal Access Token 而不是密码
3. 检查 Token 权限是否包含 `repo`

### 问题 2: 推送被拒绝（远程有更新）
**原因**: 远程仓库有你本地没有的提交

**解决**:
```bash
# 先拉取远程更新
git pull origin main --allow-unrelated-histories

# 解决冲突后推送
git push origin main
```

### 问题 3: 认证失败
**原因**: 用户名或 Token 错误

**解决**:
1. 重新生成 Personal Access Token
2. 清除保存的凭据：
```bash
# Windows
cmdkey /delete:git:https://github.com

# 然后重新推送，输入新的凭据
git push origin main
```

### 问题 4: 文件太大无法推送
**原因**: GitHub 单个文件限制 100MB

**解决**:
```bash
# 查看大文件
find . -type f -size +50M

# 添加到 .gitignore
echo "large-file.zip" >> .gitignore

# 或使用 Git LFS（大文件存储）
```

---

## 下一步

1. **创建 Personal Access Token**（如果使用 HTTPS）
   - 访问: https://github.com/settings/tokens
   - 生成 Token 并保存

2. **执行上面的完整操作流程**

3. **验证推送成功**
   - 访问: https://github.com/Rich-Radiant-Studio/SIA
   - 查看代码是否已上传

4. **查看 Shop.vue 的历史**（如果远程仓库有历史记录）
   ```bash
   git log --oneline -- packages/user-web/src/views/Shop.vue
   ```

如果遇到任何问题，请告诉我具体的错误信息！
