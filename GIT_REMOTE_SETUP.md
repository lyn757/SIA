# 连接远程 Git 仓库指南

## 前提条件
- ✅ 已安装 Git
- ✅ 已有远程仓库地址（GitHub、GitLab、Gitee 等）

---

## 方法 1: 克隆现有仓库（推荐）

如果远程仓库已经存在代码，使用克隆方式：

### 步骤 1: 备份当前代码
```bash
# 将当前项目文件夹重命名为备份
# 在文件资源管理器中操作，或使用命令：
cd D:\
ren soft-deco-pc soft-deco-pc-backup
```

### 步骤 2: 克隆远程仓库
```bash
# 克隆仓库（替换为你的仓库地址）
cd D:\
git clone https://github.com/username/soft-deco-pc.git

# 或使用 SSH（需要配置 SSH 密钥）
git clone git@github.com:username/soft-deco-pc.git
```

### 步骤 3: 恢复你的修改
```bash
# 进入克隆的项目
cd soft-deco-pc

# 从备份复制你修改的文件
# 手动复制或使用命令
```

---

## 方法 2: 连接现有本地仓库到远程

如果你想保留当前的本地代码并连接到远程仓库：

### 步骤 1: 初始化本地仓库（如果还没有）
```bash
cd D:\soft-deco-pc
git init
```

### 步骤 2: 添加远程仓库
```bash
# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/username/soft-deco-pc.git

# 验证远程仓库
git remote -v
```

应该看到：
```
origin  https://github.com/username/soft-deco-pc.git (fetch)
origin  https://github.com/username/soft-deco-pc.git (push)
```

### 步骤 3: 拉取远程代码
```bash
# 拉取远程分支
git fetch origin

# 查看远程分支
git branch -r

# 合并远程主分支（可能是 main 或 master）
git pull origin main --allow-unrelated-histories

# 如果是 master 分支
git pull origin master --allow-unrelated-histories
```

### 步骤 4: 推送本地代码
```bash
# 添加所有文件
git add .

# 提交
git commit -m "合并本地修改"

# 推送到远程
git push -u origin main

# 如果是 master 分支
git push -u origin master
```

---

## 方法 3: 从零开始（远程仓库为空）

如果远程仓库是新建的空仓库：

### 步骤 1: 初始化本地仓库
```bash
cd D:\soft-deco-pc
git init
```

### 步骤 2: 添加文件并提交
```bash
# 添加所有文件
git add .

# 首次提交
git commit -m "Initial commit: 微前端项目初始化"
```

### 步骤 3: 连接远程仓库
```bash
# 添加远程仓库
git remote add origin https://github.com/username/soft-deco-pc.git

# 推送到远程（首次推送）
git push -u origin main

# 如果远程默认分支是 master
git branch -M main  # 重命名本地分支为 main
git push -u origin main
```

---

## 常见远程仓库平台

### GitHub
```bash
# HTTPS
git remote add origin https://github.com/username/repository.git

# SSH
git remote add origin git@github.com:username/repository.git
```

### GitLab
```bash
# HTTPS
git remote add origin https://gitlab.com/username/repository.git

# SSH
git remote add origin git@gitlab.com:username/repository.git
```

### Gitee（码云）
```bash
# HTTPS
git remote add origin https://gitee.com/username/repository.git

# SSH
git remote add origin git@gitee.com:username/repository.git
```

### 私有服务器
```bash
# HTTPS
git remote add origin https://git.yourcompany.com/username/repository.git

# SSH
git remote add origin git@git.yourcompany.com:username/repository.git
```

---

## 配置 SSH 密钥（推荐）

使用 SSH 可以避免每次都输入密码。

### 步骤 1: 生成 SSH 密钥
```bash
# 生成密钥（替换为你的邮箱）
ssh-keygen -t ed25519 -C "your.email@example.com"

# 如果系统不支持 ed25519，使用 RSA
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# 按提示操作：
# - 保存位置：直接回车使用默认位置
# - 密码：可以设置或直接回车跳过
```

### 步骤 2: 复制公钥
```bash
# 查看公钥内容
cat ~/.ssh/id_ed25519.pub

# 或使用 clip 命令复制到剪贴板
clip < ~/.ssh/id_ed25519.pub
```

### 步骤 3: 添加到远程仓库

**GitHub:**
1. 访问 https://github.com/settings/keys
2. 点击 "New SSH key"
3. 粘贴公钥内容
4. 保存

**GitLab:**
1. 访问 https://gitlab.com/-/profile/keys
2. 粘贴公钥内容
3. 保存

**Gitee:**
1. 访问 https://gitee.com/profile/sshkeys
2. 粘贴公钥内容
3. 保存

### 步骤 4: 测试连接
```bash
# GitHub
ssh -T git@github.com

# GitLab
ssh -T git@gitlab.com

# Gitee
ssh -T git@gitee.com
```

成功会显示类似：
```
Hi username! You've successfully authenticated...
```

---

## 常用远程操作命令

### 查看远程仓库
```bash
# 查看远程仓库
git remote -v

# 查看远程仓库详细信息
git remote show origin
```

### 修改远程仓库地址
```bash
# 修改远程仓库 URL
git remote set-url origin https://new-url.git

# 从 HTTPS 改为 SSH
git remote set-url origin git@github.com:username/repository.git
```

### 删除远程仓库
```bash
# 删除远程仓库连接
git remote remove origin
```

### 拉取和推送
```bash
# 拉取远程更新
git pull origin main

# 推送本地更新
git push origin main

# 推送所有分支
git push --all origin

# 推送标签
git push --tags origin
```

### 查看远程分支
```bash
# 查看所有分支（包括远程）
git branch -a

# 查看远程分支
git branch -r

# 拉取远程分支到本地
git checkout -b local-branch origin/remote-branch
```

---

## 解决常见问题

### 问题 1: 推送被拒绝（远程有更新）
```bash
# 先拉取远程更新
git pull origin main --rebase

# 解决冲突后推送
git push origin main
```

### 问题 2: 本地和远程历史不一致
```bash
# 强制拉取（会覆盖本地修改，谨慎使用）
git fetch origin
git reset --hard origin/main

# 或允许不相关历史合并
git pull origin main --allow-unrelated-histories
```

### 问题 3: 认证失败
```bash
# HTTPS 方式：检查用户名和密码
# 可能需要使用 Personal Access Token 代替密码

# SSH 方式：检查 SSH 密钥是否正确配置
ssh -T git@github.com
```

### 问题 4: 推送到错误的分支
```bash
# 删除远程错误的提交
git push origin :wrong-branch

# 推送到正确的分支
git push origin correct-branch
```

---

## 推荐的工作流程

### 日常开发
```bash
# 1. 开始工作前，拉取最新代码
git pull origin main

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 开发并提交
git add .
git commit -m "feat: 添加新功能"

# 4. 推送功能分支到远程
git push origin feature/new-feature

# 5. 在远程仓库创建 Pull Request/Merge Request

# 6. 合并后删除本地分支
git checkout main
git pull origin main
git branch -d feature/new-feature
```

### 团队协作
```bash
# 1. 克隆仓库
git clone https://github.com/username/repository.git

# 2. 创建自己的分支
git checkout -b your-name/feature

# 3. 定期同步主分支
git checkout main
git pull origin main
git checkout your-name/feature
git merge main

# 4. 推送并创建 PR
git push origin your-name/feature
```

---

## 下一步操作

请提供以下信息，我可以给出具体的命令：

1. **远程仓库地址**（例如：https://github.com/username/soft-deco-pc.git）
2. **仓库状态**：
   - [ ] 远程仓库是空的（新建的）
   - [ ] 远程仓库已有代码
   - [ ] 不确定
3. **认证方式**：
   - [ ] HTTPS（用户名密码）
   - [ ] SSH（密钥）
   - [ ] 不确定

提供这些信息后，我会给出具体的操作步骤。
